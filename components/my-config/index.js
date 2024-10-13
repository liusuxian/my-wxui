/*
 * @Author: liusuxian 382185882@qq.com
 * @Date: 2024-09-26 12:11:12
 * @LastEditors: liusuxian 382185882@qq.com
 * @LastEditTime: 2024-10-13 13:13:42
 * @Description:
 * 基础组件 props 属性全局配置文件。优先级：全局配置文件props < 单独设置组件props
 * 温馨提示：未设置则使用组件内默认值，避免出错，请勿删减以下配置
 *
 * Copyright (c) 2024 by liusuxian email: 382185882@qq.com, All Rights Reserved.
 */
// 组件内主色配置
const color = {
  primary: "#5677fc",
  success: "#07c160",
  warning: "#ff7900",
  danger: "#EB0909",
  pink: "#f74d54",
  blue: "#007AFF",
  link: "#586c94",
};

const propsConfig = {
  // 组件内主色配置
  color,
  // 组件名称，字体图标组件 my-icon
  myIcon: {
    // 组件属性值
    size: 32,
    unit: "px",
    color: "#999",
  },
  // 列表项组件 my-list-cell
  myListCell: {
    arrowColor: "#c0c0c0",
    lineColor: "#eaeef1",
    lineLeft: 30,
    padding: "26rpx 30rpx",
    color: "#333",
    size: 28,
  },
  // 按钮组件 my-button
  myButton: {
    background: color.primary,
    color: "#fff",
    height: "96rpx",
    size: 32,
    radius: "6rpx",
  },
  // 文本组件 my-text
  myText: {
    size: 32,
    unit: "rpx",
    color: "",
  },
  // 输入框组件 my-input
  myInput: {
    requiredColor: color.danger,
    labelSize: 32,
    labelColor: "#333",
    size: 32,
    color: "#333",
    padding: "26rpx 30rpx",
    backgroundColor: "#fff",
    radius: 0,
  },
  // 表单项组件 my-form-item
  myFormItem: {
    padding: "26rpx 30rpx",
    labelSize: 32,
    labelColor: "#333",
    labelFontWeight: 400,
    asteriskColor: color.danger,
    background: "#fff",
    arrowColor: "#c0c0c0",
    borderColor: "#eaeef1",
    radius: "0rpx",
  },
  // 表单校验组件 my-form
  myForm: {
    tipBackgroundColor: color.pink,
    duration: 2000,
  },
  // 全局方法，调用 wx.$my.toast
  toast: function (text, duration, success) {
    wx.showToast({
      title: text || "出错啦~",
      icon: success ? "success" : "none",
      duration: duration || 2000,
    });
  },
  // 全局方法，调用 wx.$my.modal
  modal(title, content, showCancel, callback, confirmColor, confirmText) {
    wx.showModal({
      title: title || "提示",
      content: content,
      showCancel: showCancel,
      cancelColor: "#555",
      confirmColor: confirmColor || color.primary,
      confirmText: confirmText || "确定",
      success(res) {
        if (res.confirm) {
          callback && callback(true);
        } else {
          callback && callback(false);
        }
      },
    });
  },
  // 跳转页面
  href(url, isMain) {
    if (isMain) {
      wx.switchTab({
        url: url,
      });
    } else {
      wx.navigateTo({
        url: url,
      });
    }
  },
  // 转换 rpx 为 px
  rpx2px(value) {
    let sys = wx.getSystemInfoSync();
    return (sys.windowWidth / 750) * value;
  },
};

export default propsConfig;
