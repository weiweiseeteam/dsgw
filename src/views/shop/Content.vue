<template>
  <div class="content">
    <div class="category">
      <!-- <div class="category_item category_item-active">全部商品</div>
      <div class="category_item">秒杀</div>
      <div class="category_item">新鲜水果</div>
      <div class="category_item">休闲食品</div>
      <div class="category_item">时令蔬菜</div>
      <div class="category_item">肉蛋家禽</div> -->
      <div
      class="category_item"
      :class="{'category_item-active': currentType===item.type}"
      v-for="(item,index) in menuList"
      :key='index'
      @click="()=>{handleClickShopMenu(item.type)}"
      >
        {{item.name}}
      </div>
    </div>
    <div class="product">
      <div class="product_item" v-for="item in data.contentList" :key='item.id'>
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
          <span class="product_number_minus iconfont" @click="()=>{minusNumber(routeId, item.id, item)}" v-show="cartList?.[routeId]?.[item.id]?.count>0">&#xe850;</span>
          <span class="product_number_price">{{cartList?.[routeId]?.[item.id]?.count || 0}}</span>
          <span class="product_number_plus iconfont" @click="()=>{plusNumber(routeId, item.id, item, shopName)}">&#xe84f;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, toRefs } from '@vue/reactivity'
import { post } from '@/utils/request'
import { useRoute } from 'vue-router'
// import { watchEffect } from '@vue/runtime-core'
import { useStore } from 'vuex'

const store = useStore()
const { cartList } = toRefs(store.state)

const menuList = reactive(
  [
    {
      name: '全部商品',
      type: 'all'
    },
    {
      name: '秒杀',
      type: 'others'
    },
    {
      name: '新鲜水果',
      type: 'fruit'
    },
    {
      name: '休闲食品',
      type: 'others2'
    },
    {
      name: '时令蔬菜',
      type: 'others3'
    },
    {
      name: '肉蛋家禽',
      type: 'others1'
    }
  ])

const route = useRoute()
const routeId = route.params.id
const data = reactive({ contentList: [] })
const currentType = ref(menuList[0].type)

// eslint-disable-next-line no-undef
const props = defineProps({
  shopName: String
})
console.log(props)

const requestInfo = async () => {
  const result = await post('/products', { id: route.params.id, type: currentType.value })
  console.log(result)
  if (result?.datalist) {
    data.contentList = result.datalist
  }
}
requestInfo()
// watchEffect(() => { requestInfo() })

const handleClickShopMenu = (type) => {
  currentType.value = type
  requestInfo()
}

const plusNumber = (shopId, productId, item, shopName) => {
  store.commit('addItemToCart', { shopId, productId, item, shopName })
}

const minusNumber = (shopId, productId) => {
  store.commit('minusItemToCart', { shopId, productId })
}

</script>

<style lang="scss" scoped>

@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: .5rem;
}
.category {
  overflow-y: scroll;
  height: 100%;
  width: .76rem;
  background: #f5f5f5;
  &_item {
    line-height: .4rem;
    text-align: center;
    font-size: .14rem;
    color: #333;
    &-active {
      background: white;
    }
  }
}
.product {
  overflow-y: scroll;
  flex: 1;
  &_item {
    position: relative;
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid $content-bgColor;
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
