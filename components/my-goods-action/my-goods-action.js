/*
 * @Author: liusuxian 382185882@qq.com
 * @Date: 2024-09-26 12:11:12
 * @LastEditors: liusuxian 382185882@qq.com
 * @LastEditTime: 2024-10-13 19:28:52
 * @Description:
 *
 * Copyright (c) 2024 by liusuxian email: 382185882@qq.com, All Rights Reserved.
 */
Component({
  externalClasses: ["custom-class"],
  options: {
    addGlobalClass: true,
  },
  properties: {
    // 是否为 iPhoneX 留出底部安全距离
    safeAreaInsetBottom: {
      type: Boolean,
      value: true,
    },
    // 是否开启占位
    placeholder: {
      type: Boolean,
      value: true,
      observer(val) {
        this.setHeight();
      },
    },
  },
  data: {
    height: 0,
  },
  lifetimes: {
    attached() {},
    ready() {
      this.setHeight();
    },
  },
  methods: {
    setHeight() {
      if (!this.data.placeholder) {
        return;
      }
      wx.nextTick(() => {
        let query = this.createSelectorQuery();
        query
          .select(".my-goods-action")
          .boundingClientRect((rect) => {
            if (rect && rect.height) {
              this.setData({ height: rect.height });
            }
          })
          .exec();
      });
    },
  },
});
