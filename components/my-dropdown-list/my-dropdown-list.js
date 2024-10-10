/*
 * @Author: liusuxian 382185882@qq.com
 * @Date: 2024-09-26 10:27:29
 * @LastEditors: liusuxian 382185882@qq.com
 * @LastEditTime: 2024-10-09 00:12:11
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
    // 控制显示
    show: {
      type: Boolean,
      value: false,
    },
    // 下拉框背景颜色
    backgroundColor: {
      type: String,
      value: "transparent",
    },
    // 下拉框top值
    top: {
      type: Number,
      optionalTypes: [String],
      value: 100,
    },
    // 下拉框高度
    height: {
      type: Number,
      optionalTypes: [String],
      value: 400,
    },
    // 字体大小
    fontSize: {
      type: Number,
      optionalTypes: [String],
      value: 26,
    },
    // 字体颜色
    fontColor: {
      type: String,
      value: "#000",
    },
    // 边框颜色
    borderColor: {
      type: String,
      value: "#ccc",
    },
    // 下拉框选项线条颜色
    lineColor: {
      type: String,
      value: "#ccc",
    },
    // 下拉框选项数组
    options: {
      type: Array,
      value: [],
    },
    // 下拉框父容器宽度
    selectWidth: {
      type: Number,
      optionalTypes: [String],
      value: 0,
    },
    // 下拉框父容器高度
    selectHeight: {
      type: Number,
      optionalTypes: [String],
      value: 0,
    },
    // 下拉框父容器显示文本
    selectText: {
      type: String,
      value: "请选择",
    },
    // 下拉框父容器字体颜色
    selectColor: {
      type: String,
      value: "#000",
    },
    // 下拉框父容器背景颜色
    selectBackgroundColor: {
      type: String,
      value: "transparent",
    },
    // 下拉框父容器图标字体大小
    selectIconSize: {
      type: Number,
      optionalTypes: [String],
      value: 50,
    },
    // 下拉框父容器图标字体颜色
    selectIconColor: {
      type: String,
      value: "#ccc",
    },
    // 是否自定义下拉框父容器，结合插槽使用，仅小程序端需要设置
    selectCustom: {
      type: Boolean,
      value: false,
    },
    // 是否自定义下拉框选项，结合插槽使用，仅小程序端需要设置
    customOption: {
      type: Boolean,
      value: false,
    },
    // 下拉框显示时是否显示遮罩
    isMask: {
      type: Boolean,
      value: false,
    },
    // 下拉框遮罩背景色
    maskBackground: {
      type: String,
      value: "transparent",
    },
    // 圆角值
    radius: {
      type: Number,
      optionalTypes: [String],
      value: 8,
    },
    // 单位
    unit: {
      type: String,
      value: "rpx",
    },
  },
  methods: {
    maskClick() {
      this.triggerEvent("close", {});
    },
    dropDownList(e) {
      let index = Number(e.currentTarget.dataset.index);
      this.triggerEvent("dropDownList", { index: index });
    },
  },
});
