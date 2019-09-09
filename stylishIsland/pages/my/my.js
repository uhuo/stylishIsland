// pages/my/my.js

// 小程序中获取用户信息 是需要 用户授权的。如果是静默的话 就不需要用户的授权。
// 老版小程序 可通过调用API(wx.getUserInfo) 向用户弹出 授权窗口。新版的小程序 需要使用小程序内置的button组件 来进行授权窗口的弹出.
// 因为使用API的形式，是由开发者来决定 何时出现弹窗的。而使用button组件的形式 使得开发者要在button界面上来引导用户点击，可以让用户主动点击button 来弹出授权窗口(避免无征兆的弹窗出现)

// 现在wx.getUserInfo依然有效(可以获取到 用户信息) 只不过是功能发生了变化(只有在用户已授权的情况下，wx.getUserInfo才能够获取到用户信息(we.getUserInfo不再进行弹窗))

import {
  ClassicModel
} from '../../models/classic.js'
import {
  BookModel
} from '../../models/book.js'

const classicModel = new ClassicModel()
const bookModel = new BookModel()

Page({

  /**
   * Page initial data
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
    // 在onLoad函数中，如何获知 用户是否授权
    // wx.getUserInfo({
    //   success: data=>{
    //     console.log(data)
    //   }
    // })
  },

  userAuthorized() {
    // 用户是否授权
    wx.getSetting({
      success: data => {
        console.log(data.authSetting)
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              console.log(data)
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        } else {
          this.setData({
            authorized: false,
            userInfo: null
          })
        }
      }
    })
  },

  // 在对button按钮绑定bind:getuserinfo="onGetUserInfo"事件后，当用户首次点击按钮时，会弹出授权窗口(让用户授权), 之后会调用一次onGetUserInfo。
  // 在用户已授权的情况下，用户点击授权按钮，会默认调用一次onGetUserInfo。
  onGetUserInfo(event) {
    console.log(event)
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        authorized: true,
        userInfo
      })
    }

  },

  getMyFavor() {
    classicModel.getMyFavor(res => {
      console.log(res)
      this.setData({
        classics: res
      })
    })
  },

  getMyBookCount() {
    bookModel.getMyBookCount()
      .then(res => {
        this.setData({
          bookCount: res.count
        })
      })
  },

  onJumpToAbout() {
    // 小程序的关联，是要在公众号(服务号，订阅号)中 进行app-id的关联的，条件不足 没有实现。
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  onStudy() {
    wx.navigateTo({
      url: '/pages/course/course',
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