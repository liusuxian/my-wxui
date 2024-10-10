/*
 * @Author: liusuxian 382185882@qq.com
 * @Date: 2024-09-26 12:11:12
 * @LastEditors: liusuxian 382185882@qq.com
 * @LastEditTime: 2024-10-08 21:51:35
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
    // 图标名称
    name: {
      type: String,
      value: "",
    },
    // 自定义图标，所定义字体class名称
    customPrefix: {
      type: String,
      value: "",
    },
    // 图标大小
    size: {
      type: Number,
      optionalTypes: [String],
      value: 0,
    },
    // 大小单位
    unit: {
      type: String,
      value: "rpx",
    },
    // 图标颜色
    color: {
      type: String,
      value: "",
    },
    // 是否加粗
    bold: {
      type: Boolean,
      value: false,
    },
    // margin值设置，调整间距
    margin: {
      type: String,
      value: "0",
    },
    // 索引
    index: {
      type: Number,
      value: 0,
    },
  },
  data: {
    g_color: wx.$my && wx.$my.myIcon.color,
    g_size: wx.$my && wx.$my.myIcon.size,
    g_unit: wx.$my && wx.$my.myIcon.unit,
  },
  methods: {
    handleClick() {
      this.triggerEvent("click", {
        index: this.data.index,
      });
    },
  },
});
