// 对import的变量改名，使用 nameA as nameB. 同时要注意 路径名要加’单引号‘
// import {config as config1, fun1} from '/config.js'
import {
  config
} from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效，请前往github，查找旧岛项目的源代码 来查看',
  3000: '期刊不存在'
}

class HTTP {
  // request中 参数params是个js对象，参数的意义不够明确(不能直接通过参数名称 了解到 需要传递什么参数)
  request({url, method='GET', data={}}){
    return new Promise((resolve, reject)=>{
      this._request(url, resolve, reject, method, data)
    })
  }

  // _request是 类HTTP的实例方法，需要实例化HTTP才能调用request
  // 必填参数resolve,reject 必须在 默认参数之前
  _request(url, resolve, reject, method='GET', data={}) {
    wx.request({
      url: config.api_base_url + url,
      data: data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      method: method,
      dataType: 'json',
      // responseType: 'text',
      success: (res) => {
        // res接收 wx.request返回的结果。startsWith, endsWith
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          // reject(不需要传参数)，因为错误处理 是在http请求内部 进行的，调用reject()只是告诉promise 更改状态
          reject()
          // 服务器异常，状态码 是以(除了2，5的)数字 开头
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        reject()
        // api(request)调用失败，状态码以5开头
        // 因为api调用失败的情况 是很少出现的，所以固定error_code=1
        this._show_error(1)
      },
      complete: function(res) {},
    })
  }

  // 人为约定：在方法名 前面，加上下划线。以表明 该方法是 私有方法。
  _show_error(error_code) {
    // 如果error_code不存在 或者 为空的话 
    if (!error_code) {
      error_code = 1
    }
    const tip = tios[error_code]
    wx.showToast({
      title: tip?tip:tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}

export {
  HTTP
}