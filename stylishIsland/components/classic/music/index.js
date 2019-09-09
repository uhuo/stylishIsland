// components/classic/music/index.js

import {
  classicBeh
} from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()

Component({
  behaviors: [classicBeh],

  /**
   * Component properties
   */
  properties: {
    musicSrc: String
  },

  /**
   * Component initial data
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@waitting.png',
    playSrc: 'images/player@playing.png'
  },

  // 尽量不要在生命周期函数中写具体的业务逻辑，业务逻辑最好是 放到具体的函数中 
  attached: function() {
    // 在不使用跳转页面 进行业务逻辑处理的情况下，wx:if 和 hidden的使用频率还是较高的。有必要了解wx:if(会销毁/渲染组件 而触发生命周期函数)和hidden(只是显示/隐藏页面)
    // this.methods._recoverStatus()这么写是会报错的
    this._recoverStatus()

    this._monitorSwitch()
  },

  // detached生命周期函数不被触发的原因：在classic.wxml中 隐藏组件的时候采用的是hidden，而hidden是不会触发detached函数的执行的
  detached: function() {
    // mMgr.stop()
  },
  
  /**
   * Component methods
   */
  methods: {
    onPlay: function() {
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.title = this.properties.musicSrc
        mMgr.src = this.properties.musicSrc
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },

    _recoverStatus: function() {
      // 根据mMgr.paused状态，更改playing状态
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        // 这里不return的话，可能会 触发之后的if判断, 进而扰乱了 播放按钮的图片显示
        return
      }
      // 比对 mMgr.src 与 music组件的musicSrc，更改playing状态
      if (mMgr.src == this.properties.musicSrc) {
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch: function() {
      // 音乐播放图片(pauseSrc/playSrc)的状态 和 音乐面板中操控的状态 不一致。
      // 使用音乐面板操控音乐的播放/暂停，是会产生相应的事件的。在代码中监听事件 进行播放图片的更换
      // onPlay/onPause/onStop/onEnded, 监听背景音频(播放/暂停/停止/终止)事件
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})