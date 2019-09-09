const paginationBeh = Behavior({
  data: {
    dataArray: [],
    total: null,
    noneResult: false,
    loading: false,
  },

  methods: {
    setMoreData(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },

    // 加载服务器上的数据 要从哪儿开始 
    getCursorIndex() {
      return this.data.dataArray.length
    },

    setTotal(total) {
      this.data.total = total
      if (!total) {
        this.setData({
          noneResult: true
        })
      }
    },

    // 是否还有数据 要加载
    hasMore() {
      // 实现方法：1. 比较dataArray.length 与 返回res中记录的total。 dataArray.length >= res.total时，不再从服务器加载数据(优点：这种方法肯定是正确的。缺点：要依赖服务器端的实现)
      // 2. 根据服务器请求返回的dataArray(res.books) 是否为空数组，来判断是否还需要 从服务器加载数据(缺点：不严谨，当服务器异常时 可能返回空数组。此时 可能还可以从服务器加载 却出现了误判的情况。优点：不依赖服务器端的实现)
      if (this.data.dataArray.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },

    initialize() {
      // wxml页面上 用到的数据，必须使用setData设置。因为setData使小程序 在wxml页面上重新渲染相关数据
      this.setData({
        dataArray: [],
        noneResult: false,
        loading: false,
      })
      // wxml页面上 没有使用到的数据，可以直接赋值操作
      this.data.total = null
    },

    isLocked() {
      return this.data.loading ? true : false
    },

    locked() {
      this.setData({
        loading: true
      })
    },

    unLocked() {
      this.setData({
        loading: false
      })
    },

  }
})

export {
  paginationBeh
}