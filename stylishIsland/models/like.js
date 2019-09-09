import {HTTP} from '../utils/http.js'

class LikeModel extends HTTP{
  like(behavior, artID, category){    
    let url = behavior=='like'?'like':'like/cancel'
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: artID,
        type: category          
      }
      // 这里没有指定 success回调函数，like函数里 也没有接收 回调函数。是因为 不需要 在pages/classic/classic.js的onLike函数中 接收 回调函数的结果。
    })
  }

  getClassicLikeStatus(artID, category, sCallback){
    this.request({
      // url: 'classic/' + category + '/' + artID + '/favor',
      url: `classic/${category}/${artID}/favor`,
      success: sCallback
    })
  }
}

export {LikeModel}