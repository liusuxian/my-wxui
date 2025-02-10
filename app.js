/*
 * @Author: liusuxian 382185882@qq.com
 * @Date: 2024-10-10 13:35:36
 * @LastEditors: liusuxian 382185882@qq.com
 * @LastEditTime: 2025-02-10 15:59:52
 * @Description:
 *
 * Copyright (c) 2024 by liusuxian email: 382185882@qq.com, All Rights Reserved.
 */
import propsConfig from "./components/my-config/index";
wx.$my = propsConfig;

// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);

    // 登录
    wx.login({
      success: (res) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });
  },
  globalData: {
    userInfo: null,
    tabBar: {
      current: 0, // 当前tabbar索引
      list: [
        {
          pagePath: "/pages/code/code",
          text: "组件",
          iconClass: "my-upload-icon my-upload-icon__plus",
          iconPath: "",
          selectedIconPath: "",
          hump: false,
          num: 0,
          isDot: false,
        },
        {
          pagePath: "/pages/mine/mine",
          text: "我的",
          iconClass: "my-upload-icon my-upload-icon__plus",
          iconPath: "",
          selectedIconPath: "",
          hump: false,
          num: 0,
          isDot: false,
        },
      ], // tabbar列表
    }, // tabbar实例数据
  },
});
