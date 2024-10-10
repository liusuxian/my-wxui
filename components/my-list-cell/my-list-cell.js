/*
 * @Author: liusuxian 382185882@qq.com
 * @Date: 2024-09-30 16:44:25
 * @LastEditors: liusuxian 382185882@qq.com
 * @LastEditTime: 2024-10-10 22:22:23
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
    // 是否显示右箭头
    arrow: {
      type: Boolean,
      value: false,
    },
    // 箭头颜色，需传具体颜色值
    arrowColor: {
      type: String,
      value: "",
    },
    // 是否有点击效果
    hover: {
      type: Boolean,
      value: true,
    },
    // 隐藏线条
    unlined: {
      type: Boolean,
      value: false,
    },
    // 线条颜色
    lineColor: {
      type: String,
      value: "",
    },
    // 线条左偏移距离，需传具体值
    lineLeft: {
      type: Number,
      optionalTypes: [String],
      value: -1,
    },
    // 线条右偏移距离，需传具体值
    lineRight: {
      type: Number,
      optionalTypes: [String],
      value: 0,
    },
    // 内边距
    padding: {
      type: String,
      value: "",
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
    // 背景颜色
    backgroundColor: {
      type: String,
      value: "#fff",
    },
    // 字体大小
    size: {
      type: Number,
      optionalTypes: [String],
      value: 0,
    },
    // 字体颜色
    color: {
      type: String,
      value: "",
    },
    // 圆角值
    radius: {
      type: Number,
      optionalTypes: [String],
      value: 0,
    },
    // 箭头右偏移距离，需传具体值
    arrowRight: {
      type: Number,
      optionalTypes: [String],
      value: 30,
    },
    // 单位
    unit: {
      type: String,
      value: "rpx",
    },
    // 索引
    index: {
      type: Number,
      value: 0,
    },
  },
  data: {
    g_arrowColor: wx.$my && wx.$my.myListCell.arrowColor,
    g_lineColor: wx.$my && wx.$my.myListCell.lineColor,
    g_lineLeft: wx.$my && wx.$my.myListCell.lineLeft,
    g_padding: wx.$my && wx.$my.myListCell.padding,
    g_color: wx.$my && wx.$my.myListCell.color,
    g_size: wx.$my && wx.$my.myListCell.size,
  },
  methods: {
    handleClick() {
      this.triggerEvent("click", {
        index: this.data.index,
      });
    },
  },
});
