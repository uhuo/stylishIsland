// 对import的变量改名，使用 nameA as nameB. 同时要注意 路径名要加’单引号‘
// import {config as config1, fun1} from '/config.js'
import {config} from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效，请前往github，查找旧岛项目的源代码 来查看',
  3000: '期刊不存在'
}

class HTTP{
  // request是 类HTTP的实例方法，需要实例化HTTP才能调用request
  request(params){
    // params: url, data, method
    if (!params.method){
      params.method = "GET"
    }
    wx.request({
      url: config.api_base_url + params.url,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      method: params.method,
      dataType: 'json',
      // responseType: 'text',
      success: (res) => {
        // res接收 wx.request返回的结果。startsWith, endsWith
        let code = res.statusCode.toString()
        if (code.startsWith('2')){
          // 状态码以2开头
          // if (params.success){
          //   params.success(res.data)
          // }
          // 先判断params.success是否为null，为null时 不执行params.success(res.data)。
          params.success && params.success(res.data)
        }
        else{
          // 服务器异常，状态码 是以(除了2，5的)数字 开头
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        // api(request)调用失败，状态码以5开头
        // 因为api调用失败的情况 是很少出现的，所以固定error_code=1
        this._show_error(1)
      },
      complete: function(res) {},
    })
  }

  // 人为约定：在方法名 前面，加上下划线。以表明 该方法是 私有方法。
  _show_error(error_code){
    // 如果error_code不存在 或者 为空的话 
    if (!error_code) {
      error_code = 1
    }
    const tip = tios[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}

export {HTTP}