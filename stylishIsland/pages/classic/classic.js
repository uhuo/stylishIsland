import {ClassicModel} from '../../models/classic.js'
import {LikeModel} from '../../models/like.js'
// 在import时，不要使用 ’绝对路径‘，请使用’相对路径‘
// 调试工具中的Sources下，是经处理过的小程序的源文件
let classicModel = new ClassicModel()
let likeModel = new LikeModel()
// 在页面中 调用model相关的方法 填充(页面需要的)数据
// model主要是处理业务逻辑的，而页面主要用来 绑定数据。(有了model之后，页面的逻辑也更清晰)

// pages/classic/classic.js
// 何时加载页面数据？在加载页面时，进行 页面数据的加载
// 何时加载页面？小程序提供了一组生命周期函数，可以让我们监听到 页面的生命周期。
Page({

  /** 
   * Page initial data
   */
  // 对于一个page页面来说，wxml中使用的所有变量 都是由data来决定的。
  // 对于组件来说，wxml使用的变量 来自于 properties和data
  // notice：wxml要使用的所有变量 最好在data中 都进行指明
  data: {
    classicData: null,
    // 由于在onload中，使用getLatest获取最新的期刊数据，所以latest默认就是true
    latest: true,
    first: false,
    likeStatus: false,
    likeCount: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  // wx.request是异步的，不能直接取wx.request的返回值。
  // request的结果 会作为 success回调函数 的参数，传入success回调函数中

  // Promise主要用来解决 异步函数的回调函数 的嵌套问题(比如 wx.request的 success回调函数中，又要写wx.request)。
  // 如果在异步函数中 采用回调函数的方式，来处理异步函数 执行完后 要进行的操作。这样就剥夺了函数return的能力。
  // 但是使用promise就可以实现 异步也可以return
  onLoad: function (options) {
    classicModel.getLatest((res)=>{
      // this._getLikeStatus(res.id, res.type)
      this.setData({
        // 在data中的数据，对应的wxml都可以访问到
        // setData所做的是 对新增的属性 进行添加并设置值，对已有的属性 进行数值更新
        // data中没有classicData属性，添加classicData属性到data中 并给classicData 设置 值
        classicData: res,
        // 扩展运算符 '...'。 ...res：展开res
        // ...res

        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
      console.log(this.data)
    })
  },

  onLike: function(event){
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type)
  },

  // 只要是事件监听函数 都可以接收event参数
  onNext: function(event){
    this._updateClassic('next')
  },

  onPrevious: function (event) {
    this._updateClassic('previous')
  },

  _updateClassic: function(nextOrPrevious){
    let index = this.data.classicData.index
    classicModel.getClassic(index, nextOrPrevious, (res)=>{
      this._getLikeStatus(res.id, res.type)
      console.log(res)
      this.setData({
        classicData: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  // 获取当前期刊的 喜欢数量和喜欢状态 数据
  _getLikeStatus: function(artID, category){
    likeModel.getClassicLikeStatus(artID, category, (res)=>{
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})