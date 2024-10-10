/*
 * @Author: liusuxian 382185882@qq.com
 * @Date: 2024-09-30 13:42:56
 * @LastEditors: liusuxian 382185882@qq.com
 * @LastEditTime: 2024-10-08 23:45:57
 * @Description:
 *
 * Copyright (c) 2024 by liusuxian email: 382185882@qq.com, All Rights Reserved.
 */
Component({
  behaviors: ["wx://form-field-group"],
  externalClasses: ["custom-class"],
  options: {
    virtualHost: true,
    addGlobalClass: true,
    multipleSlots: true,
  },
  properties: {
    // 是否显示必填标识（*号）
    required: {
      type: Boolean,
      value: false,
    },
    // 必填标识（*号）颜色
    requiredColor: {
      type: String,
      value: "",
    },
    // 左侧标题
    label: {
      type: String,
      value: "",
    },
    // 标题字体大小
    labelSize: {
      type: Number,
      optionalTypes: [String],
      value: 0,
    },
    // 标题颜色
    labelColor: {
      type: String,
      value: "",
    },
    // 标题最小宽度
    labelWidth: {
      type: Number,
      optionalTypes: [String],
      value: 140,
    },
    // 输入内容后是否显示清除按钮
    clearable: {
      type: Boolean,
      value: false,
    },
    // 清除按钮大小
    clearSize: {
      type: Number,
      optionalTypes: [String],
      value: 30,
    },
    // 清除按钮颜色
    clearColor: {
      type: String,
      value: "#bfbfbf",
    },
    // 获取焦点
    focus: {
      type: Boolean,
      value: false,
      observer(val) {
        setTimeout(() => {
          this.setData({
            focused: val,
          });
        }, 50);
      },
    },
    // 输入框为空时占位符
    placeholder: {
      type: String,
      value: "",
    },
    // 指定 placeholder 的样式
    placeholderStyle: {
      type: String,
      value: "",
      observer(val) {
        this.fieldPlaceholderStyle();
      },
    },
    // 输入框名称
    name: {
      type: String,
      value: "",
    },
    // 输入框的初始内容
    value: {
      type: String,
      value: "",
    },
    // 与官方input type属性一致
    type: {
      type: String,
      value: "text",
    },
    // 是否是密码类型
    password: {
      type: Boolean,
      value: false,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      value: false,
    },
    // 最大输入长度，设置为 -1 的时候不限制最大长度
    maxlength: {
      type: Number,
      value: 140,
    },
    // 最小值，当type=number、digit时有效
    min: {
      type: Number,
      optionalTypes: [String],
      value: "NaN",
    },
    // 最大值，当type=number、digit时有效
    max: {
      type: Number,
      optionalTypes: [String],
      value: "NaN",
    },
    // 指定光标与键盘的距离，单位 px 。与官方属性一致
    cursorSpacing: {
      type: Number,
      value: 0,
    },
    // 设置键盘右下角按钮的文字，仅在 type="text" 时生效。与官方属性一致
    confirmType: {
      type: String,
      value: "done",
    },
    // 点击键盘右下角按钮时是否保持键盘不收起。与官方属性一致
    confirmHold: {
      type: Boolean,
      value: false,
    },
    // 指定focus时的光标位置。与官方属性一致
    cursor: {
      type: Number,
      value: -1,
    },
    // 光标起始位置，自动聚集时有效，需与selection-end搭配使用。与官方属性一致
    selectionStart: {
      type: Number,
      value: -1,
    },
    // 光标结束位置，自动聚集时有效，需与selection-start搭配使用。与官方属性一致
    selectionEnd: {
      type: Number,
      value: -1,
    },
    // 键盘弹起时，是否自动上推页面。与官方属性一致
    adjustPosition: {
      type: Boolean,
      value: true,
    },
    // focus时，点击页面的时候不收起键盘。与官方属性一致
    holdKeyboard: {
      type: Boolean,
      value: false,
    },
    // 输入框字体大小
    size: {
      type: Number,
      optionalTypes: [String],
      value: 0,
    },
    // 输入框字体颜色
    color: {
      type: String,
      value: "",
    },
    // 是否显示 input 边框
    inputBorder: {
      type: Boolean,
      value: true,
    },
    // 输入框边框颜色
    borderColor: {
      type: String,
      value: "#d1d1d1",
    },
    // 是否显示上边框
    borderTop: {
      type: Boolean,
      value: false,
    },
    // 是否显示下边框
    borderBottom: {
      type: Boolean,
      value: true,
    },
    // 下边框线条是否有左偏移距离
    lineLeft: {
      type: Boolean,
      value: true,
    },
    // 是否自动去除内容两端的空格
    trim: {
      type: Boolean,
      value: true,
    },
    // 输入框内容是否右对齐显示
    textRight: {
      type: Boolean,
      value: false,
    },
    // 输入框padding值
    padding: {
      type: String,
      value: "",
    },
    // 输入框背景颜色
    backgroundColor: {
      type: String,
      value: "",
    },
    // 输入框圆角值，未设置则使用默认值
    radius: {
      type: Number,
      optionalTypes: [String],
      value: 16,
    },
    // 输入框margin-top值
    marginTop: {
      type: Number,
      optionalTypes: [String],
      value: 0,
    },
    // 单位
    unit: {
      type: String,
      value: "rpx",
    },
  },
  data: {
    placeholderStyl: "",
    focused: false,
    danger: (wx.$my && wx.$my.myInput.requiredColor) || "#EB0909",
    g_radius: (wx.$my && wx.$my.myInput.radius) || 0,
    g_labelSize: (wx.$my && wx.$my.myInput.labelSize) || 32,
    g_labelColor: (wx.$my && wx.$my.myInput.labelColor) || "#333",
    g_size: (wx.$my && wx.$my.myInput.size) || 32,
    g_color: (wx.$my && wx.$my.myInput.color) || "#333",
    g_backgroundColor: (wx.$my && wx.$my.myInput.backgroundColor) || "#FFF",
    g_padding: (wx.$my && wx.$my.myInput.padding) || "26rpx 30rpx",
  },
  lifetimes: {
    attached: function () {
      this.fieldPlaceholderStyle();
    },
    ready: function () {
      setTimeout(() => {
        this.setData({
          focused: this.data.focus,
        });
      }, 100);
    },
  },
  methods: {
    fieldPlaceholderStyle() {
      if (this.data.placeholderStyle) {
        this.setData({
          placeholderStyl: this.data.placeholderStyle,
        });
      } else {
        this.setData({
          placeholderStyl: `fontSize:${this.data.size}rpx`,
        });
      }
    },
    onInput(event) {
      let value = event.detail.value;
      if (this.data.trim) value = this.trimStr(value);
      const cVal = Number(value);
      if (
        (this.data.type === "digit" || this.data.type === "number") &&
        !isNaN(cVal) &&
        Number.isSafeInteger(cVal)
      ) {
        const cVal = Number(value);
        let eVal = this.data.type === "digit" ? value : cVal;
        if (typeof cVal === "number") {
          const min = Number(this.data.min);
          const max = Number(this.data.max);
          if (typeof min === "number" && cVal < min) {
            eVal = min;
          } else if (typeof max === "number" && max < cVal) {
            eVal = max;
          }
        }
        value = isNaN(eVal) ? value : eVal;
      }
      const inputValue = event.detail.value !== "" ? value : "";
      this.triggerEvent("input", inputValue);
    },
    onFocus(event) {
      this.triggerEvent("focus", event);
    },
    onBlur(event) {
      this.triggerEvent("blur", event);
    },
    onConfirm(e) {
      this.triggerEvent("confirm", e.detail.value);
    },
    onClear(event) {
      if (this.data.disabled) return;
      wx.hideKeyboard();
      this.triggerEvent("input", "");
      this.setData({
        value: "",
      });
    },
    fieldClick() {
      this.triggerEvent("click", {
        name: this.data.name,
      });
    },
    onKeyboardheightchange(e) {
      this.triggerEvent("keyboardheightchange", e.detail);
    },
    trimStr(str) {
      return str.replace(/^\s+|\s+$/g, "");
    },
  },
});
