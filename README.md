# ele

> Vue.js 仿[饿了么](h5.ele.me)

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

