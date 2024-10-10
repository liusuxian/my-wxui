/*
 * @Author: liusuxian 382185882@qq.com
 * @Date: 2024-09-26 12:11:12
 * @LastEditors: liusuxian 382185882@qq.com
 * @LastEditTime: 2024-10-07 19:52:43
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
    // 是否为 iPhoneX 留出底部安全距离
    safeAreaInsetBottom: {
      type: Boolean,
      value: true,
    },
  },
});
