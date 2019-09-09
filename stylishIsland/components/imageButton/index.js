// components/imageButton/index.js
Component({
  options:{
    multipleSlots: true
  },

  /**
   * Component properties
   */
  properties: {
    openType: {
      type: String,
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
    // 在对button按钮绑定bind:getuserinfo="onGetUserInfo"事件后，当用户首次点击按钮时，会弹出授权窗口(让用户授权), 之后会调用一次onGetUserInfo。
    // 在用户已授权的情况下，用户点击授权按钮，会默认调用一次onGetUserInfo。
    onGetUserInfo(event){
      console.log(event)
      this.triggerEvent('getuserinfo', event.detail, {})
    }, 
  }
})
