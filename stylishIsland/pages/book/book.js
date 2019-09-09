// pages/book/book.js

import {
  BookModel
} from '../../models/book.js'

const bookModel = new BookModel()

// 好的编码习惯：
// 1. 属性简写 2.方法简写 3.在model中使用class(不使用prototype chain) 4.使用import/export(不使用require) 导入导出 
// 5. ctrl+shift+f格式化代码 6.模板字符串url: `classic/${index}/${nextOrPrevious}` 7.js对象中 最后一个属性的末尾 加逗号
// 8. 变量尽量使用const修饰

// 使用promise 从服务器拿数据
// javascript处理异步的几种方式：
// 1.callback回调。缺陷：回调地狱(会让代码复杂 不容易理解)，不能return值。
// 2.promise(可以解决 回调的2个缺陷), 优势：可以解决 多个异步等待合并。不需要层层传递callback(因为promise可以return，所以就不需要 层层传递callback)
// 3.async/await(ES2017提出的)

// promise是严格意义上的对象(不是函数)，对象是可以保存状态的(函数是不能保存状态的: 函数被执行完后 函数的结果 是要立即返回的，函数内部 是不能保存 返回的结果状态的。此时不考虑 闭包函数)


// promise的三种状态：pending(异步操作 正在被执行)/fullfilled(异步操作 执行完成)/rejected(异步操作 执行失败)
// 三种状态的发生和切换：new Promise()后，promise的状态为pending。对于处在pending状态下的promise，其结果只有fullfilled和rejected。
// 通过调用resolve和reject可以改变promise的状态：resolve(pending->fullfilled) reject(pending->rejected)
// 什么情况下 需要调用resolve和reject修改状态？调用异步操作成功后的success回调函数中 使用resolve(同时传入 调用异步操作所返回的结果res)，调用异步操作失败后的fail回调函数中 使用reject。
// 一旦调用resolve/reject之后，promise的状态 就凝固了(promise的状态 不能再改变了)

// 可以通过promise变量 拿到异步调用的结果。
// promise的状态为fullfilled时, 执行promise.then(callback1, callback2) 将调用callback1。callback1的参数 可以接收 异步操作的结果res.
// promise的状态为rejected时 执行promise.then(callback1, callback2) 将调用callback2。callback2的参数 接收error
// 并且 异步操作fullfilled之后 要做的操作 要写在callback1中，异步操作rejected之后 要做的操作 要写在callback2中。
// 1. 创建promise：new Promise(()=>{})
// 2. 异步代码 写在Promise参数指定的 回调函数中.

// promise的关键点在于：用对象的方式 保存了异步调用的结果，而promise在代码中是可以到处传递的(而 不需要附带任何的回调函数)。当需要从promise中取出 异步调用的结果时，才需要在promise.then中指定回调函数。
// const promise = new Promise((resolve, reject) => {
//   wx.getSystemInfo({
//     success: (res) => {
//       console.log(res)
//       console.log('res before resolve')
//       // 把getSystemInfo的调用结果res 传入resolve
//       resolve(res)
//     },
//     fail: (error) => {
//       reject()
//     }
//   })
// })
// promise.then((res) => {
//   console.log(res)
//   console.log('res after then')
// }, (error) => {
//   console.log(error)
// })

// ---------------------------------------------
// bookModel.getHotList()
//   .then(res => {
//     console.log(res)
//     // 要返回getMyBookCount(), 在外面来接收promise。不要在bookModel.getMyBookCount()后，直接接上.then 
//     return bookModel.getMyBookCount()
//   })
//   .then(res => {
//     console.log(res)
//     return bookModel.getMyBookCount()
//   })
//   .then(res => {
//     console.log(res)
//   })
// ---------------------------------------------
// const bookList = bookModel.getHotList()
// bookList.then(
//   res => {
//     console.log(res)
//     bookModel.getMyBookCount()
//       .then((res) => {
//         console.log(res)
//         bookModel.getMyBookCount()
//           .then(res => console.log(res))
//       })
//   }
// )
// ---------------------------------------------

Page({

  /**
   * Page initial data
   */
  data: {
    // 对要绑定到页面中的数据，最好在data中显示指定(以便初始化 data中的数据)
    books: [],
    searching: false,
    more: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    bookModel.getHotList()
      .then(res => {
        console.log(res)
        this.setData({
          books: res
        })
        // this.data.books = res 虽然会设置data中books的值，但页面不会使用data中的数据 更新页面. setData既设置了data，又更新了页面使用到的数据值
      })
  },

  onSearching(){
    this.setData({
      searching: true
    })
  },

  onCancel(){
    this.setData({
      searching: false
    })
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {
    this.setData({
      more: !this.data.more
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
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})