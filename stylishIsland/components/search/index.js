// components/search/index.js
// 怎么才能监听到 (用户滑动页面到底部)这件事？
// 1. 使用小程序提供的内置组件scroll-view(把books-container所在的view替换为scrollview，使用ScrollView提供的 监听触底事件的方法，就可以监听到触底事件了)
// 2. 用page页面的onReachBottom函数 监听滑动事件。onReachBottom在组件中 是无效的。
// 在页面的onReachBottom中监听到 页面触底事件时，可以向组件发送一个消息。
import {
  KeywordModel
} from './keyword.js'

import {
  BookModel
} from '../../models/book.js'

import {
  paginationBeh
} from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  behaviors: [paginationBeh],

  /**
   * Component properties
   */
  properties: {
    // 当组件被显示时，是会设置properties中指定的属性的，从而触发observer执行(第一次执行observer时，由于queryWord为空 是不会从服务器加载数据的)
    more: {
      type: String,
      // 当监听到属性more的值 发生改变时，会触发observer. 'loadMore'为在methods中定义的方法
      observer: 'loadMore'
    }
  },

  /**
   * Component initial data
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    queryWord: '',
    // loading: false,
    loadingCenter: false
    // from: 0
  },

  // 初始化组件时，小程序默认调用的初始化的函数(attached)
  attached() {
    this.setData({
      // historyWords 等同于  historyWords: historyWords
      historyWords: keywordModel.getHistory()
    })
    keywordModel.getHotKeyword()
      .then(res => {
        this.setData({
          hotWords: res.hot
        })
      })
  },

  /**
   * Component methods
   */
  methods: {
    loadMore() {
      console.log('load more')
      if (!this.data.queryWord) {
        return
      }
      if (this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        this.locked()
        bookModel.search(this.getCursorIndex(), this.data.queryWord).then(res => {
          console.log(res)
          this.setMoreData(res.books)
          this.unLocked()
        }, () => {
          this.unLocked()
        })
      }
    },

    // _load_more() {
    //   console.log('load more')
    //   // 点击搜索框时 触发search组件的显示(从而触发this.properties.more值的改变 进而触发_load_more的调用)。由于此时queryWord为null，执行判断时if(!this.data.queryWord){return}过滤掉了首次的bookModel.search请求
    //   if (!this.data.queryWord) {
    //     return
    //   }
    //   // 从bookModel.search请求到返回是需要几秒的时间的，在此期间 用户可能会多次触发 触底事件。为避免在此期间的多次触底事件拿到相同的起始位置 进而发送请求得到相同数据，首次触底事件会把this.data.loading改为true 让后续的触底事件得不到执行 避免获得重复的数据。
    //   if (this.data.loading) {
    //     return
    //   }
    //   this.data.loading = true
    //   const length = this.data.dataArray.length
    //   bookModel.search(length, this.data.queryWord).then(res => {
    //     console.log(res)
    //     const temp = this.data.dataArray.concat(res.books)
    //     this.setData({
    //       dataArray: temp,
    //     })
    //     // 请求返回结果(并重新设置了dataArray)之后，进行解锁。从而让之后的触底事件 可以继续加载服务器数据。
    //     this.data.loading = false
    //   })
    // },

    // _load_more() {
    //   this.data.from = this.data.from + this.data.dataArray.length
    //   this.data.queryWord && bookModel.search(this.data.from, this.data.queryWord).then(res => {
    //     this.setData({
    //       dataArray: res.books
    //     })
    //   })
    // },

    onConfirm(event) {
      this.initialize()
      this._showResult()
      this._showLoadingCenter()
      
      const queryWord = event.detail.value || event.detail.text
      bookModel.search(0, queryWord).then(res => {
        console.log(res)
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          // 下面一行代码 等同于 queryWord: queryWord
          queryWord
        })
        this._hideLoadingCenter()
        // 当从服务器拿到searchWord关键词的搜索结果后，再把searchWord添加到 历史搜索缓存中。不然的话 历史搜索缓存中 可能存放无效的searchWord
        if (res) {
          keywordModel.appendHistory(queryWord)
        }
      })
    },

    // onConfirm(event) {
    //   this.setData({
    //     searching: true
    //   })
    //   const queryWord = event.detail.value || event.detail.text
    //   queryWord && bookModel.search(0, queryWord).then(res => {
    //     console.log(res)
    //     this.setData({
    //       dataArray: res.books,
    //       // 下面一行代码 等同于 queryWord: queryWord
    //       queryWord
    //     })
    //     // 当从服务器拿到searchWord关键词的搜索结果后，再把searchWord添加到 历史搜索缓存中。不然的话 历史搜索缓存中 可能存放无效的searchWord
    //     if (res) {
    //       keywordModel.appendHistory(queryWord)
    //     }
    //   })
    // },

    onCancel() {
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },
    
    cancelSearch() {
      this.initialize()
      this._closeResult()
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult(){
      this.setData({
        searching: false,
        queryWord: ""
      })
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },
  },

  
})