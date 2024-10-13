/*
 * @Author: liusuxian 382185882@qq.com
 * @Date: 2024-09-30 16:44:25
 * @LastEditors: liusuxian 382185882@qq.com
 * @LastEditTime: 2024-10-13 13:14:40
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
    // 必填标识（*号）top值，flexStart为true时生效
    requiredTop: {
      type: Number,
      optionalTypes: [String],
      value: "32",
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
      value: 32,
    },
    // 标题颜色
    labelColor: {
      type: String,
      value: "#333",
    },
    // 标题最小宽度
    labelWidth: {
      type: Number,
      optionalTypes: [String],
      value: 140,
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
    // 是否自动增高，设置auto-height时，style.height不生效
    autoHeight: {
      type: Boolean,
      value: false,
    },
    // 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
    fixed: {
      type: Boolean,
      value: false,
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
      observer(val) {
        const len = this.getCount(val.length);
        this.setData({
          count: len,
        });
      },
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
    // 指定光标与键盘的距离，单位 px 。与官方属性一致
    cursorSpacing: {
      type: Number,
      value: 0,
    },
    // 是否显示键盘上方带有”完成“按钮那一栏。与官方属性一致
    showConfirmBar: {
      type: Boolean,
      value: true,
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
    // 是否去掉 iOS 下的默认内边距
    disableDefaultPadding: {
      type: Boolean,
      value: true,
    },
    // 设置键盘右下角按钮的文字，与官方属性一致
    confirmType: {
      type: String,
      value: "done",
    },
    // 点击键盘右下角按钮时是否保持键盘不收起，与官方属性一致
    confirmHold: {
      type: Boolean,
      value: false,
    },
    // focus时，点击页面的时候不收起键盘。与官方属性一致
    holdKeyboard: {
      type: Boolean,
      value: false,
    },
    // textarea高度
    height: {
      type: Number,
      optionalTypes: [String],
      value: 200,
    },
    // textarea最小高度
    minHeight: {
      type: Number,
      optionalTypes: [String],
      value: 200,
    },
    // 标题与输入框是否顶端对齐
    flexStart: {
      type: Boolean,
      value: false,
    },
    // 输入框字体大小
    size: {
      type: Number,
      optionalTypes: [String],
      value: 32,
    },
    // 输入框字体颜色
    color: {
      type: String,
      value: "#333",
    },
    // 是否显示 textarea边框，设置为true，则borderTop、borderBottom属性失效
    textareaBorder: {
      type: Boolean,
      value: true,
    },
    // 输入框边框颜色
    borderColor: {
      type: String,
      value: "#d1d1d1",
    },
    // 输入框圆角值
    radius: {
      type: Number,
      optionalTypes: [String],
      value: 16,
    },
    // 是否显示上边框，仅 textareaBorder 为false时有效
    borderTop: {
      type: Boolean,
      value: true,
    },
    // 是否显示下边框，仅 textareaBorder 为false时有效
    borderBottom: {
      type: Boolean,
      value: true,
    },
    // 下边框线条是否有左偏移距离
    lineLeft: {
      type: Boolean,
      value: false,
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
      value: "26rpx 30rpx",
    },
    // 输入框背景颜色
    backgroundColor: {
      type: String,
      value: "#fff",
    },
    // 输入框margin-top值
    marginTop: {
      type: Number,
      optionalTypes: [String],
      value: 0,
    },
    // 是否显示底部输入长度计数
    isCounter: {
      type: Boolean,
      value: false,
    },
    // 计数文本颜色
    counterColor: {
      type: String,
      value: "#999",
    },
    // 计数文本大小
    counterSize: {
      type: Number,
      optionalTypes: [String],
      value: 28,
    },
    // 单位
    unit: {
      type: String,
      value: "rpx",
    },
  },
  data: {
    placeholderStyl: "",
    count: 0,
    focused: false,
    g_requiredColor: (wx.$my && wx.$my.color.danger) || "#EB0909",
  },
  lifetimes: {
    attached: function () {
      const len = this.getCount(this.data.value.length);
      this.setData({ count: len });
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
    getCount(len) {
      const max = Number(this.data.maxlength);
      return len > max && max !== -1 ? max : len;
    },
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
      this.setData({
        count: value.length,
      });
      this.triggerEvent("input", value);
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
    fieldClick() {
      this.triggerEvent("click", {
        name: this.data.name,
      });
    },
    onLinechange(e) {
      this.triggerEvent("linechange", e.detail);
    },
    onKeyboardheightchange(e) {
      this.triggerEvent("keyboardheightchange", e.detail);
    },
    trimStr(str) {
      return str.replace(/^\s+|\s+$/g, "");
    },
  },
});
