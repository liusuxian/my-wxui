/*
 * @Author: liusuxian 382185882@qq.com
 * @Date: 2024-10-06 19:19:12
 * @LastEditors: liusuxian 382185882@qq.com
 * @LastEditTime: 2024-10-09 22:18:53
 * @Description:
 *
 * Copyright (c) 2024 by liusuxian email: 382185882@qq.com, All Rights Reserved.
 */
Component({
  externalClasses: ["custom-class"],
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否正在下载
    isDownloading: {
      type: Boolean,
      value: false,
    },
    // 当前下载的文件序号
    current: {
      type: Number,
      value: 0,
    },
    // 文件总数
    total: {
      type: Number,
      value: 0,
    },
    // 下载状态 0:下载中 1:下载成功 2:下载失败
    status: {
      type: Number,
      value: 0,
    },
    // 下载成功图标，图片资源
    successIcon: {
      type: String,
      value: "",
    },
    // 宽度
    width: {
      type: Number,
      optionalTypes: [String],
      value: 200,
    },
    // 高度
    height: {
      type: Number,
      optionalTypes: [String],
      value: 200,
    },
    // 圆角
    radius: {
      type: Number,
      optionalTypes: [String],
      value: 20,
    },
    // 背景颜色
    backgroundColor: {
      type: String,
      value: "rgba(35, 35, 35, 0.8)",
    },
    // 字体颜色
    color: {
      type: String,
      value: "#fff",
    },
    // 标题字体大小
    titleSize: {
      type: Number,
      optionalTypes: [String],
      value: 48,
    },
    // 内容
    content: {
      type: String,
      value: "",
    },
    // 内容字体大小
    contentSize: {
      type: Number,
      optionalTypes: [String],
      value: 28,
    },
    // 单位
    unit: {
      type: String,
      value: "rpx",
    },
    // 自定义组件
    custom: {
      type: Boolean,
      value: false,
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    contentText: "", // 内容文本
    statusValue: 0, // 下载状态值
    show: false, // 是否显示组件
  },
  /**
   * 组件数据字段监听器，用于监听 properties 和 data 的变化
   */
  observers: {
    "isDownloading, status, content": function (
      isDownloading,
      status,
      content
    ) {
      if (isDownloading) {
        this.setData({ show: true });
        switch (status) {
          case 0:
            this.setData({ contentText: content });
            break;
          case 1:
            this.onClose(status, content, 1000);
            break;
          case 2:
            this.onClose(status, content, 500);
            break;
        }
      }
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onClose(status, content, delay) {
      setTimeout(() => {
        this.setData({
          contentText: content,
          statusValue: status,
        });
        setTimeout(() => {
          this.setData(
            {
              show: false,
            },
            () => {
              this.triggerEvent("close", {});
            }
          );
        }, 2000);
      }, delay);
    },
  },
});
