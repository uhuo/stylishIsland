// components/navi/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    title: String,
    // first latest：指定 当前期刊 是否第一期 是否最后一期
    first: Boolean,
    latest: Boolean
  },

  /**
   * Component initial data
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    leftSrc: 'images/triangle@left.png',
    rightSrc: 'images/triangle@right.png'
  },

  /**
   * Component methods
   */
  methods: {
    // onLeft, onRight都是事件监听函数
    // 只要是事件监听函数 都可以接收event参数
    onLeft: function(event){
      // navi左右按钮 切换期刊的行为：在当前期刊是最新一期时 应该禁用掉左按钮。在当前期刊是第一期时 应该禁用掉右按钮
      // 那么在哪里处理按钮的禁用行为？
      // 1）navi组件 依然产生left/right事件，在page页面中 根据latest/first的值 相应地忽略left/right事件
      // 2）在navi组件内部，根据latest/first 决定 是否触发left/right事件。显然 组件自身来处理 是否触发left/right事件 会较合理些。
      // 激活 自定义left事件
      !this.properties.latest && this.triggerEvent('left', {}, {})
    },

    onRight: function(event){
      // 激活 自定义right事件
      !this.properties.first && this.triggerEvent('right', {}, {})
    }
  }
})
