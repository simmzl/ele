// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import goods from 'components/goods/goods';
import ratings from 'components/Ratings/Ratings';
import seller from 'components/seller/seller';

import 'common/stylus/index.styl';

Vue.use(VueRouter);
Vue.config.productionTip = false;
/* eslint-disable no-new */

let routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
];

let router = new VueRouter({
  linkActiveClass: 'active',
  routes // （缩写）相当于 routes: routes
});
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
router.push('goods');
