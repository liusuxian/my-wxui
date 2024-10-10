/*
 * @Author: liusuxian 382185882@qq.com
 * @Date: 2024-08-03 22:57:40
 * @LastEditors: liusuxian 382185882@qq.com
 * @LastEditTime: 2024-10-10 12:15:35
 * @Description:
 *
 * Copyright (c) 2024 by liusuxian email: 382185882@qq.com, All Rights Reserved.
 */
Component({
  options: {
    multipleSlots: true,
  },
  properties: {
    // 列表数据，不建议一次性加载过多数据
    listData: {
      type: Array,
      value: [],
      observer(val) {
        this.data.newVal += 1;
        if (this.data.isRender) {
          this.data.isRender = false;
          this.data.oldVal += 1;
          this.columnChange();
        }
      },
    },
    // 每页数据条数（固定条数），当数据长度小于等于该数时表示第一页数据，刷新重置
    pageSize: {
      type: Number,
      value: 10,
    },
    // 数据分组类型：1简单左右分组，按顺序排列，伪瀑布流 2计算左右容器高度进行分组
    type: {
      type: Number,
      value: 1,
    },
    // 瀑布流列数，目前支持最大值为 2
    columnCount: {
      type: Number,
      value: 2,
      observer(val) {
        this.data.isRender = false;
        this.columnChange(val);
      },
    },
    // 列与列的间隙
    columnGap: {
      type: Number,
      optionalTypes: [String],
      value: 10,
    },
    // 左侧和列表的间隙
    leftGap: {
      type: Number,
      optionalTypes: [String],
      value: 0,
    },
    // 右侧和列表的间隙
    rightGap: {
      type: Number,
      optionalTypes: [String],
      value: 0,
    },
    // 列表背景色，可使用渐变色
    backgroundColor: {
      type: String,
      value: "transparent",
    },
    // 列表外层容器圆角值
    radius: {
      type: Number,
      optionalTypes: [String],
      value: 0,
    },
    // 是否为列表展示，item 中有该功能是时生效
    isList: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    leftListConst: [],
    leftList: [],
    rightList: [],
    newVal: 0,
    oldVal: 0,
    isRender: false,
  },
  lifetimes: {
    ready: function () {
      this.columnChange();
    },
  },
  methods: {
    columnChange(val) {
      if (this.data.columnCount < 2) {
        this.setData({
          leftList: [...this.data.listData],
        });
        this.data.isRender = true;
      } else {
        if (val && val == 2) {
          this.setData(
            {
              leftList: [...this.data.leftListConst],
            },
            () => {
              this.initData();
            }
          );
        } else {
          this.initData();
        }
      }
    },
    initData() {
      if (this.data.type == 1) {
        this.getSubGroup();
      } else {
        this.getArrayByHeight();
      }
    },
    getDiffList() {
      let diffList = [];
      let total = this.data.listData.length;
      if (total <= this.data.pageSize) {
        this.setData({
          leftListConst: [],
          leftList: [],
          rightList: [],
        });
      }
      let sum = this.data.leftListConst.length + this.data.rightList.length;
      let diff = total - sum;
      if (diff > 0) {
        diffList = [...this.data.listData].filter((item, index) => {
          return index >= sum;
        });
      }
      return diffList;
    },
    getSubGroup() {
      // type=1 时执行简单数据分组
      if (!this.data.listData && this.data.listData.length === 0) return;
      let leftList = [];
      let rightList = [];
      let data = this.getDiffList();
      data.forEach((item, index) => {
        if (index % 2 === 0) {
          leftList.push(item);
        } else {
          rightList.push(item);
        }
      });
      this.setData({
        leftList: this.data.leftList.concat(leftList),
        leftListConst: this.data.leftListConst.concat(leftList),
        rightList: this.data.rightList.concat(rightList),
      });
      this.data.isRender = true;
    },
    async handleData(data) {
      const item = data.shift();
      await this.render(item);
      if (data.length > 0) {
        setTimeout(() => {
          this.handleData(data);
        }, 60);
      } else {
        this.data.isRender = true;
        if (this.data.newVal !== this.data.oldVal && this.data.oldVal !== 0) {
          this.data.isRender = false;
          this.columnChange();
          this.data.oldVal = this.data.newVal;
        } else {
          this.data.oldVal = this.data.newVal;
        }
      }
    },
    async getArrayByHeight() {
      if (!this.data.listData && this.data.listData.length === 0) return;
      let data = this.getDiffList();
      if (data.length > 0) {
        this.handleData(data);
      } else {
        this.data.isRender = true;
        if (this.data.newVal !== this.data.oldVal && this.data.oldVal !== 0) {
          this.data.isRender = false;
          this.columnChange();
          this.data.oldVal = this.data.newVal;
        } else {
          this.data.oldVal = this.data.newVal;
        }
      }
    },
    sleep(millisecond) {
      let now = new Date();
      let exitTime = now.getTime() + millisecond;
      while (true) {
        now = new Date();
        if (now.getTime() > exitTime) return;
      }
    },
    async render(item) {
      let obj = await this.getContainerHeight();
      return await new Promise((resolve, reject) => {
        if (obj && typeof obj.leftHeight === "number") {
          if (obj.leftHeight <= obj.rightHeight) {
            let leftList = [...this.data.leftList];
            let leftListConst = [...this.data.leftListConst];
            leftList.push(item);
            leftListConst.push(item);
            this.setData(
              {
                leftList: leftList,
                leftListConst: leftListConst,
              },
              () => {
                resolve(true);
              }
            );
          } else {
            let rightList = [...this.data.rightList];
            rightList.push(item);
            this.setData(
              {
                rightList: rightList,
              },
              () => {
                resolve(true);
              }
            );
          }
        } else {
          reject(false);
        }
      });
    },
    async getContainerHeight() {
      // type=2
      return await new Promise((resolve, reject) => {
        const query = wx.createSelectorQuery().in(this);
        let nodes = query.selectAll("#my-waterfall-left, #my-waterfall-right");
        nodes.boundingClientRect().exec((res) => {
          if (res && res[0]) {
            const rects = res[0];
            const leftHeight = rects[0].height;
            const rightHeight = rects[1].height;
            resolve({
              leftHeight: leftHeight,
              rightHeight: rightHeight,
            });
          } else {
            reject(res);
          }
        });
      });
    },
  },
});
