<template>
<div>
  <div class="goods">
    <div class="menu-wrapper" ref="menu">
      <ul class="content">
        <li v-for=" (item, index) in goods" class="menu-item" :class="{'active': index ===currentIndex}" @click="selectMenu(index)">
          <span class="text border-1px" ><span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="food">
      <ul class="content">
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px" @click="selectFood(food,$event)">
              <div class="icon">
                <img :src="food.icon" class="img" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
  <div>
    <food :food="selectedFood" ref="child"></food>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart';
  import cartcontrol from '../cartcontrol/cartcontrol';
  import food from '../food/food';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let topHeight = this.listHeight[i];
          let bottomHeight = this.listHeight[i + 1];
          if (!bottomHeight || (this.scrollY >= topHeight && this.scrollY < bottomHeight)) {
             return i;
          }
        }
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach(good => {
          good.foods.forEach(food => {
            if (food.count > 0) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
      this.$http.get('./static/data.json').then(res => {
        this.goods = res.body.goods;
        this.$nextTick(() => {
          this._initScroll();
          this._calcHeight();
        });
    });
    },
    methods: {
//      初始化better-scroll
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menu, {
          click: true
        });
        this.foodScroll = new BScroll(this.$refs.food, {
          probeType: 3,
          click: true
        });
        this.foodScroll.on('scroll', pos => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
//      计算商品列表高度
      _calcHeight() {
        this.foodList = this.$refs.food.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < this.foodList.length; i++) {
          let item = this.foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index) {
        let el = this.foodList[index];
        this.foodScroll.scrollToElement(el, 300);
      },
//      点击物品弹出详情
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.child.show();
      }
    },
    components: {
      shopcart,
      cartcontrol,
      food
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

  @import "../../common/stylus/mixin.styl";

  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        line-height 14px
        padding 0 12px
        &.active
          position relative
          z-index 10
          background #fff
          margin-top -1px
          font-weight 700
          .text
            border-none()
        .icon
          display inline-block
          width 12px
          height 12px
          background-size 12px 12px
          background-repeat no-repeat
          vertical-align top
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          font-size 12px
          width 56px
          vertical-align middle
          text-align center
          border-1px(rgba(7,17,27,0.1))
          display table-cell
    .foods-wrapper
      flex 1
      .title
        height 26px
        padding-left 14px
        font-size 12px
        color rgb(147,153,159)
        background #f3f5f7
        line-height 26px
        border-left 2px solid #d9dde1
      .food-item
        display flex
        margin 0 18px 0 18px
        padding 18px 0 18px 0
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
        .icon
          flex 0 0 57px
          margin-right 10px
          .img
            width 57px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size  14px
            color rgb(7,17,27)
          .desc,.extra
            color rgb(147,153,159)
            font-size 10px
            line-height 10px
            margin-bottom 8px
          .extra
            .count
              margin-right 12px
          .price
            line-height 24px
            font-weight 700
            .now
              margin-right 8px
              line-height 24px
              color #EE1414
              font-size 14px
            .old
              text-decoration line-through
              color rgb(147,153,159)
              font-size 10px
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 12px
</style>
