// components/preview/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    classic: {
      type: Object,
      observer: function(newVal){
        if (newVal){
          var typeText = {
            100: '电影',
            200: '音乐',
            300: '句子',
          }[newVal.type]
        }
        this.setData({
          typeText: typeText
        })
      }
    }
  },

  /**
   * Component initial data
   */
  data: {
    typeText: ''
  },

  /**
   * Component methods
   */
  methods: {
    onTap: function(){
      this.triggerEvent('tapping', {
        cid: this.properties.classic.id,
        type: this.properties.classic.type
      }, {})
    }
  }
})
