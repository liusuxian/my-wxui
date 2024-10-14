/*
 * @Author: liusuxian 382185882@qq.com
 * @Date: 2024-10-14 17:54:29
 * @LastEditors: liusuxian 382185882@qq.com
 * @LastEditTime: 2024-10-14 18:39:38
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
    // 控制显示
    show: {
      type: Boolean,
      value: false,
      observer(val) {
        if (val) {
          this.setData({
            isHide: false,
          });
        } else {
          setTimeout(() => {
            this.setData({
              isHide: true,
            });
          }, 300);
        }
      },
    },
    // 宽度
    width: {
      type: Number,
      optionalTypes: [String],
      value: "84%",
    },
    // 背景颜色，注：自定义弹框内容时失效
    backgroundColor: {
      type: String,
      value: "#fff",
    },
    // padding
    padding: {
      type: String,
      value: "40rpx 64rpx",
    },
    // 设置圆角
    radius: {
      type: Number,
      optionalTypes: [String],
      value: 24,
    },
    // 标题
    title: {
      type: String,
      value: "",
    },
    // 详细内容
    content: {
      type: String,
      value: "",
    },
    // 详细内容字体颜色
    color: {
      type: String,
      value: "#999",
    },
    // 详细内容字体大小
    size: {
      type: Number,
      optionalTypes: [String],
      value: 28,
    },
    // 按钮形状 circle, square
    shape: {
      type: String,
      value: "square",
    },
    // 按钮
    button: {
      type: Array,
      value: [
        {
          text: "取消",
          type: "red",
          plain: true,
        },
        {
          text: "确定",
          type: "red",
          plain: false,
        },
      ],
    },
    // 点击遮罩是否可关闭，结合cancel事件使用
    maskClosable: {
      type: Boolean,
      value: true,
    },
    // 是否显示遮罩
    isMask: {
      type: Boolean,
      value: true,
    },
    // 遮罩颜色
    maskColor: {
      type: String,
      value: "rgba(0, 0, 0, 0.6)",
    },
    // 淡入效果
    fadeIn: {
      type: Boolean,
      value: false,
    },
    // 自定义弹窗
    custom: {
      type: Boolean,
      value: false,
    },
    // 容器 z-index
    zIndex: {
      type: Number,
      value: 9997,
    },
    // 单位
    unit: {
      type: String,
      value: "rpx",
    },
  },
  data: {
    colors: {
      primary: (wx.$my && wx.$my.color.primary) || "#5677fc",
      green: (wx.$my && wx.$my.color.success) || "#07c160",
      warning: (wx.$my && wx.$my.color.warning) || "#ff7900",
      danger: (wx.$my && wx.$my.color.danger) || "#EB0909",
      red: (wx.$my && wx.$my.color.danger) || "#EB0909",
      pink: (wx.$my && wx.$my.color.pink) || "#f74d54",
    },
    isHide: true,
  },
  methods: {
    handleClick(e) {
      if (!this.data.show) {
        return;
      }
      const dataset = e.currentTarget.dataset;
      this.triggerEvent("click", {
        index: Number(dataset.index),
      });
    },
    handleClickCancel() {
      if (!this.data.maskClosable) {
        return;
      }
      this.triggerEvent("cancel");
    },
    stop() {},
  },
});
