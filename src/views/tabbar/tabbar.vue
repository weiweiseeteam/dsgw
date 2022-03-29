<template>
  <div class="tabbar">
    <span class="tabbar_item" :class="{'tabbar_item--active' : index==currentIndex}" v-for="(item, index) in tabbarList" :key='item.icon'>
      <keep-alive>
        <router-link :to="item.to">
          <div class="iconfont" v-html="item.icon"></div>
          <div class="tabbar_title">{{item.text}}</div>
        </router-link>
      </keep-alive>
    </span>
  </div>
</template>

<script setup>

const tabbarList = [
  { icon: '&#xe601;', text: '首页', to: '/' },
  { icon: '&#xe6b9;', text: '购物车', to: '/cartList' },
  { icon: '&#xe600;', text: '订单', to: '/orderList' },
  { icon: '&#xe7d9;', text: '我的', to: '/myInfo' }
]

// eslint-disable-next-line no-undef
const props = defineProps({
  currentIndex: Number
})

console.log(props.currentIndex)

</script>

<style lang="scss">
@import '../../style/viriables.scss';
.tabbar
{
  width: 100%;
  height: 0.49rem;
  position: absolute;
  left: 0;
  bottom: 0;
  border-top: #F1F1F1 solid 1px;
  padding: 0 .18rem;
  box-sizing: border-box;
  display: flex;
  a {
    text-decoration: none;
    color: $content-fontcolor;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  &_item
  {
    flex: 1;
    text-align: center;
    .iconfont
    {
      margin: .07rem 0 .02rem 0;
      font-size: .18rem;
    }
    &--active a
    {
      color: #1FA4FC;
    }
  }
  &_title
  {
    font-size: .2rem;
    transform: scale(.5, .5);
    transform-origin: top center;
  }
}
</style>
