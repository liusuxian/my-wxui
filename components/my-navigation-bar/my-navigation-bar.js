/*
 * @Author: liusuxian 382185882@qq.com
 * @Date: 2024-02-21 17:33:53
 * @LastEditors: liusuxian 382185882@qq.com
 * @LastEditTime: 2024-10-14 19:08:52
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
    // 标题
    title: {
      type: String,
      value: "",
    },
    // 字体颜色
    color: {
      type: String,
      value: "#323233",
    },
    // 标题字体大小
    titleSize: {
      type: Number,
      optionalTypes: [String],
      value: 32,
    },
    // 背景颜色 不支持RGB，设置渐变色时 isOpacity 属性需设置为false
    backgroundColor: {
      type: String,
      value: "#fff",
      observer(val) {
        let bgColor = "";
        if (this.data.isOpacity) {
          bgColor = this.hexToRgb(val);
        } else {
          bgColor = this.data.transparent ? rgba(0, 0, 0, 0) : val;
        }
        this.setData({
          background: bgColor,
        });
      },
    },
    // 是否显示左侧箭头
    leftArrow: {
      type: Boolean,
      value: false,
    },
    // 左侧箭头大小
    leftArrowSize: {
      type: Number,
      optionalTypes: [String],
      value: 48,
    },
    // 左侧文案
    leftText: {
      type: String,
      value: "",
    },
    // 右侧文案
    rightText: {
      type: String,
      value: "",
    },
    // 左侧和右侧文案字体大小
    textSize: {
      type: Number,
      optionalTypes: [String],
      value: 28,
    },
    // 点击左侧是否返回上一页
    clickLeftBack: {
      type: Boolean,
      value: true,
    },
    // 是否显示下边框
    border: {
      type: Boolean,
      value: true,
    },
    // 是否设置不透明度，设置渐变色时不支持，且值需要设置为false
    isOpacity: {
      type: Boolean,
      value: false,
    },
    // 不透明度最大值 0-1
    maxOpacity: {
      type: Number,
      value: 1,
    },
    // 背景透明（设置该属性，则背景透明，只出现内容，isOpacity和maxOpacity失效）
    transparent: {
      type: Boolean,
      value: false,
    },
    // 滚动条滚动距离
    scrollTop: {
      type: Number,
      value: 0,
      observer(val) {
        if (this.data.isOpacity && !this.data.transparent) {
          this.opacityChange();
        }
      },
    },
    // isOpacity 为true时生效（opacity=scrollTop / windowWidth * scrollRatio）
    scrollRatio: {
      type: Number,
      value: 0.3,
    },
    // 是否自定义NavigationBar内容
    custom: {
      type: Boolean,
      value: false,
    },
    // 是否留出顶部安全距离（状态栏高度）
    safeAreaInsetTop: {
      type: Boolean,
      value: true,
    },
    // 是否固定在顶部
    fixed: {
      type: Boolean,
      value: true,
    },
    // 固定在顶部时是否开启占位
    placeholder: {
      type: Boolean,
      value: true,
    },
    // 是否开启高斯模糊效果[仅在支持的浏览器有效果]，为true时maxOpacity设置小于1的值
    backdropFilter: {
      type: Boolean,
      value: false,
    },
    // 下拉隐藏NavigationBar，主要针对有回弹效果ios端
    dropDownHide: {
      type: Boolean,
      value: false,
    },
    // z-index值
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
    width: 375, // header宽度
    left: 375, // 小程序端 左侧距胶囊按钮距离
    height: 44, // header高度
    top: 0,
    scrollH: 1, // 滚动总高度，计算opacity
    opacity: 0, // 0-1
    statusBarHeight: 0, // 状态栏高度
    background: "255, 255, 255", // header背景色
    dropDownOpacity: 1,
  },
  lifetimes: {
    attached: function () {
      let bgColor = "";
      if (this.data.isOpacity) {
        bgColor = this.hexToRgb(this.data.backgroundColor);
      } else {
        bgColor = this.data.transparent
          ? rgba(0, 0, 0, 0)
          : this.data.backgroundColor;
      }
      this.setData({
        opacity:
          this.data.isOpacity || this.data.transparent
            ? this.data.opacity
            : this.data.maxOpacity,
        background: bgColor,
        dropDownOpacity: this.data.backdropFilter && 0,
      });
      let obj = wx.getMenuButtonBoundingClientRect();
      let windowInfo = wx.getWindowInfo();
      let height = this.data.height;
      if (this.data.safeAreaInsetTop) {
        height = obj.top
          ? obj.top + obj.height + 8
          : windowInfo.statusBarHeight + 44;
      }
      this.setData(
        {
          statusBarHeight: windowInfo.statusBarHeight,
          width: windowInfo.windowWidth,
          left: obj.left || windowInfo.windowWidth,
          height: height,
          scrollH: windowInfo.windowWidth * this.data.scrollRatio,
          top: obj.top
            ? obj.top + (obj.height - 32) / 2
            : windowInfo.statusBarHeight + 6,
        },
        () => {
          this.triggerEvent("init", {
            width: this.data.width,
            height: this.data.height,
            left: obj.left,
            top: this.data.top,
            statusBarHeight: this.data.statusBarHeight,
            opacity: this.data.opacity,
            windowHeight: windowInfo.windowHeight,
          });
        }
      );
    },
  },
  methods: {
    hexToRgb(hex) {
      let rgb = "255,255,255";
      if (hex && ~hex.indexOf("#")) {
        if (hex.length === 4) {
          let text = hex.substring(1, 4);
          hex = "#" + text + text;
        }
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (result) {
          rgb = `${parseInt(result[1], 16)},${parseInt(
            result[2],
            16
          )},${parseInt(result[3], 16)}`;
        }
      }
      return rgb;
    },
    opacityChange() {
      if (this.data.dropDownHide) {
        if (this.data.scrollTop < 0) {
          if (this.data.dropDownOpacity > 0) {
            this.setData({
              dropDownOpacity: 1 - Math.abs(this.scrollTop) / 30,
            });
          }
        } else {
          this.setData({
            dropDownOpacity: 1,
          });
        }
      }
      let scroll = this.data.scrollTop <= 1 ? 0 : this.data.scrollTop;
      let opacity = scroll / this.data.scrollH;
      if (
        (this.data.opacity >= this.data.maxOpacity &&
          opacity >= this.data.maxOpacity) ||
        (this.data.opacity == 0 && opacity == 0)
      ) {
        return;
      }
      this.setData({
        opacity:
          opacity > this.data.maxOpacity ? this.data.maxOpacity : opacity,
      });
      if (this.data.backdropFilter) {
        this.setData({
          dropDownOpacity:
            this.data.opacity >= this.data.maxOpacity ? 1 : this.data.opacity,
        });
      }
      this.triggerEvent("change", {
        opacity: opacity,
      });
    },
    onClickLeft(event) {
      if (this.data.clickLeftBack) {
        wx.navigateBack();
      } else {
        this.triggerEvent("onClickLeft", event);
      }
    },
    onClickRight(event) {
      this.triggerEvent("onClickRight", event);
    },
  },
});
