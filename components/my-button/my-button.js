/*
 * @Author: liusuxian 382185882@qq.com
 * @Date: 2024-09-26 10:27:29
 * @LastEditors: liusuxian 382185882@qq.com
 * @LastEditTime: 2024-10-09 09:28:43
 * @Description:
 *
 * Copyright (c) 2024 by liusuxian email: 382185882@qq.com, All Rights Reserved.
 */
Component({
  behaviors: ["wx://form-field-button"],
  externalClasses: ["custom-class"],
  options: {
    addGlobalClass: true,
  },
  properties: {
    // 按钮背景色
    background: {
      type: String,
      value: "",
    },
    // 按钮字体颜色
    color: {
      type: String,
      value: "",
    },
    // 按钮禁用背景色
    disabledBackground: {
      type: String,
      value: "",
    },
    // 按钮禁用字体颜色
    disabledColor: {
      type: String,
      value: "",
    },
    // 按钮边框宽度
    borderWidth: {
      type: Number,
      optionalTypes: [String],
      value: "1px",
    },
    // 按钮边框颜色
    borderColor: {
      type: String,
      value: "",
    },
    // 宽度
    width: {
      type: Number,
      optionalTypes: [String],
      value: "100%",
    },
    // 高度
    height: {
      type: Number,
      optionalTypes: [String],
      value: 0,
    },
    // 按钮大小，优先级高于属性width/height，可选值：medium、small、mini
    btnSize: {
      type: String,
      value: "",
    },
    // 字体大小
    size: {
      type: Number,
      optionalTypes: [String],
      value: 0,
    },
    // 按钮文字是否加粗
    bold: {
      type: Boolean,
      value: false,
    },
    // margin调整与其他元素之间间距
    margin: {
      type: String,
      value: "0",
    },
    // 按钮圆角值
    radius: {
      type: Number,
      optionalTypes: [String],
      value: 0,
    },
    // 是否镂空
    plain: {
      type: Boolean,
      value: false,
    },
    // link样式，去掉边框，结合plain一起使用
    link: {
      type: Boolean,
      value: false,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      value: false,
    },
    // 是否展示loading
    loading: {
      type: Boolean,
      value: false,
    },
    // 单位
    unit: {
      type: String,
      value: "rpx",
    },
    // 参考官方formType
    formType: {
      type: String,
      value: "",
    },
    // 参考官方openType
    openType: {
      type: String,
      value: "",
    },
    // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
    appParameter: {
      type: String,
      value: "",
    },
    // 索引
    index: {
      type: Number,
      value: 0,
    },
  },
  data: {
    time: 0,
    g_height: (wx.$my && wx.$my.myButton.height) || "96rpx",
    g_background: (wx.$my && wx.$my.myButton.background) || "#5677fc",
    g_color: (wx.$my && wx.$my.myButton.color) || "#fff",
    g_radius: (wx.$my && wx.$my.myButton.radius) || "6rpx",
    g_size: (wx.$my && wx.$my.myButton.size) || 32,
  },
  methods: {
    handleStart() {
      if (this.data.disabled) return;
      if (new Date().getTime() - this.data.time <= 150) return;
      this.setData({
        time: new Date().getTime(),
      });
    },
    handleClick() {
      if (this.data.disabled) return;
      this.setData({
        time: 0,
      });
      this.triggerEvent("click", {
        index: Number(this.data.index),
      });
    },
    handleEnd() {
      if (this.data.disabled) return;
      setTimeout(() => {
        this.setData({
          time: 0,
        });
      }, 150);
    },
    bindgetuserinfo({ detail = {} } = {}) {
      this.triggerEvent("getuserinfo", detail);
    },
    bindcontact({ detail = {} } = {}) {
      this.triggerEvent("contact", detail);
    },
    bindgetphonenumber({ detail = {} } = {}) {
      this.triggerEvent("getphonenumber", detail);
    },
    binderror({ detail = {} } = {}) {
      this.triggerEvent("error", detail);
    },
    bindopensetting({ detail = {} } = {}) {
      this.triggerEvent("opensetting", detail);
    },
    bindchooseavatar({ detail = {} } = {}) {
      this.triggerEvent("chooseavatar", detail);
    },
    bindlaunchapp({ detail = {} } = {}) {
      this.triggerEvent("launchapp", detail);
    },
  },
});
