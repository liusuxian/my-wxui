/*
 * @Author: liusuxian 382185882@qq.com
 * @Date: 2024-10-12 17:52:50
 * @LastEditors: liusuxian 382185882@qq.com
 * @LastEditTime: 2024-10-12 20:04:49
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
    // 列表标题
    title: {
      type: String,
      value: "",
    },
    // 标题颜色
    color: {
      type: String,
      value: "#666",
    },
    // 标题字体大小
    size: {
      type: Number,
      optionalTypes: [String],
      value: 30,
    },
    // 背景色
    backgroundColor: {
      type: String,
      value: "transparent",
    },
    // 去掉线条，可设置：top（去掉上边线条），bottom（去掉下边线条），all（去掉所有线条）
    unlined: {
      type: String,
      value: "",
    },
    // 线条颜色
    lineColor: {
      type: String,
      value: "#eaeef1",
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
    // 圆角值
    radius: {
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
});
