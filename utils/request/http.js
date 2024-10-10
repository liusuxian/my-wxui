/*
 * @Author: liusuxian 382185882@qq.com
 * @Date: 2024-01-17 19:56:52
 * @LastEditors: liusuxian 382185882@qq.com
 * @LastEditTime: 2024-01-17 21:04:52
 * @Description:
 *
 * Copyright (c) 2024 by liusuxian email: 382185882@qq.com, All Rights Reserved.
 */
import base from "./base.js";
import createTaskKeyStore from "./taskKeyStore.js";

const store = createTaskKeyStore();

class THORUI_INNER {
    constructor(initConfig = {}) {
        this.initConfig = initConfig;
        this.request = [];
        this.response = [];
        this.dispatchRequest = this.dispatchRequest.bind(this);
        this.loading = false;
    }
    dispatchRequest(config = {}) {
        let params = base.mergeConfig(this.initConfig, config);
        if (
            params.requestTaskKey &&
            store.requestTaskStorage(params.requestTaskKey)
        ) {
            return new Promise((resolve, reject) => {
                reject({
                    statusCode: -9999,
                    errMsg: "request:cancelled",
                });
            });
        }
        let options = base.getOptions(params);
        let promise = Promise.resolve(options);
        promise = promise.then((config) => {
            if (params.showLoading && !this.loading) {
                this.loading = true;
                base.showLoading();
            }
            return new Promise((resolve, reject) => {
                let requestTask = wx.request({
                    ...options,
                    success: (res) => {
                        if (params.showLoading && this.loading) {
                            this.loading = false;
                            wx.hideLoading();
                        }
                        resolve(params.concise ? res.data : res);
                    },
                    fail: (err) => {
                        if (params.showLoading && this.loading) {
                            this.loading = false;
                            wx.hideLoading();
                        }
                        if (params.errorMsg) {
                            base.toast(params.errorMsg);
                        }
                        reject(err);
                    },
                    complete: () => {
                        store.removeRequestTaskKey(params.requestTaskKey);
                    },
                });

                if (
                    params.timeout &&
                    typeof params.timeout === "number" &&
                    params.timeout > 3000
                ) {
                    setTimeout(() => {
                        try {
                            store.removeRequestTaskKey(params.requestTaskKey);
                            requestTask.abort();
                        } catch (e) { }
                        resolve({
                            statusCode: -9999,
                            errMsg: "request:cancelled",
                        });
                    }, params.timeout);
                }
            });
        });
        return promise;
    }
}

const inner = new THORUI_INNER(base.config());

const http = {
    interceptors: {
        request: {
            use: (fulfilled, rejected) => {
                inner.request.push({
                    fulfilled,
                    rejected,
                });
            },
            eject: (name) => {
                if (inner.request[name]) {
                    inner.request[name] = null;
                }
            },
        },
        response: {
            use: (fulfilled, rejected) => {
                inner.response.push({
                    fulfilled,
                    rejected,
                });
            },
            eject: (name) => {
                if (inner.response[name]) {
                    inner.response[name] = null;
                }
            },
        },
    },
    create(config) {
        inner.initConfig = base.mergeConfig(base.config(), config, true);
    },
    get(url, config = {}) {
        config.method = "GET";
        config.url = url || config.url || "";
        return http.request(config);
    },
    post(url, config = {}) {
        config.method = "POST";
        config.url = url || config.url || "";
        return http.request(config);
    },
    all(requests) {
        return Promise.all(requests);
    },
    request(config = {}) {
        let chain = [inner.dispatchRequest, undefined];
        let promise = Promise.resolve(config);

        inner.request.forEach((interceptor) => {
            chain.unshift(interceptor.fulfilled, interceptor.rejected);
        });

        inner.response.forEach((interceptor) => {
            chain.push(interceptor.fulfilled, interceptor.rejected);
        });

        while (chain.length) {
            promise = promise.then(chain.shift(), chain.shift());
        }

        return promise;
    },
};

export default http;
