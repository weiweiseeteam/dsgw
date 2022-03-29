<template>
  <div class="mask" v-show="showCart" @click="showCartList"></div>
  <div class="cart">
    <div class="check">
      <div class="check_icon">
        <img src="http://www.dell-lee.com/imgs/vue3/basket.png" alt="" class="check_icon_img" @click="showCartList">
        <div class="check_icon_tag" v-if="totalNum>0">{{totalNum}}</div>
      </div>
      <div class="check_info">
        总计：<span class="check_info_price">&yen;{{totalPrice||0}}</span>
      </div>
      <div class="check_btn">
        <router-link :to="`/orderCreate/${shopId}`">
          去结算
        </router-link>
      </div>
    </div>
  </div>
  <div class="product" v-show="showCart">
    <div class="product_header">
      <div class="product_header_all" @click="clickAll">
        <span class="product_header_all_icon iconfont" @click="()=>{clickAll(shopId)}" v-html="allChecked?'&#xe652;':'&#xe66c;'"></span>
        全选
      </div>
      <div class="product_header_clear"><span @click="clearCart(shopId)">清空购物车</span></div>
    </div>
    <template v-for="item in contentList" :key='item.id'>
      <div class="product_item" v-if="item.count>0">
        <span class="product_item_checked iconfont" @click="()=>{changeCheck(shopId, item.id)}" v-html="item.checked?'&#xe652;':'&#xe66c;'"></span>
        <img class='product_item_img' :src="item.imgUrl" alt="">
        <div class="product_item_detail">
          <h4 class="product_item_title">{{item.name}}</h4>
          <p class="product_item_sales">已售：{{item.sales}}</p>
          <p class="product_item_price">
            <span class="product_item_yen">&yen;{{item.price}}</span>
            <span class="product_item_origin">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product_number">
          <span class="product_number_minus iconfont" @click="()=>{minusNumber(shopId, item.id, item)}" v-show="item.count>0">&#xe850;</span>
          <span class="product_number_price">{{item.count || 0}}</span>
          <span class="product_number_plus iconfont" @click="()=>{plusNumber(shopId, item.id, item, shopName)}">&#xe84f;</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const route = useRoute()
const shopId = route.params.id

// eslint-disable-next-line no-undef
const props = defineProps({
  shopName: String
})
console.log(props)

const contentList = computed(() => {
  return store.state.cartList[shopId]
})

const plusNumber = (shopId, productId, item, shopName) => {
  store.commit('addItemToCart', { shopId, productId, item, shopName })
}

const minusNumber = (shopId, productId) => {
  store.commit('minusItemToCart', { shopId, productId })
}

const changeCheck = (shopId, productId) => {
  store.commit('changeChecked', { shopId, productId })
}

const clearCart = (shopId) => {
  store.commit('clearCart', { shopId })
}

const clickAll = (shopId) => {
  store.commit('allCart', { shopId })
}

const showCart = ref(false)
const showCartList = () => {
  showCart.value = !showCart.value
  console.log(contentList)
}

const totalNum = computed(() => {
  const productList = store.state.cartList?.[shopId]
  let totalNum = 0
  if (productList) {
    for (const i in productList) {
      const productInfo = productList[i]
      if (productInfo.checked) {
        totalNum += productInfo.count
      }
    }
  }
  return totalNum
})

const totalPrice = computed(() => {
  const productList = store.state.cartList?.[shopId]
  let totalPrice = 0
  if (productList) {
    for (const i in productList) {
      const productInfo = productList[i]
      if (productInfo.checked) {
        totalPrice += productInfo.price * productInfo.count
        totalPrice.toFixed(2)
      }
    }
  }
  return totalPrice
})

const allChecked = computed(() => {
  const productList = store.state.cartList?.[shopId]
  let checked = true
  if (productList) {
    for (const i in productList) {
      const productInfo = productList[i]
      if (!productInfo.checked) {
        checked = false
        break
      }
    }
  }
  return checked
})

</script>

<style lang="scss" scoped>
  @import '../../style/viriables.scss';
  @import '../../style/mixins.scss';
  .mask {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    background: rgba(0, 0, 0, .5);
  }
  .cart{
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: .5rem;
    background: #fff;
  }
  .check{
    display: flex;
    line-height: .49rem;
    box-sizing: border-box;
    border-top: .01rem solid #f1f1f1;
    height: .5rem;
    &_icon{
      position: relative;
      width: .84rem;
      &_img{
        display: block;
        margin: .12rem auto;
        width: .28rem;
        height: .26rem;
      }
      &_tag{
        position: absolute;
        width: .2rem;
        height: .2rem;
        line-height: .2rem;
        transform: translate(0.5);
        font-size: .12rem;
        right: .2rem;
        top: .04rem;
        background: red;
        border-radius: 50%;
        text-align: center;
        color: white;
        transform: translate(0.5);
      }
    }
    &_info{
      flex: 1;
      &_price{
        color: red;
        font-size: .18rem;
      }
    }
    &_btn{
      width: .98rem;
      background: #4fb0f9;
      line-height: .5rem;
      font-size: .14rem;
      color: white;
      text-align: center;
      & a {
        color: white;
        text-decoration: none;
      }
    }
  }
.product {
  overflow-y: scroll;
  flex: 1;
  position: fixed;
  bottom: .5rem;
  left: 0;
  width: 100%;
  background: #fff;
  &_header {
    display: flex;
    line-height: .52rem;
    border-bottom: .01rem solid #f1f1f1;
    font-size: .14rem;
    color: #333;
    &_all {
      width: .64rem;
      margin-left: .18rem;
      &_icon {
        font-size: .2rem;
        color: #0091FF;
        vertical-align: top;
        margin-right: .1rem;
      }
    }
    &_clear {
      flex: 1;
      margin-right: .16rem;
      text-align: right;
    }
  }

  &_item {
    position: relative;
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid $content-bgColor;
    &_checked {
      line-height: .68rem;
      margin-right: .2rem;
      font-size: .2rem;
      color: #0091FF;
    }
    &_detail {
      overflow: hidden;
    }
    &_img {
      width: .68rem;
      height: .68rem;
      margin-right: .16rem;
    }
    &_title {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &_sales {
      margin: .06rem 0;
      font-size: .12rem;
      color: $content-fontcolor;
    }
    &_price {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $hightlight-fontColor;
    }
    &_yen {
      font-size: .12rem;
    }
    &_origin {
      margin-left: .06rem;
      line-height: .2rem;
      font-size: .12rem;
      color: #999;
      text-decoration: line-through;
    }
    .product_number {
      position: absolute;
      right: 0;
      bottom: .12rem;
      line-height: .18rem;
      height: .18rem;
      vertical-align: middle;
      &_minus {
        color: #666;
        background: white;
        width: .18rem;
        height: .18rem;
      }
      &_plus {
        background: #0091ff;
        color: white;
        border-radius: 50%;
        border: none;
        height: .18rem;
        width: .18rem;
      }
      &_price{
        line-height: .18rem;
        height: .18rem;
        margin: 0 .1rem;
        display: inline-block;
        padding-bottom: .2rem;
      }
    }
  }
}
</style>
