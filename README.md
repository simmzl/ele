# ele

> Vue.js 仿[饿了么Web App](https://h5.ele.me)

## 技术栈

- vue
- vuex
- vue-router
- vue-resource
- axios
- webpack
- eslint
- better-scroll
- stylus
- postCss

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Tips & 坑：

### router-view
vue1.0升至2.0+后，v-link改为`<router-view></router-view>`,入口js文件的设置也跟随变化，需要按照官网配置[router.vuejs.org](https://router.vuejs.org/zh-cn/essentials/getting-started.html),
不仅把这些.vue .js文件的配置改了，还需要在package.json中的dependencies内，把vue和vue-router的版本也改为最新；
### 移动端像素
在手机等移动端物理像素有别于逻辑像素，具体的比例根据不同设备的设备像素比不同而不同；

一个在开发过程中使用手机浏览页面的方法：
- 使用`ipconfig`查看自己PC局域网IP；
- 将浏览器url中的localhost改为局域网IP；
- 复制链接至[草料网](https://cli.im/)生成二维码；
- 使用同在一个局域网的手机扫码访问即可！

实现移动端一像素边框的方法：[利用min-device-pixel-ratio媒体功能实现真正的1像素](http://blog.csdn.net/zzxboy1/article/details/56016475)

### vue-resource
使用vue-resource时注意`this.$http.get(url).then((res) => {})`中回调函数then()中获取到的json内容在res.body,data中。
在使用ajax的get方法获取数据来填充app.vue内seller等对象之前，seller等对象还是空对象，所以在用seller内的数据渲染时，需要加v-if判断seller等对象是否有值，
否则会报错。

### sticky footers
sticky footers，即**粘性页脚布局**，在遇到下面两个布局的时候需要用到：
- 在内容未撑满页面时，footer固定在底部 
- 在内容超出页面高度时，footer随着页面的变大而往下移动，也保持在页面底部。

#### 一种兼容性最佳的解决方案（负margin布局）
##### 思路:
 一般情况下，一个网页分为header、content、footer；
 - 将头部和内容装入一个容器wrapper-main，再将wrapper-main封装到wrapper中；
 - 将wrapper的min-height设为100%，wrapper-main的padding-bottom设为footer的高度;
 - 将footer的margin-top设为负的自身的高度;
 
 这样就达到了当wrapper的高度为100%时，footer固定在视口的底部，当其高度大于100%时，footer则一直在wrapper后面的效果；
```html
<div class="wrapper clearfix">
  <div class="wrapper-main">
    <header>头部</header>
    <div class="content">页面内容</div>  
</div>
</div>
<footer>页脚</footer>
```
```css
.wrapper{
  min-height: 100%;
}
.wrapper-main{
  padding-bottom: 50px;
}
footer{
  position: relative;
  height: 50px;
  margin-top: -50px;
  clear: both;
}
.clearfix:after {
  display: block;
  content: '';
  clear: both;
  height: 0;
  visibility: hidden
}
```
#### 第二种：flex布局
##### 思路
讲header和content包装在一个wrapper-main内，再将footer和wrapper-main包装在display为flex的一个wrapper内。
```html
<div class="wrapper">
  <div class="wrapper-main">
    <header>头部</header>
    <div class="content">页面内容</div>
  </div>
  <footer>页脚</footer>
</div>
```
```css
.wrapper{
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
.wrapper-main{
  flex: 1;
}
footer{
  flex: 0;
}
```
### vue过渡效果
vue2+已经将过渡效果升级为`transition` 的封装组件，具体使用：
```html
<transition name="fade">
  <p>hello</p>
</transition>
```
```css
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
```
[官方文档](https://cn.vuejs.org/v2/guide/transitions.html)

### 好的编程习惯
写css时尽量用class名而非标签名，在渲染性能上，class优于标签，尤其在层级嵌套较深时。

### Vue 获取 DOM 对象的接口—— vm.$refs
在vue 1.0中使用`v-el`定义element,2.0 升级为 `ref`

### vm.$nextTick( [callback] )
`vm.$nextTick( [callback] )`在修改数据之后立即使用这个方法，获取更新后的 DOM。
 ```javascript
new Vue({
  methods: {
    example: function () {
      // 修改数据
      this.message = 'changed'
      // DOM 还没有更新
      this.$nextTick(function () {
        // DOM 现在更新了
        // `this` 绑定到当前实例
        this.doSomething();
      })
    }
  }
})
```

### 左边栏固定宽度，右侧自动适应
#### 方法之一：使用flex布局
```html
<div class="goods">
  <div class="menu"></div>
  <div class="content"></div>
</div>


<style>
  .goods{
    display: flex;
    height: 400px;
  }
  .menu{
    background: #4FB3A4;
    flex: 0 0 100px;
    /*flex: none | [ <'flex-grow'> <'flex-shrink'> <'flex-basis'> 默认 0 1 auto]*/
    /*flex-grow：定义项目的放大比例，默认为0*/
    /*flex-shrink：定义了项目的缩小比例，默认为1*/
    /*flex-basis：定义了在分配多余空间之前，项目占据的主轴空间（main size）*/
  }
  .content{
    flex: 1;
    background: yellow;
  }
</style>
```
更多方法参考我的一篇总结：[左侧定宽，右侧自适应与双飞翼布局](http://blog.simmzl.cn/2017/11/左侧定宽，右侧自适应与双飞翼布局.html)

### v-for使用索引
`v-for` 遍历数组时的参数顺序已经变更，当包含 `index` 时，之前遍历数组时的参数顺序是 `(index, value)`，现在是 `(value, index)`。来和 JavaScript 的原生数组方法 (例如 `forEach` 和 `map`) 保持一致。

### 右侧滚动时根据滚动位置实时计算左侧菜单active的值
首先遍历获取每个li标签的`clientHeight`值，依次叠加并存入数组`listHeight`，之后给右侧`ul`添加`scroll`事件，获取滚动的值后，利用vue的计算属性计算当前滚动的值在`listHeight`的区间，从而通过该区间确定左侧菜单栏对应的active类的位置
