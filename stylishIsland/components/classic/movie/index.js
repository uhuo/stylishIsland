// components/classic/movie/index.js

import {classicBeh} from '../classic-beh.js'

Component({
  behaviors: [classicBeh],
  /**
   * Component properties
   */
  properties: {
    hidden: Boolean
  },

  /**
   * Component initial data
   */
  data: {
    tagPic: 'images/movie@tag.png'
  },

  /**
   * Component methods
   */
  methods: {

  }
})
