const config={
  api_base_url: 'http://bl.7yue.pro/v1/',
  appkey: "AbhC31IG7ruCDp57"
}

// es6中 引入了module的概念(比如config.js就可以看做是一个module)
// 在module内定义的变量，对于其他module来说 是不可见的
// 要想可以被其他的module访问：1. 在该module内export变量 2. 在其他module中 import{该变量} from 'dir'

// export const config={}
// export let fun1 = function(){
// }

// export {config as config1, fun1}
export {config}