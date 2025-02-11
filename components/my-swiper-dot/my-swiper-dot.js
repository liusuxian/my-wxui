/*
 * @Author: liusuxian 382185882@qq.com
 * @Date: 2025-02-11 15:31:20
 * @LastEditors: liusuxian 382185882@qq.com
 * @LastEditTime: 2025-02-11 17:18:42
 * @Description:
 *
 * Copyright (c) 2025 by liusuxian email: 382185882@qq.com, All Rights Reserved.
 */
Component({
  externalClasses: ["custom-class"],
  options: {
    addGlobalClass: true,
  },
  properties: {
    // 显示类型：1-dot，2-index，3-title，4-右侧停靠index
    type: {
      type: Number,
      value: 1,
    },
    // 总数，数组总长度
    count: {
      type: Number,
      value: 0,
    },
    // 当前swiper-item索引
    current: {
      type: Number,
      value: 0,
    },
    // 当前swiper-item标题
    currentTitle: {
      type: String,
      value: "",
    },
    // left值
    left: {
      type: Number,
      optionalTypes: [String],
      value: 0,
    },
    // right值
    right: {
      type: Number,
      optionalTypes: [String],
      value: "auto",
    },
    // bottom值
    bottom: {
      type: Number,
      optionalTypes: [String],
      value: 30,
    },
    // 指示点[type in (1,2)]或外层盒子[type in (3,4)]宽度
    width: {
      type: Number,
      optionalTypes: [String],
      value: 16,
    },
    // 当前指示点[type in (1,2)]或外层盒子[type in (3,4)]宽度
    activeWidth: {
      type: Number,
      optionalTypes: [String],
      value: 16,
    },
    // 指示点[type in (1,2)]或外层盒子[type in (3,4)]高度
    height: {
      type: Number,
      optionalTypes: [String],
      value: 16,
    },
    // 指示点圆角
    radius: {
      type: Number,
      optionalTypes: [String],
      value: "50%",
    },
    // 背景色
    backgroundColor: {
      type: String,
      value: "#bfbfbf",
    },
    // 当前展示item背景色
    activeBgColor: {
      type: String,
      value: "",
    },
    // 字体颜色
    color: {
      type: String,
      value: "#333",
    },
    // 当前展示item字体颜色，type=2时生效
    activeColor: {
      type: String,
      value: "#fff",
    },
    // 字体大小
    size: {
      type: Number,
      optionalTypes: [String],
      value: 28,
    },
    // 指示点margin值
    margin: {
      type: String,
      value: "0 8rpx",
    },
    // padding值，type=3时生效
    padding: {
      type: String,
      value: "0 30rpx",
    },
    // 指示点容器圆角
    containerRadius: {
      type: Number,
      optionalTypes: [String],
      value: 20,
    },
    // 指示点容器透明度
    containerOpacity: {
      type: Number,
      value: 1,
    },
    // 单位
    unit: {
      type: String,
      value: "rpx",
    },
  },
  data: {
    g_activeBgColor: (wx.$my && wx.$my.color.primary) || "#5677fc",
  },
});
