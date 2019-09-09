# stylishIsland
demo of miniProgram using components


```
项目结构
common 常用方法
	filter.wxs 可在wxml中使用的方法,通常用作过滤器
	http_promise.js 把wx.request包装成promise对象
	http.js 把wx.request包装回调的方式
	utils.js 公用的工具方法
	comScript 定义常量
components 组件
	like 点赞组件,心形图案和数量
	classic  只在流行页面下使用的组件
		movie 期刊为电影
		music 期刊为音乐
		eaasy 期刊为句子
		common.wxss 这几个公共的css
		component_behavior.js 组件公共的data,methods等，组件中继承
	time  期刊左上角的时间部分组件
	nav  切换期刊的组件
	book 书籍组件，一本书的大致信息
	search 搜索书籍及结果显示的组件（减少页面跳转，在一页控制显示隐藏）
	loading 加载中组件，用在书籍上拉加载更多和搜索时
	tag 显示标签组件，用在短评等
	mask 遮罩组件，用在写短评时背景遮罩
	image-button 图片表示原始button
	preview 喜欢页喜欢的期刊显示组件
	behaviors 提取可复用的behavior，属性方法逻辑在组件中继承
pages
	classic 流行页面，显示期刊信息
	book 书籍页面，精选书籍加载更多
	book-detail 点击进入这本书的详细信息页
	my  喜欢页面
	about 喜欢页面中的关于我们
images  图片资源
models  业务逻辑方法
	classic  期刊相关的逻辑,如期刊相关的http请求，是否是最新一刊等
 	like  点赞相关逻辑
	book  数据相关逻辑
	search 搜苏相关逻辑,如添加历史记录到缓存，查询记录
app.js
app.json
app.wxss


微信小程序
1基本结构。小程序包含一个描述整体程序的 app 和多个描述各自页面的 page
 pages
	index页面
		index.wxml index.wxss index.js index.json
	log页面
		log.wxml log.wxss log.js log.json
app.json(必须) 
app.js（必须）
app.wxss（可选）

2全局配置
pages里的所有页面路径必须写在app.json中的pages里，通过微信开发者工具创建page会自动生成对应的同名不同后缀的4个文件,
创建的page路径会自动写入app.json的pages中，如果使用第三方开发工具创建page，需要手动在app.json添加路径。
app.json中window配置关于background部分指的是内容区域下拉，内容区与标题栏之间的部分。
要在调试器中下拉设置window下的enablePullDownRefresh：true
tabBar控制生成底部的导航栏

3组件化
把多次使用的部分作为组件，在页面page中引入使用。新建目录在开发者工具选择创建component,生成4个文件。组件的目录结构与普通page一致。
（1）在使用的页面json中引入，在页面的json中使用usingComponents配置项
"usingComponents":{"cmp-like":"/components/like/index"} "自定义组件名"："组件路径"
注：若使用相对路径，是相对于页面的json所在目录。使用绝对路径，以/开头，表示根目录下的
（2）在页面的wxml中使用组件,<cmp-like count="{{xxx}}"/>自定义的组件名，传入属性

组件js文件结构
properties
组件的对外属性，是属性名到属性设置的映射表，属性设置中可包含三个字段， type 表示属性类型、 value 表示属性初始值、 observer 表示属性值被更改时的响应函数
data
组件内部使用的数据
methods
组件绑定的事件

4基础
image标签有默认宽高，使用时要重新设置
使用{{}}的语法在wxml中渲染data数据，更改data要通过this.setData({key:value})
key时data中的数据key.
css单位rpx 是微信小程序解决自适应屏幕尺寸的尺寸单位。规定屏幕的宽度为750rpx
事件绑定在标签上bind:tap="handleTap",也可省略：写成bindTap。事件绑定有两种，一个bind会冒泡,一个catch会阻止冒泡。事件传参,标签上绑定事件外，添加data-xxx的属性，事件里event.currentTarget.dataset中有xxx
在app.wxss中page{}的css是全局样式,可以继承的只有color和font相关样式
数据请求在onLoad,使用wx.request({})。在页面请求数据setData到data在页面使用。开发阶段需要在开发工具的设置取消合法域名校验。
wx:if="{{xx}}"若表达式为true显示内容，否则隐藏。可以在下一个标签使用wx:else。
列表循环渲染 wx:for="{{xxx}}" 使用每一项{{item}},索引{{index}}。若想改变item名称在wx:for后加上wx:for-item="{{name}}"。 还要有wx:key,若循环的item是对象，用不重复的并且值为数字或字符串的属性，如wx:key="id"(不用{{}}),若循环的item是数字或字符串，wx:key = "*this".      一般wx:for使用block包裹
<block wx:for="{{[1, 2, 3]}}">>
  <view> {{item}} </view>
</block>
跳转页面传值,wx.navigate({url:"页面路径?name=123"})通过?传递参数，在跳转到的页面onLoad中的options参数有传递的参数，options.name获取
工具的默认编译会打开首页，若想编译后直接到其他页面，选择添加编译模式，输入要打开的页面，可传递参数name=xxx


5自定义事件(子组件通信)
若在组件中点击触发组件事件的时候，需要在引用的页面在触发某些操作，需要自定义事件。首先在页面使用组件<cmp-movie bind:like="onLike">(注意这里使用方法不加{{}})绑定一个自定义的like事件，触发时执行页面的onLike方法。 然后在组件中this.triggerEvent("like",{data:"xxx"},{}) 触发页面的like自定义事件（相当于VUE在子组件emit向父组件传递信息）

6组件生命周期
组件同page一样也有生命周期，created（不能进行setData操作），attach,ready等

7组件observer
当外部传给组件属性值需要改变处理时,组件properties中属性的observer函数监听属性变化,(new,old,path)。注意不能再observer重新setdata自身，可以在data重定义一个data属性,setData这个新的data

8组件之间的继承behaviors
若多个组件中有相同的属性方法，新建js文件, Behavior({
  properties: {  },
  data: {  },
  attached: function(){}
}) 在组件中引入文件，使用behaviors: [xxx],就会继承之前定义的properties等。
同名的属性或方法子组件会覆盖之前定义的，继承多个若重复以后面的为准，生命周期不会覆盖，都会执行

9promise
function fn(){ return new Promise((resolve,reject)=>{
	success:res=>resolve(res),fail:err=>reject(err)
})}
多重调用
fn(1).then(res1=>console.log(res1); return fn(2)).then(res2=>console.log(res2); return fn(3)).then(res3=>console.log(res3))
Promise.all([request1,request2,request3]).then(res=>{})多个并行的请求都完成时Promise.all返回一个promise对象,res是array是1,2,3的返回结果

10组件插槽slot
向组件插入内容动态组件。在组件中添加<slot name="xx"></slot>,组件的js文件中添加options:{multipleSlots: true}开启插槽。在页面中使用，<cmp><text name="xxx">123<text></cmp>在组件中插入内容,name与组件定义的name一致。插槽可添加多个，以不同的name区分

11外部样式
在页面中更改组件样式，直接选择器选择自定义的组件css无效，需要选择到组件内部具体标签，如cmp > view{}
还可通过在页面定义一个class样式，将class传入组件。在组件js文件中添加externalClasses: ['my-class'],在组件的wxml中使用定义的class,如<view class="my-class"></view>。页面中wxss文件定义一个class样式,如.container{}，传入组件<cmp my-class="container"></cmp>。组件传递的属性名与组件中定义的要一致My-class。
当组件中有多个class，优先级都是不确定的，若想传入的覆盖在css使用!important

12WXS
若想在wxml中使用函数方法，使用wxs。可以在wxml文件中写也可以新建xx.wxs文件。wxs和js es5的语法很像，但两者没有任何关系。在wxs中可以写函数方法，用module.exports={}导出。在wxml中使用<wxs src="../xx" module="aaa" />引入wxs文件，module给引入的wxs定义名称，{{aaa.fn()}}。可以用来实现过滤器
wxml内写wxs<wxs module="xxx"> ... module.exports={}</wxs>

13本地存储
wx.setStorageSync(key,value)同步存储数据,value可为object/array
wx.getStorageSync(key) 同步获取本地存储数据
不带Sync为异步操作

14
监听页面底部上拉刷新，onReachBottom只能在页面使用不能在组件中监听。setDate更改数据同时会刷新页面显示，若直接赋值，数据会改变页面不会更新

15授权
如果只需展示用户的头像昵称在wxml使用                                  <open-data type="userAvatarUrl/userNickName"/>
要弹出用户授权窗口使用button                                               <button data-type="getUserInfo" bindgetuserinfo="getUserInfo"></button>当用户授权后可以从bindgetuserinfo回调e.detail.userInfo中获取到用户信息                                               
wx.getSetting获取用户是否已授权,当用户授权后wx.getUserInfo可获取到用户信息。
分享需要把button的data-type变为share

16
原生组件hidden属性可控制显示隐藏，只是改变display:none。若在自定义组件中使用传递属性在组件内部使用hidden。
wx:if会销毁组件，会触发attached和detached生命周期函数。
17
引入非当前的wxss文件,@import '../xx.wxss'
音频背景音乐API,wx.getBackgroundAudioManager()
