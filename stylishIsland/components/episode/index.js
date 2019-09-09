// components/episode/index.js
Component({
  /**
   * Component properties
   * component properties 和 component data 其实指向的是 同一个JavaScript对象
   * Notice：properties和data中的key 不要有 同名，否则 properties中的变量 会覆盖 data中的同名变量
   */
  properties: {
    // 小程序会对properties中的 数值类型 做特殊处理(设置一个默认值)
    // 小程序不会对data中的 数值类型 做处理
    index: {
      type: String,
      // 通过observer，就可以拿到 classic页面 传过来的index值(而不是默认的初始值)
      // 当index的值 发生改变时，小程序会主动调用observer。而observer中 又this.setData更新index， 此时又会触发observer的调用
      // 为什么index的type为Number时 不会出现无限递归调用？
      // type为Number时 0 -> 8 | 8 -> '08', (小程序会自动转换'08' -> 8)。oldVal: 8, newVal: 8。所以不会触发值更行，就不会递归了
      // type为String时 0 -> 8 | 8 -> '08', '08' -> '08'。oldVal: 8, newVal: '08'
      // 因此，不要在properties的observer中 去尝试更改 properties自身的值
      observer: function(newVal, oldVal, changedPath){
        let val = newVal<10?'0'+newVal:newVal
        this.setData({
          // 由于index的type是Number，所以小程序在把(字符串'08')赋值给index时 会把(字符串'08')转成Number 再复制给index
          // 那么可以把index的type 设置为 String
          // index: val
          _index: val
        })
      }
    }
  },

  /**
   * Component initial data
   */
  data: {
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    // 要对data下的 key-value中的value 做初始化时，不能直接使用Number String的(否则 value会是 JavaScript的Number/String类 对应的function函数)。而对于properties 由于小程序会做默认处理，properties可以使用Number来设置初始值
    // Numer类型的数据 要手动赋值为0，String类型的
    year: 0,
    month: '',
    _index: ''
  },

  // 组件的生命周期函数(attached)
  // 在该组件被attached到页面上时，不能肯定 index的数值 会覆盖默认值，更好的方法是 在properties的key-value的value中 设置observer
  attached: function(){
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()

    this.setData({
      year: year,
      month: this.data.months[month]
    })
  },

  /**
   * Component methods
   */
  methods: {

  }
})
