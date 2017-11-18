<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'hightlight': totalCount>0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="number" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'hightlight': totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="(totalPrice >= minPrice) ? 'enough' : 'not-enough'">{{payDesc}}</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 10,
              count: 1
            }
          ];
        }
      },
      deliveryPrice: {
        type: Number
      },
      minPrice: {
        type: Number
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach(food => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach(food => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position fixed
    left 0
    bottom 0
    width 100%
    height 48px
    z-index 50
    .content
      display flex
      background #141d27
      font-size 0
      .content-left
        flex 1
        vertical-align top
        .logo-wrapper
          position relative
          top -10px
          display inline-block
          margin 0 12px
          padding 6px
          box-sizing border-box
          width 56px
          height 56px
          vertical-align top
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            background #2B343C
            text-align center
            color #80858A
            &.hightlight
              background rgb(0,160,220)
              color #fff
            .icon-shopping_cart
              font-size 24px
              line-height 44px
          .number
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #fff
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          font-size 16px
          line-height 24px
          margin-top 12px
          font-weight 700
          color #919396
          box-sizing border-box
          padding-right 12px
          border-right 1px solid rgba(255, 255, 255, 0.1)
          &.hightlight
            color #fff
        .desc
          display inline-block
          line-height 24px
          margin 12px 0 0 12px
          font-size 10px
          color #919396
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          font-size 12px
          font-weight 700
          line-height 48px
          text-align center
          padding 0 8px 0 8px
          &.not-enough
            color rgba(255, 255, 255, 0.4)
            background #2B333B
          &.enough
            color #fff
            background #00b43c
</style>
