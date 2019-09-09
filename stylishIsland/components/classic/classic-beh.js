// 小程序中 对于组件代码的复用，通过behavior来实现。（组件提供的 继承机制behavior）
// behavior：给多个组件 定义 共同的行为。

// 单一的项目中，业务有限。出现重复的(properties/data/methods/生命周期函数)情况比较少
// 如果放眼到 多个项目中/构建自己的组件库时，此时behavior就显得更有意义。
// 一旦抽象出 组件共有的特性，把这些共有特性 写入behavior中。不仅可以在当前项目中使用，还可以放到别的项目中使用。

// Behavior的组织结构 和 Component的组织机构 基本一致. Behavior是个 构造器，会构造一个behavior
const classicBeh = Behavior({
  properties:{
    img: String,
    content: String,
    hidden: Boolean
  },
  attached: function(){

  },
  data: {

  },
  methods: {

  }
})

// 导出classicBeh行为，供其他组件 继承使用
export {classicBeh}