/*
 * @Author: liusuxian 382185882@qq.com
 * @Date: 2024-08-15 14:40:12
 * @LastEditors: liusuxian 382185882@qq.com
 * @LastEditTime: 2024-10-20 01:58:21
 * @Description:
 *
 * Copyright (c) 2024 by liusuxian email: 382185882@qq.com, All Rights Reserved.
 */
Component({
  externalClasses: ["custom-class"],
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  properties: {
    // 展示图片宽度
    width: {
      type: Number,
      optionalTypes: [String],
      value: 210,
    },
    // 展示图片高度
    height: {
      type: Number,
      optionalTypes: [String],
      value: 210,
    },
    // 初始化图片路径
    value: {
      type: Array,
      value: [],
      observer(val) {
        this.initImages();
      },
    },
    // 选择框与图片圆角值
    radius: {
      type: Number,
      optionalTypes: [String],
      value: 0,
    },
    // 选择框背景颜色
    background: {
      type: String,
      value: "#F7F7F7",
    },
    // 选择框边框颜色
    borderColor: {
      type: String,
      value: "transparent",
    },
    // 选择框边框样式类型，可选值：solid、dashed、dotted
    borderSytle: {
      type: String,
      value: "dashed",
    },
    // 删除图标背景色
    delColor: {
      type: String,
      value: "#EB0909",
    },
    // 删除图片前是否弹框确认
    delConfirm: {
      type: Boolean,
      value: false,
    },
    // 禁用删除
    forbidDel: {
      type: Boolean,
      value: false,
    },
    // 添加图标颜色
    addColor: {
      type: String,
      value: "#888",
    },
    // 添加图标字体大小
    addSize: {
      type: Number,
      optionalTypes: [String],
      value: 80,
    },
    // 是否自定义加号图标，结合插槽使用，仅小程序端需要设置
    custom: {
      type: Boolean,
      value: false,
    },
    // 禁用添加
    forbidAdd: {
      type: Boolean,
      value: false,
    },
    // 服务器接口地址。当接口地址为空时，直接返回本地图片地址
    serverUrl: {
      type: String,
      value: "",
    },
    // 限制数
    limit: {
      type: Number,
      value: 9,
    },
    // original 原图，compressed 压缩图，默认二者都有
    sizeType: {
      type: Array,
      value: ["original", "compressed"],
    },
    // album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
    sourceType: {
      type: Array,
      value: ["album", "camera"],
    },
    // 上传图片类型，默认为空数组，不限制，格式:['jpg','png','gif']
    imageFormat: {
      type: Array,
      value: [],
    },
    // 单张图片大小限制 MB
    size: {
      type: Number,
      value: 4,
    },
    // 是否压缩图片，默认压缩
    isCompress: {
      type: Boolean,
      value: true,
    },
    // 压缩图片质量，默认 50
    compressQuality: {
      type: Number,
      value: 50,
    },
    // 文件对应的 key，开发者在服务器端通过这个 key 可以获取到文件二进制内容，默认为 file
    fileKeyName: {
      type: String,
      value: "file",
    },
    // 上传失败提示文字
    uploadFailedText: {
      type: String,
      value: "上传失败",
    },
    // 重新上传按钮图标，图片资源
    reUpLoadBtnIcon: {
      type: String,
      value: "",
    },
    // HTTP 请求 Header, header 中不能设置 Referer
    header: {
      type: Object,
      value: {},
    },
    // HTTP 请求中其他额外的 form data
    formData: {
      type: Object,
      value: {},
    },
    // 自定义参数，触发事件时回传
    params: {
      type: String,
      value: "",
    },
    // 是否显示AI图片创作按钮
    showAiImageBtn: {
      type: Boolean,
      value: false,
    },
    // AI图片创作按钮图标，图片资源
    aiImageBtnIcon: {
      type: String,
      value: "",
    },
    // 单位
    unit: {
      type: String,
      value: "rpx",
    },
  },
  lifetimes: {
    ready: function () {
      this.initImages();
    },
  },
  data: {
    // 图片地址
    imageList: [],
    tempFiles: [],
    // 上传状态：0-重置上传 1-上传成功 2-上传中 3-上传失败
    statusArr: [],
    // 传入回调函数上传
    callUpload: false,
    g_danger: (wx.$my && wx.$my.color.danger) || "#EB0909",
  },
  /**
   * 组件的方法列表
   */
  methods: {
    initImages() {
      let imgArr = [...this.data.value];
      let status = [];
      let tempFiles = [];
      for (let item of imgArr) {
        status.push("1");
        tempFiles.push({
          path: item,
        });
      }
      this.data.tempFiles = tempFiles;
      this.setData({
        imageList: [...imgArr],
        statusArr: status,
      });
    },
    // 重新上传
    reUpLoad(e) {
      let index = Number(e.currentTarget.dataset.index);
      let value = `statusArr[${index}]`;
      this.setData({
        [value]: "2",
      });
      this.triggerEvent("reupload", {
        index,
      });
      if (!this.data.callUpload) {
        if (this.data.isCompress) {
          this.uploadCompressImage(index, this.data.imageList[index])
            .then(() => {
              this.change();
            })
            .catch(() => {
              this.change();
            });
        } else {
          this.uploadImage(index, this.data.imageList[index])
            .then(() => {
              this.change();
            })
            .catch(() => {
              this.change();
            });
        }
      }
    },
    /**
     * @param manual 是否手动上传
     **/
    change(manual = false) {
      let status = ~this.data.statusArr.indexOf("2") ? 2 : 1;
      if (status != 2 && ~this.data.statusArr.indexOf("3")) {
        // 上传失败
        status = 3;
      }
      this.triggerEvent("complete", {
        status: status,
        imgArr: this.data.imageList,
        params: this.data.params,
        manual: manual,
      });
    },
    showModal(text) {
      text &&
        wx.showModal({
          title: "温馨提示",
          content: text,
          showCancel: false,
          confirmText: "我已了解",
        });
    },
    chooseImage: function () {
      let _this = this;
      wx.chooseImage({
        count: _this.data.limit - _this.data.imageList.length,
        sizeType: _this.data.sizeType,
        sourceType: _this.data.sourceType,
        success: function (e) {
          let imageArr = [];
          let status = [];
          let tempFiles = [];
          for (let i = 0; i < e.tempFiles.length; i++) {
            let len = _this.data.imageList.length;
            if (len >= _this.data.limit) {
              _this.showModal(`最多可上传${_this.data.limit}张图片`);
              break;
            }
            // 过滤图片类型
            let path = e.tempFiles[i].path;
            if (_this.data.imageFormat.length > 0) {
              let format = path.split(".")[path.split(".").length - 1];
              if (_this.data.imageFormat.indexOf(format) == -1) {
                let text = `只能上传 ${_this.data.imageFormat.join(
                  " "
                )} 格式图片！`;
                _this.showModal(text);
                continue;
              }
            }
            // 过滤超出大小限制图片
            let size = e.tempFiles[i].size;
            if (_this.data.size * 1024 * 1024 < size) {
              let err = `单张图片大小不能超过：${_this.data.size}MB`;
              _this.showModal(err);
              continue;
            }
            imageArr.push(path);
            tempFiles.push(e.tempFiles[i]);
            status.push("2");
          }
          _this.setData({
            imageList: _this.data.imageList.concat(imageArr),
            tempFiles: _this.data.tempFiles.concat(tempFiles),
            statusArr: _this.data.statusArr.concat(status),
          });
          _this.change();

          let start = _this.data.imageList.length - imageArr.length;
          for (let j = 0; j < imageArr.length; j++) {
            let index = start + j;
            // 服务器地址
            if (_this.data.serverUrl) {
              if (_this.data.isCompress) {
                _this
                  .uploadCompressImage(index, imageArr[j])
                  .then(() => {
                    _this.change();
                  })
                  .catch(() => {
                    _this.change();
                  });
              } else {
                _this
                  .uploadImage(index, imageArr[j])
                  .then(() => {
                    _this.change();
                  })
                  .catch(() => {
                    _this.change();
                  });
              }
            } else {
              // 无服务器地址则直接返回成功
              let value = `statusArr[${index}]`;
              _this.setData({
                [value]: "1",
              });
              _this.change();
            }
          }
        },
      });
    },
    uploadCompressImage: function (index, url, serverUrl) {
      let _this = this;
      let status = `statusArr[${index}]`;
      return new Promise((resolve, reject) => {
        wx.compressImage({
          src: url,
          quality: _this.data.compressQuality,
          success(compressRes) {
            wx.uploadFile({
              url: _this.data.serverUrl || serverUrl,
              name: _this.data.fileKeyName,
              header: _this.data.header,
              formData: _this.data.formData,
              filePath: compressRes.tempFilePath,
              success(res) {
                if (res.statusCode === 200 && res.data.length > 0) {
                  let resData = JSON.parse(res.data);
                  if (resData.code === 0) {
                    // 上传成功
                    let value = `imageList[${index}]`;
                    _this.setData({
                      [status]: "1",
                      [value]: resData.data.img_url,
                    });
                    resolve(index);
                  } else {
                    // 上传失败
                    _this.setData({
                      [status]: "3",
                    });
                    reject(index);
                  }
                } else {
                  // 上传失败
                  _this.setData({
                    [status]: "3",
                  });
                  reject(index);
                }
              },
              fail(e) {
                // 上传失败
                _this.setData({
                  [status]: "3",
                });
                reject(index);
              },
            });
          },
          fail(e) {
            // 上传失败
            _this.setData({
              [status]: "3",
            });
            reject(index);
          },
        });
      });
    },
    uploadImage: function (index, url, serverUrl) {
      let _this = this;
      let status = `statusArr[${index}]`;
      return new Promise((resolve, reject) => {
        wx.uploadFile({
          url: _this.data.serverUrl || serverUrl,
          name: _this.data.fileKeyName,
          header: _this.data.header,
          formData: _this.data.formData,
          filePath: url,
          success(res) {
            if (res.statusCode === 200 && res.data.length > 0) {
              let resData = JSON.parse(res.data);
              if (resData.code === 0) {
                // 上传成功
                let value = `imageList[${index}]`;
                _this.setData({
                  [status]: "1",
                  [value]: resData.data.img_url,
                });
                resolve(index);
              } else {
                // 上传失败
                _this.setData({
                  [status]: "3",
                });
                reject(index);
              }
            } else {
              // 上传失败
              _this.setData({
                [status]: "3",
              });
              reject(index);
            }
          },
          fail(e) {
            // 上传失败
            _this.setData({
              [status]: "3",
            });
            reject(index);
          },
        });
      });
    },
    delConfirmExec(index) {
      let imgList = [...this.data.imageList];
      let status = [...this.data.statusArr];
      let tempFiles = [...this.data.tempFiles];
      imgList.splice(index, 1);
      tempFiles.splice(index, 1);
      status.splice(index, 1);
      this.setData({
        imageList: imgList,
        tempFiles: tempFiles,
        statusArr: status,
      });
      this.triggerEvent("remove", {
        index: index,
        params: this.data.params,
      });
      this.change();
    },
    delImage: function (e) {
      let index = Number(e.currentTarget.dataset.index);
      let _this = this;
      if (this.data.delConfirm) {
        wx.showModal({
          title: "提示",
          content: "确认删除该图片吗？",
          showCancel: true,
          cancelColor: "#555",
          confirmColor: "#eb0909",
          confirmText: "确定",
          success(res) {
            if (res.confirm) {
              _this.delConfirmExec(index);
            }
          },
        });
      } else {
        _this.delConfirmExec(index);
      }
    },
    previewImage: function (e) {
      let index = Number(e.currentTarget.dataset.index);
      if (!this.data.imageList.length) return;
      wx.previewImage({
        current: this.data.imageList[index],
        urls: this.data.imageList,
      });
    },
    /**
     * 当属性serverUrl传空时，父级调用该方法一次性上传所有图片
     * @param serverUrl 服务器接口地址
     **/
    uploadAllImage(serverUrl) {
      if (!serverUrl) {
        this.showModal("服务器接口地址不能为空！");
        return;
      }
      let imageArr = [...this.data.imageList];
      const len = imageArr.length;
      for (let i = 0; i < len; i++) {
        // 如果是服务器地址图片则无需再次上传
        if (imageArr[i].startsWith("http")) {
          continue;
        } else {
          let status = `statusArr[${i}]`;
          this.setData({
            [status]: "2",
          });
          if (this.data.isCompress) {
            this.uploadCompressImage(i, imageArr[i], serverUrl)
              .then(() => {
                if (i === len - 1) {
                  this.change(true);
                }
              })
              .catch(() => {
                if (i === len - 1) {
                  this.change(true);
                }
              });
          } else {
            this.uploadImage(i, imageArr[i], serverUrl)
              .then(() => {
                if (i === len - 1) {
                  this.change(true);
                }
              })
              .catch(() => {
                if (i === len - 1) {
                  this.change(true);
                }
              });
          }
        }
      }
    },
    upload(callback, index) {
      // 传入一个返回Promise的文件上传的函数
      // 上传状态：0-重置上传 1-上传成功 2-上传中 3-上传失败
      this.data.callUpload = true;
      if (index === undefined || index === null) {
        let urls = [...this.data.imageList];
        const len = urls.length;
        for (let i = 0; i < len; i++) {
          if (urls[i].startsWith("https")) {
            continue;
          } else {
            let status = `statusArr[${i}]`;
            this.setData({
              [status]: "2",
            });
            if (typeof callback === "function") {
              callback(this.data.tempFiles[i])
                .then((res) => {
                  let value = `imageList[${i}]`;
                  this.setData({
                    [status]: "1",
                    [value]: res,
                  });
                  this.change(true);
                })
                .catch((err) => {
                  this.setData({
                    [status]: "3",
                  });
                });
            }
          }
        }
      } else {
        // 如果传入index，则是重新上传时调用
        let status = `statusArr[${i}]`;
        this.setData({
          [status]: "2",
        });
        if (typeof callback === "function") {
          callback(this.data.tempFiles[index])
            .then((res) => {
              let value = `imageList[${index}]`;
              this.setData({
                [status]: "1",
                [value]: res,
              });
              this.change(true);
            })
            .catch((err) => {
              this.setData({
                [status]: "3",
              });
            });
        }
      }
    },
    // 重置 data 数据
    resetData(manual = false) {
      this.setData({
        imageList: [], // 图片地址
        tempFiles: [],
        statusArr: [], // 上传状态：0-重置上传 1-上传成功 2-上传中 3-上传失败
        callUpload: false, // 传入回调函数上传
        g_danger: "#EB0909",
      });
      this.triggerEvent("complete", {
        status: 0,
        imgArr: this.data.imageList,
        params: this.data.params,
        manual: manual,
      });
    },
    // 点击AI图片创作按钮
    clickAiImage(event) {
      this.triggerEvent("clickAiImage", event);
    },
  },
});
