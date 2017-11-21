<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count > 0" @click="decreaseCount">
        <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCount($event)"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    created() {
//      console.log(this.food);
    },
    methods: {
      addCount(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
          this.food.count = 1;
        } else {
          this.food.count ++;
        }
      },
      decreaseCount(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count > 0) {
          this.food.count --;
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0
    .cart-decrease
      display inline-block
      padding 6px
      transition all .4s linear
      .inner
        line-height 24px
        font-size 24px
        color rgb(0,160,220)
        transition all 0.4s linear
      &.move-enter-active, &.move-leave-active
        transform translate3d(0,0,0)
        .inner
          display inline-block
          transform rotate(0)
      &.move-enter, &.move-leave-to
        opacity: 0
        transform translate3d(24px,0,0)
        .inner
          transform rotate(180deg)
    .cart-add
      display inline-block
      padding 6px
      font-size 24px
      line-height 24px
      color rgb(0,160,220)
    .cart-count
      display inline-block
      vertical-align top
      font-size 10px
      line-height 24px
      text-align center
      width 12px
      padding-top 6px
      color rgb(147,153,159)
</style>
