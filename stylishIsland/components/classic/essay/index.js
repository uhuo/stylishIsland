// components/classic/essay/index.js

import {classicBeh} from '../classic-beh.js'

Component({
  // 显示指定 essay组件 继承的 behaviors
  // behaviors中 靠右侧的behavior(中的同名变量) 会覆盖 靠左侧的behavior(中的同名变量)
  // 组件中的同名变量 会覆盖 behavior中的同名变量
  // 生命周期函数(是不会进行覆盖的) 会依次调用各个behavior和component中的生命周期函数
  behaviors: [classicBeh,],

  /**
   * Component properties
   */
  properties: {
    
  },

  /**
   * Component initial data
   */
  data: {
    tagPic: 'images/essay@tag.png'
  },

  /**
   * Component methods
   */
  methods: {

  }
})
