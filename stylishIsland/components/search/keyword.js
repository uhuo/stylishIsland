// components/search/keyword.js
import {
  HTTP
} from '../../utils/http-p.js'

// search组件用到的model(keyword.js)文件 到底放哪儿？
// 1. 放在 使用该model的search组件 所在的文件夹下：该model(keyword.js)只会被search组件使用
// 2. 放在/components/models文件夹下：该model(keyword.js) 可以被components下 所有的组件使用
// 3. 放在/models文件夹下：该model(keyword.js) 可以被整个项目使用
// 如果就单一的一个项目来说，把model(keyword.js)文件 统一放在根目录下的/models文件夹 
// 如果想把components中的组件都发布出去 供他人使用，可以把components用到的业务模型 都放在/components/models下

class KeywordModel extends HTTP {
  // 存储 搜索词的key
  searchKey = 'q'
  storageLength = 10

  // 获取历史搜索关键字
  getHistory() {
    const words = wx.getStorageSync(this.searchKey)
    // 当缓存中没有存储 searchKey对应的数据时，wx.getStorageSync(this.searchKey) 返回null。此时要对返回null的情况 进行处理(返回[]空数组)
    if (!words) {
      return []
    }
    return words
  }

  // 添加历史搜索关键字
  appendHistory(keyword) {
    // 获取历史搜索关键字数组
    let words = this.getHistory()
    // 判断数组 是否含有 keyword。当words数组中 没有keyword时，把keyword加入到words数组中
    const has = words.includes(keyword)
    if (!has) {
      // 如果数组长度超过storageLength，删除words数组 末尾的一个关键字
      if (words.length >= this.storageLength) {
        words.pop()
      }
      // 把keyword插入到words数组的开头
      words.unshift(keyword)
      // 设置缓存
      wx.setStorageSync(this.searchKey, words)
    }
  }

  // 获取热门搜索关键字
  getHotKeyword() {
    return this.request({
      url: 'book/hot_keyword'
    })
  }
}

export {
  KeywordModel
}