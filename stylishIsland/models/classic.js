import {HTTP} from '../utils/http.js'

// 定义了 类ClassicModel(继承了HTTP)
class ClassicModel extends HTTP{
  // 实例方法getLatest
  // 之前调用HTTP下的request方法时，先实例化了一个HTTP对象 再用实例对象(http)调用http.request方法
  // 由于ClassicModel继承了HTTP 所以ClassicModel就拥有了HTTP的request方法。可以直接使用this.request调用request
  getLatest(sCallback){
    // 由于在getLatest中 无法得知最新一期的期刊的期刊号，所以无法从缓存中加载 最新期刊的数据。
    // 当从服务器加载到最新期刊的数据时，只需要写入缓存即可。
    this.request({
      url: 'classic/latest',
      success: (res)=>{
        // 把获取到的最新期刊的res.index 写入Storage缓存
        this._setLatestIndex(res.index)
        // 小程序的缓存(Storage)
        // 把最新期刊的数据(res) 写入缓存Storage
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
        
        sCallback(res)
      }
    })
  }
     
  // 缓存的作用：减少服务器请求的次数，缓解服务器的压力。减少了 获取数据花费的时间 提升了用户体验。
  // 加入缓存机制，把请求到的数据 写入缓存。
  // 当尝试从服务器加载数据时，先到缓存中 查询是否有相关数据。
  // 如果缓存中 存在相关数据，就把缓存中的数据取出来。如果缓存中 没有相关数据，就从服务器加载相应数据 并把数据写入缓存。
  // 缓存中 期刊的key：'classic-' + index
  getClassic(index, nextOrPrevious, sCallback){
    // 根据当前期刊的index 确定请求期刊的index。再由请求期刊的index 确定期刊的key
    let key = nextOrPrevious=='next' ? this._getKey(index+1) : this._getKey(index-1)
    let classicData = wx.getStorageSync(key)
    // 缓存中 没有相应数据，从服务器加载
    if (!classicData){
      this.request({
        // 模板字符串`${a}456`, 其中a既可以是变量 又可以是函数
        // url: 'classic/' + index + '/' + nextOrPrevious,
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          // 把从服务器加载的期刊数据res 写入 res.index对应的缓存
          wx.setStorageSync(this._getKey(res.index), res)
          // 设置classic页面的 相关数据
          sCallback(res)
        }
      })
    }
    else{
      sCallback(classicData)
    }
    // 如果不把sCallback(classicData)写在else的花括号里，直接跟在if语句的后面(此时classicData可能为null，对page/classic页面设置空数据 可能会有异常)。
    // 报错：Failed to load local image resource /components/classic/movie/ 
    // the server responded with a status of 500(HTTP / 1.1 500 Internal Server Error) 
  }

  isFirst(index){
    // 最早一期的期刊的index 是固定的 1。所以只要判断 当前期刊的index是否为1，就能确定当前期刊 是否为first
    return index == 1 ? true : false
  }

  isLatest(index){
    // 把onLoad中获取到的res 称作latestClassicData(其中的index是latestIndex)
    // 每当触发onPrevious时 获取到的res 称作currentClassicData(其中的index是currentIndex)
    // 比较latestIndex和currentIndex的值 是否相等，就能得知 当前的期刊 是否为latest
    let latestIndex = this._getLatestIndex()
    return index == latestIndex ? true : false
  }

  getMyFavor(success){
    const params = {
      url: 'classic/favor',
      success: success
    }
    this.request(params)
  }

  // 使用缓存Storage可能会引起奇怪的现象发生，这是由缓存的机制 导致的。
  // 此时 可以清除缓存(清除数据缓存) 来排除缓存的干扰。
  
  _setLatestIndex(index){
    // 只缓存latestIndex，不缓存latest期刊的全部数据。因为只需要 latestIndex。
    // wx.setStorageSync(key, data)。data：要缓存的数据，key：缓存数据的名字。
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex(){
    let index = wx.getStorageSync('latest')
    return index
  }

  _getKey(index){
    let key = 'classic-' + index
    return key
  }


}

export {ClassicModel}