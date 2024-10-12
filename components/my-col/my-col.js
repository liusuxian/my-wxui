/*
 * @Author: liusuxian 382185882@qq.com
 * @Date: 2024-10-07 01:55:02
 * @LastEditors: liusuxian 382185882@qq.com
 * @LastEditTime: 2024-10-11 01:10:54
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
    // 跨度24
    span: {
      type: Number,
      value: 24,
    },
    // margin-left值，取值1~24
    offset: {
      type: Number,
      value: 0,
    },
    // 单位
    unit: {
      type: String,
      value: "rpx",
    },
  },
  relations: {
    "../my-row/my-row": {
      type: "ancestor",
    },
  },
  data: {
    gutter: 0, // 栅格间间隔
  },
  methods: {
    updateGutter: function (newGutter) {
      this.setData({
        gutter: newGutter,
      });
    },
  },
});
