// components/book/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    book:Object,
    showLike: {
      type: Boolean,
      value: true
    }
  },

  /**
   * Component initial data
   */
  data: {
    
  },

  /**
   * Component methods
   */
  methods: {
    // onTap:function(){}
    onTap(){
      const bid = this.properties.book.id
      // 在组件内部 写死跳转逻辑，降低了组件的通用性。但 把具体的业务写在组件中 确实是 很方便。
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bid=${bid}`,
      })
    }
  }
})
