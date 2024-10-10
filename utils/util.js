/*
 * @Author: liusuxian 382185882@qq.com
 * @Date: 2024-10-10 17:50:30
 * @LastEditors: liusuxian 382185882@qq.com
 * @LastEditTime: 2024-10-10 17:50:48
 * @Description:
 *
 * Copyright (c) 2024 by liusuxian email: 382185882@qq.com, All Rights Reserved.
 */
const formatTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${[year, month, day].map(formatNumber).join("/")} ${[
    hour,
    minute,
    second,
  ]
    .map(formatNumber)
    .join(":")}`;
};

const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

/**
 * @description: 获取当前页面
 * @return {Object} 返回当前页面信息
 */
const getCurrentPage = () => {
  const pages = getCurrentPages(); // 获取当前页面栈
  const currentPage = pages[pages.length - 1]; // 数组中最后一个元素即为当前页面
  return currentPage;
};

/**
 * @description: 对象转URL参数
 * @param {Object} params 参数
 * @return {String} 返回URL参数
 */
const queryParams = (params) => {
  var paramStr = "";
  Object.keys(params).forEach((item) => {
    if (paramStr === "") {
      if (params[item]) {
        paramStr = `?${item}=${params[item]}`;
      }
    } else {
      if (params[item]) {
        paramStr = `${paramStr}&${item}=${params[item]}`;
      }
    }
  });
  return paramStr;
};

/**
 * @description: 时间戳转日期时间字符串
 * @param {Number} timestamp 时间戳
 * @return {String} 日期时间字符串
 */
const timestampToDateTime = (timestamp) => {
  var date = new Date(timestamp * 1000);
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0") +
    " " +
    date.getHours().toString().padStart(2, "0") +
    ":" +
    date.getMinutes().toString().padStart(2, "0") +
    ":" +
    date.getSeconds().toString().padStart(2, "0")
  );
};

/**
 * @description: 时间戳转日期字符串
 * @param {Number} timestamp 时间戳
 * @return {String} 日期字符串
 */
const timestampToDate = (timestamp) => {
  var date = new Date(timestamp * 1000);
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0")
  );
};

/**
 * @description: 获取当前时间戳
 * @param {Number} type 类型 1:秒 2:毫秒
 * @return {Number} 时间戳
 */
const curTimestamp = (type = 1) => {
  if (type === 1) {
    return Math.floor(Date.now() / 1000);
  }
  return Date.now();
};

/**
 * @description: 获取 URL 中的文件名
 * @param {String} url 文件URL
 * @return {String} 文件名
 */
const getUrlFileName = (url) => {
  if (!url) {
    return "";
  }

  try {
    // 通过查找最后一个斜杠来手动解析文件名
    const lastIndex = url.lastIndexOf("/");
    if (lastIndex === -1) {
      return "";
    }
    const fileName = url.substring(lastIndex + 1);
    if (!fileName) {
      return "";
    }
    return fileName;
  } catch (error) {
    return "";
  }
};

/**
 * @description: 下载文件
 * @param String url 文件URL
 * @return {Promise} 返回 Promise 对象
 */
const downloadFile = (url) => {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url,
      success: (res) => {
        resolve(res);
      },
      fail: (res) => {
        reject(res);
      },
    });
  });
};

/**
 * @description: 保存文件到本地
 * @param {String} tempFilePath 临时文件路径
 * @param {String} filePath 保存路径
 * @return {Promise} 返回 Promise 对象
 */
const saveFile = (tempFilePath, filePath) => {
  return new Promise((resolve, reject) => {
    wx.getFileSystemManager().saveFile({
      tempFilePath,
      filePath,
      success: (res) => {
        resolve(res);
      },
      fail: (res) => {
        reject(res);
      },
    });
  });
};

/**
 * @description: 保存图片到相册
 * @param {String} filePath 图片路径
 * @return {Promise} 返回 Promise 对象
 */
const saveImageToPhotosAlbum = (filePath) => {
  return new Promise((resolve, reject) => {
    wx.saveImageToPhotosAlbum({
      filePath,
      success: (res) => {
        resolve(res);
      },
      fail: (res) => {
        reject(res);
      },
    });
  });
};

module.exports = {
  formatTime,
  getCurrentPage,
  queryParams,
  timestampToDateTime,
  timestampToDate,
  curTimestamp,
  getUrlFileName,
  downloadFile,
  saveFile,
  saveImageToPhotosAlbum,
};
