import {
  HTTP
} from '../utils/http-p.js'

// 与业务逻辑有关的代码写到model文件中，page页面主要负责数据的绑定
class BookModel extends HTTP {
  search(start, q){
    return this.request({
      url: 'book/search?summary=1',
      data: {
        start: start,
        q: q
      }
    })
  }

  getHotList(){
    return this.request({
      url: 'book/hot_list'
    })
  }

  getMyBookCount(){
    return this.request({
      url: 'book/favor/count'
    })
  }

  getDetail(bid){
    return this.request({
      url: `book/${bid}/detail`
    })
  }

  getLikeStatus(bid){
    return this.request({
      url: `book/${bid}/favor`
    })
  }

  getComments(bid){
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }

  postComment(bid, comment){
    return this.request({
      url: 'book/add/short_comment',
      method: 'POST',
      data:{
        book_id: bid,
        content: comment
      }
    })
  }
}

export {BookModel}