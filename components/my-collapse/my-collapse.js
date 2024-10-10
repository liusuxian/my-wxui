/*
 * @Author: liusuxian 382185882@qq.com
 * @Date: 2024-09-29 18:36:17
 * @LastEditors: liusuxian 382185882@qq.com
 * @LastEditTime: 2024-10-08 21:25:16
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
    // collapse-body 背景颜色
    bdBgColor: {
      type: String,
      value: "transparent",
    },
    // collapse-body实际高度 open时使用
    height: {
      type: Number,
      optionalTypes: [String],
      value: "auto",
    },
    // collapse-head 自定义样式
    hdCustomStyle: {
      type: Object,
      optionalTypes: [String],
      value: {},
    },
    // collapse-body 宽度
    bdWidth: {
      type: Number,
      optionalTypes: [String],
      value: "100%",
    },
    // 当前折叠面板在列表中的索引
    index: {
      type: Number,
      value: 0,
    },
    // 当前索引，index==current时展开
    current: {
      type: Number,
      value: -1,
      observer(val) {
        this.updateCurrentChange();
      },
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      value: false,
    },
    // 是否带箭头
    arrow: {
      type: Boolean,
      value: true,
    },
    // 箭头自定义样式
    arrowCustomStyle: {
      type: Object,
      optionalTypes: [String],
      value: {},
    },
    // 单位
    unit: {
      type: String,
      value: "rpx",
    },
  },
  lifetimes: {
    attached: function () {
      this.updateCurrentChange();
    },
  },
  data: {
    isOpen: false,
  },
  methods: {
    updateCurrentChange() {
      this.setData({
        isOpen: this.data.index == this.data.current,
      });
    },
    handleClick() {
      if (this.data.disabled) return;
      this.triggerEvent("click", {
        index: Number(this.data.index),
      });
    },
  },
});
