/*
 * @Author: liusuxian 382185882@qq.com
 * @Date: 2024-10-13 12:42:32
 * @LastEditors: liusuxian 382185882@qq.com
 * @LastEditTime: 2025-05-01 20:50:25
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
    // 字体颜色
    color: {
      type: String,
      value: "#666",
    },
    // 字体选中颜色
    selectedColor: {
      type: String,
      value: "",
    },
    // 字体大小
    fontSize: {
      type: Number,
      optionalTypes: [String],
      value: 26,
    },
    // 背景颜色
    backgroundColor: {
      type: String,
      value: "#fff",
    },
    // 图标大小
    iconSize: {
      type: Number,
      optionalTypes: [String],
      value: 80,
    },
    // 是否需要中间凸起按钮
    hump: {
      type: Boolean,
      value: false,
    },
    // 是否固定在底部
    fixed: {
      type: Boolean,
      value: true,
      observer(val) {
        this.setHeight();
      },
    },
    // 固定在底部时是否开启占位
    placeholder: {
      type: Boolean,
      value: true,
      observer(val) {
        this.setHeight();
      },
    },
    // 是否为 iPhoneX 留出底部安全距离
    safeAreaInsetBottom: {
      type: Boolean,
      value: true,
    },
    // 角标字体颜色
    badgeColor: {
      type: String,
      value: "#fff",
    },
    // 角标背景颜色
    badgeBgColor: {
      type: String,
      value: "",
    },
    // 去掉顶部细线
    unlined: {
      type: Boolean,
      value: false,
    },
    // 是否开启高斯模糊效果[仅在支持的浏览器有效果]
    backdropFilter: {
      type: Boolean,
      value: false,
    },
    // z-index值，isFixed为true时生效
    zIndex: {
      type: Number,
      value: 9999,
    },
    // 单位
    unit: {
      type: String,
      value: "rpx",
    },
  },
  data: {
    current: 0, // 当前tabbar索引
    // tabbar列表
    // {
    //   "pagePath": "/pages/index/index", // 页面路径
    //   "text": "标题", // 标题
    //   "iconClass": "class-name-1 class-name-2", // 字体图标类名
    //   "selectedIconClass": "class-name-1 class-name-2", // 选中字体图标类名
    //   "iconPath": "iconPath.png", // 图标地址
    //   "selectedIconPath": "selectedIconPath.png", // 选中图标地址
    //   "hump": true, // 是否为凸起图标
    //   "num": 2,   // 角标数量
    //   "isDot": true,  // 角标是否为圆点
    // }
    list: [],
    height: 0,
    g_selectedColor: (wx.$my && wx.$my.color.primary) || "#5677fc",
    g_badgeBgColor: (wx.$my && wx.$my.color.pink) || "#f74d54",
  },
  lifetimes: {
    attached() {
      const objData = this.getTabbarObjData();
      this.setData({
        current: objData.current,
        list: objData.list,
      });
    },
    ready() {
      this.setHeight();
    },
  },
  methods: {
    // 获取当前tabbar实例数据
    getTabbarObjData() {
      return getApp().globalData.tabBar;
    },
    setHeight() {
      if (!this.data.fixed || !this.data.placeholder) {
        return;
      }
      wx.nextTick(() => {
        let query = this.createSelectorQuery();
        query
          .select(".my-tabbar")
          .boundingClientRect((rect) => {
            if (rect && rect.height) {
              this.setData({ height: rect.height });
              this.triggerEvent("init", {
                height: rect.height,
              });
            }
          })
          .exec();
      });
    },
    tabbarSwitch(e) {
      const dataset = e.currentTarget.dataset;
      const index = Number(dataset.index);
      if (this.getTabbarObjData().current !== index) {
        getApp().globalData.tabBar.current = index;
        this.setData({ current: index });
        // 跳转页面
        if (dataset.pagePath) {
          return wx.redirectTo({ url: dataset.pagePath });
        }
      }
    },
  },
});
