/*
 * @Author: liusuxian 382185882@qq.com
 * @Date: 2024-10-07 01:55:02
 * @LastEditors: liusuxian 382185882@qq.com
 * @LastEditTime: 2024-10-09 00:43:45
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
    // 是否为flex布局
    isFlex: {
      type: Boolean,
      value: false,
    },
    // flex布局下的水平排列方式 start/end/center/space-around/space-between
    justify: {
      type: String,
      value: "start",
    },
    // flex 布局下的垂直排列方式top/middle/bottom
    align: {
      type: String,
      value: "top",
    },
    // margin-top值
    marginTop: {
      type: Number,
      optionalTypes: [String],
      value: 0,
    },
    // margin-bottom值
    marginBottom: {
      type: Number,
      optionalTypes: [String],
      value: 0,
    },
    // 栅格间间隔
    gutter: {
      type: Number,
      optionalTypes: [String],
      observer: function (newVal) {
        this.updateChildGutter(newVal);
      },
      value: 0,
    },
    // 单位
    unit: {
      type: String,
      value: "rpx",
    },
  },
  relations: {
    "../my-col/my-col": {
      type: "descendant", // 关联的目标组件为所有后代组件
      linked: function (target) {
        const gutter = this.data.gutter || 0;
        target.updateGutter(gutter);
      },
      linkChanged: function (target) {
        const gutter = this.data.gutter || 0;
        target.updateGutter(gutter);
      },
    },
  },
  methods: {
    updateChildGutter: function (gutter) {
      // 遍历所有子组件并更新它们的 gutter 值
      let children = this.getRelationNodes("../my-col/my-col");
      children.forEach((child) => {
        child.updateGutter(gutter);
      });
    },
  },
});
