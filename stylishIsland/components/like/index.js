// components/like/index.js

// 封装性
// 一些常用的属性/数据/方法 是要封装在组件的内部的。这样 在使用组件的时候 才更方便，不需要写 重复的代码。

// 开放性
// 但是不可能把所有的 属性/数据/方法 都封装在组件内，组件还需要一定的开放行

// 因此，需要决定 哪些数据 被封装在组件内，哪些数据 是该暴露给外面的。

// 组件的粒度：对组件的功能 进行划分，决定哪些功能 该封装在组件内部，哪些功能不应该 封装在组件内部。

// 需要开发出来的数据(也就是 从组件的外部获取数据，而组件需要用到的 这些外部数据)，可以写在properties中

Component({
  /**
   * Component properties
   */
  // 组件的属性(properties), 可以在外部 进行访问。也就是 可以在外部 设置like和count的值，来达到 数据的传递。
  // 但 组件的data 是私有的，在外部 是不能设置的
  properties: {
    like: {
      // type(属性like的类型)，取值(Number, String, Object, Boolean, Array, null)。必填
      type: Boolean,
      // value(属性like的初始默认值)
      value: false,
      // 选填
      // observer: function(){
      // }
    },
    count: {
      type: Number,
      value: 0
    },
    readOnly:{
      type: Boolean
    }
  },

  /**
   * Component initial data
   */
  // 对于组件内部 使用到的数据，定义在data下面
  data: {
    // 数据绑定
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png',
  },

  /**
   * Component methods，组件只负责完成 自己的(通用的)业务逻辑。这样 组件才能更通用
   * 特定的业务逻辑 要写在 组件的'使用方'
   * 比如like组件 只负责完成 自身的+1/-1, 以及心形图片的切换。
   */
  methods: {
    onLike: function(event){
      if(this.properties.readOnly){
        return
      }
      let like = this.properties.like;
      let count = this.properties.count;

      count = like?count-1:count+1;
      // setData对属性值进行更新
      // setData接收的参数 是JavaScript对象, 在js对象中指明 要更新的properties
      this.setData({
        count: count,
        like: !like
      });
      // 发起一个自定义事件，也叫 激活一个事件. 激活事件的函数this.triggerEvent("",{},{})
      // "自定义事件的 名称", {把自定义的属性(behavior) 设置给event的detail}, {第三个参数是不需要使用的}
      // 默认情况下，自定义事件 不是冒泡事件。非冒泡事件：当一个组件上的事件被触发后，该事件不会向父节点传递。
      let behavior = this.properties.like?'like':'cancel'
      this.triggerEvent('like',{
        behavior: behavior,
      }, {})
    }
  }
})
