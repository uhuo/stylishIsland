// pages/book-detail/book-detail.js

import {
  BookModel
} from '../../models/book.js'

import {
  LikeModel
} from '../../models/like.js'

const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

  /**
   * Page initial data
   */
  data: {
    book: null,
    likeStatus: false,
    likeCount: 0,
    comments: [],
    // 表示页面底部的输入框 是否弹出
    posting: false
  },

  // 组件接收数据是通过 在wxml中 把组件的properties中定义的变量 作为组件的属性 进行赋值
  // 一个页面 如何接收 外部传来的数据？向页面传递的参数，都被包含在了onLoad: function (options)函数的参数options中。

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '努力加载中...',
    })
    const bid = options.bid
    const detail = bookModel.getDetail(bid)
    const likeStatus = bookModel.getLikeStatus(bid)
    const comments = bookModel.getComments(bid)
    // Promise.race([])把多个promise对象合并为一个，只要任何一个子promise实例对象 调用完成(返回了结果) 就触发then(res=>{})中回调函数的执行(res携带的是 众多子promise中首先返回的结果)
    // Promise.all([])函数(使用数组 接收多个promise实例对象)可以把多个promise的实例对象 合并成一个。返回值：新的promise对象(可以看做是 传入的promise实例的 一个合体)
    Promise.all([detail, likeStatus, comments])
      .then(res => {
        // 当子promise全部都完成之后，才调用回调函数
        console.log(res)
        this.setData({
          book: res[0],
          likeStatus: res[1].like_status,
          likeCount: res[1].fav_nums,
          comments: res[2].comments
        })
        wx.hideLoading()
      })
    // detail.then(res => {
    //   console.log(res)
    //   this.setData({
    //     book: res
    //   })
    // })
    // likeStatus.then(res => {
    //   console.log(res)
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums
    //   })
    // })
    // comments.then(res => {
    //   console.log(res)
    //   this.setData({
    //     comments: res.comments
    //   })
    // })
  },
  // onlike: function(event){}
  onLike(event) {
    const like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },

  onFakePost() {
    this.setData({
      posting: true
    })
  },

  onCancel() {
    this.setData({
      posting: false
    })
  },

  onPost(event) {
    const comment = event.detail.text || event.detail.value
    if (!comment) {
      return
    }
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }
    bookModel.postComment(this.data.book.id, comment)
      .then(res => {
        wx.showToast({
          title: '+ 1',
          icon: 'none'
        })
        // 把新增的评论 添加到 短评container的开头。要怎么做？
        // 把用户新增加的评论 添加到this.data.comments中，然后setData({comments: this.data.comments})使用新的comments数据 来更新页面中的comments数据(短评)
        // array.unshift可以把一个对象 添加到数组的开头
        this.data.comments.unshift({
          content: comment,
          nums: 1
        })
        this.setData({
          comments: this.data.comments,
          // 设置posting:false, 关闭mask和posting-container
          posting: false
        })
      })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})