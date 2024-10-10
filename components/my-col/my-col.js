/*
 * @Author: liusuxian 382185882@qq.com
 * @Date: 2024-10-07 01:55:02
 * @LastEditors: liusuxian 382185882@qq.com
 * @LastEditTime: 2024-10-08 19:19:42
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
    // 跨度24
    span: {
      type: Number,
      value: 24,
    },
    // margin-left值，取值1~24
    offset: {
      type: Number,
      value: 0,
    },
    // left值，取值1~24
    pushLeft: {
      type: Number,
      value: -1,
    },
    // right值，取值1~24
    pullRight: {
      type: Number,
      value: -1,
    },
    // Number：跨度。Object：span、offset、pushLeft、pullRight值。max-width:767px
    xs: {
      type: Number,
      optionalTypes: [Object],
      value: -1,
    },
    // Number：跨度。Object：span、offset、pushLeft、pullRight值。max-width:768px
    sm: {
      type: Number,
      optionalTypes: [Object],
      value: -1,
    },
    // Number：跨度。Object：span、offset、pushLeft、pullRight值。max-width:992px
    md: {
      type: Number,
      optionalTypes: [Object],
      value: -1,
    },
    // Number：跨度。Object：span、offset、pushLeft、pullRight值。max-width:1200px
    lg: {
      type: Number,
      optionalTypes: [Object],
      value: -1,
    },
    // Number：跨度。Object：span、offset、pushLeft、pullRight值。max-width:1920px
    xl: {
      type: Number,
      optionalTypes: [Object],
      value: -1,
    },
    // 单位
    unit: {
      type: String,
      value: "rpx",
    },
  },
  relations: {
    "../my-row/my-row": {
      type: "ancestor",
    },
  },
  data: {
    gutter: 0, // 栅格间间隔
    classList: ["my-col"],
  },
  lifetimes: {
    attached: function () {
      this.updateCol();
    },
  },
  methods: {
    updateGutter: function (newGutter) {
      this.setData({
        gutter: newGutter,
      });
    },
    updateCol() {
      var classList = ["my-col"];
      classList.push("my-col-" + this.data.span);
      classList.push("my-col-offset-" + this.data.offset);
      if (this.data.pushLeft !== -1) {
        this.data.pushLeft &&
          classList.push("my-col-push-" + this.data.pushLeft);
      }
      if (this.data.pullRight !== -1) {
        this.data.pullRight &&
          classList.push("my-col-pull-" + this.data.pullRight);
      }
      this.screenSizeSet("xs", classList);
      this.screenSizeSet("sm", classList);
      this.screenSizeSet("md", classList);
      this.screenSizeSet("lg", classList);
      this.screenSizeSet("xl", classList);
      this.setData({
        classList: classList,
      });
    },
    screenSizeSet(screen, classList) {
      if (typeof this.data[screen] === "number" && this.data[screen] !== -1) {
        classList.push("my-col-" + screen + "-" + this.data[screen]);
      } else if (typeof this.data[screen] === "object") {
        typeof this.data[screen].offset === "number" &&
          classList.push(
            "my-col-" + screen + "-offset-" + this.data[screen].offset
          );
        typeof this.data[screen].pushLeft === "number" &&
          classList.push(
            "my-col-" + screen + "-push-" + this.data[screen].pushLeft
          );
        typeof this.data[screen].pullRight === "number" &&
          classList.push(
            "my-col-" + screen + "-pull-" + this.data[screen].pullRight
          );
        typeof this.data[screen].span === "number" &&
          classList.push("my-col-" + screen + "-" + this.data[screen].span);
      }
    },
  },
});
