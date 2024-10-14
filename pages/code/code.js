/*
 * @Author: liusuxian 382185882@qq.com
 * @Date: 2024-10-10 13:45:44
 * @LastEditors: liusuxian 382185882@qq.com
 * @LastEditTime: 2024-10-14 19:52:34
 * @Description:
 *
 * Copyright (c) 2024 by liusuxian email: 382185882@qq.com, All Rights Reserved.
 */
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
  onShowModal(e) {
    console.log("onShowModal: ", e);
    this.setData({
      showModal: true,
    });
  },
  onCloseModal(e) {
    console.log("onCloseModal: ", e);
    this.setData({
      showModal: false,
    });
  },
});
