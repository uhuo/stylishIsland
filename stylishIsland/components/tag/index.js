// components/tag/index.js
Component({
  //插槽使用：1.在组件中 挖一个插槽slot(使用name属性 指定插槽名字)。<slot name="slotName"></slot>
  // 2.用到组件的页面中，在组件的两个标签之间 传入需要安装到插槽中的标签(在标签内 使用slot="slotName"指定 (包裹在组件之间的)标签插入哪个插槽)。
  // <v-tag >
  //   <text slot="slotName"></text>
  // </v-tag>
  // 3.在开启插槽的组件的js中，启用插槽。options: {multipleSlots: true},
  // notice: 从页面 传入到组件slots中的 标签，是携带 (在页面中已经设置好的)样式的。
  options: {
    multipleSlots: true
  },

  // 外部样式类可以有多个，多个样式类之间 用逗号分隔。
  externalClasses:['tag-class'],

  /**
   * Component properties
   */
  properties: {
    text: String,
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
    onTap(event){
      // triggerEvent。第一个参数：指定事件的名字。第二个参数：传递给event的参数(key: text, value: this.properties.text), 被放置在event.detail中。第三个参数不常用
      this.triggerEvent('tapping',{
        text: this.properties.text
      }, {})
    }
  }
})
