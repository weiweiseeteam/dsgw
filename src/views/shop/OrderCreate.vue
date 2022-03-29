<template>
  <div class="back">
    <div class="top">
      <div class="top_bgcor"></div>
      <div class="top_header">
        <div class="iconfont top_header_back" @click="router.back()">&#xe697;</div>
        确认订单
      </div>
      <div class="top_receiver">
        <div class="top_receiver_title">收货地址</div>
        <div class="top_receiver_address">详细地址</div>
        <div class="top_receiver_info">
          <span class="top_receiver_info_name">姓名</span>
          <span class="top_receiver_info_name">189****3557</span>
        </div>
        <div class="top_receiver_enter iconfont">&#xe697;</div>
      </div>
    </div>
    <div class="products">
      <div class="products_title">{{shopName}}</div>
      <div class="products_list" :style="{ height: listHeight}">
        <div class="products_list_back">
          <div class="products_item" v-for="item in productList" :key='item.id'>
            <img class='products_item_img' :src="item.imgUrl" alt="">
            <div class="products_item_detail">
              <h4 class="products_item_title">{{item.name||''}}</h4>
              <p class="products_item_price">
                <span class="products_item_single">
                  <span class="products_item_yen">&yen;</span>
                  {{item.price}} X {{item.count}}
                </span>
                <span class="products_item_total">
                  <span class="products_item_yen">&yen;</span>
                  {{item.price*item.count}}
                </span>
              </p>
            </div>
         </div>
        </div>
      </div>
    </div>
    <div class="order">
      <div class="order_price">实付金额：&yen;{{price}}</div>
      <div class="order_btn" @click="clickSubmit">提交订单</div>
    </div>
    <div class="mask" v-if="showOrder" @click.self="closeOrder">
      <div class="mask_content">
        <div class="mask_content_title">确认支付订单？</div>
        <p class="mask_content_desc">请尽快支付，否则将被取消</p>
        <div class="mask_content_btns">
          <div class="mask_content_btn" @click="closeOrder">取消</div>
          <div class="mask_content_btn" @click.stop="handleCreateOrder">确认支付</div>
        </div>
      </div>
    </div>
  </div>

  <Toast :message='toastData.message' v-if="toastData.showToast" />
</template>

<script setup>
// import { useCommonCartEffect } from '@/effects/cartEffects'
import Toast, { showToastData } from '@/components/toast.vue'
import store from '@/store'
import { post } from '@/utils/request'
import { computed, ref } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

const shopId = useRoute().params.id

const showOrder = ref(false)

const productList = store.state.cartList?.[shopId]
console.log(productList)

// 计算列表可用高度
const screenHeight = screen.availHeight / 100 /// 屏幕可以高度-> rem
screenHeight.toFixed(2)
const listHeight = (screenHeight - 1.96 - 0.16 - 0.5 - 0.2 - 0.32) + 'rem'

const shopName = computed(() => {
  if (productList) {
  // eslint-disable-next-line no-unreachable-loop
    for (const key in productList) {
      return productList[key]?.shopName
    }
  }
})

const price = computed(() => {
  let totalPrice = 0
  if (productList) {
  // eslint-disable-next-line no-unreachable-loop
    for (const key in productList) {
      totalPrice += productList[key]?.price * productList[key]?.count
    }
  }
  return totalPrice.toFixed(2)
})

const { toastData, showToast } = showToastData()

const handleCreateOrder = async () => {
  const products = []
  for (const key in productList) {
    products.push({
      id: productList[key]?.id || '',
      num: productList[key]?.count || 0
    })
  }
  try {
    const result = await post('/createOrder', {
      addressId: 1,
      shopName: shopName.value,
      shopId: shopId,
      products: products
    })

    console.log(result)

    // eslint-disable-next-line no-empty
    if (result.result === 'success') {
      showOrder.value = false
      showToast(result?.message || '操作成功')
      store.commit('clearCart', { shopId })
      setTimeout(() => {
        router.push({ name: 'orderList' })
      }, 2000)
    } else {
      showToast(result?.message || '操作失败')
    }
  } catch (e) {
    console.log(e)
    showToast('操作失败')
  }
}

const clickSubmit = () => {
  showOrder.value = true
  console.log(showOrder)
}

const closeOrder = () => {
  showOrder.value = false
  console.log(showOrder)
}

</script>

<style lang="scss" scoped>
  @import '../../style/viriables.scss';
  @import '../../style/mixins.scss';

.back {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  background-color: #eee;
}

.top {
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%);
  background-repeat: no-repeat;
  position: relative;
  &_header {
    padding-top: .2rem;
    line-height: .24rem;
    color: white;
    text-align: center;
    position: relative;
    font-size: .16rem;
    &_back {
      position: absolute;
      left: .18rem;
      font-size: .22rem;
    }
  }
  &_receiver {
    position: absolute;
    left: .18rem;
    right: .18rem;
    bottom: 0;
    height: 1.11rem;
    background: #fff;
    border-radius: .04rem;
    // padding: ;
    &_title {
      padding: .16rem 0 .14rem .16rem;
      font-size: .16rem;
      color: #333;
      line-height: .22rem;
    }
    &_address {
      padding: 0 .4rem 0 .16rem;
      font-size: .14rem;
      color: #333;
      line-height: .2rem
    }
    &_info {
      padding: .06rem 0 0 .16rem;
      &_name {
        color: #666;
        font-size: .12rem;
        line-height: .18rem;
        margin-right: .06rem;
      }
    }
    &_enter {
      position: absolute;
      color: #666;
      top: .5rem;
      right: .16rem;
      transform: rotate(180deg);
      font-size: .2rem;
    }
  }
}
.products {
  margin: .16rem .18rem .2rem .18rem;
  background: #fff;
  // overflow-y: auto;
  overflow: hidden;
  &_title {
    padding: .16rem .16rem 0 .16rem;
    font-size: .16rem;
    color: #333;
  }
  &_list {
    // position: absolute;
    // left: 0;
    // right: 0;
    // bottom: .5rem;
    // overflow: hidden;
    // height: 2rem;
    overflow-y: auto;
  }
  &_item {
      position: relative;
      display: flex;
      padding: .16rem;
      &_img {
        width: .46rem;
        height: .46rem;
        margin-right: .16rem;
      }
      &_detail {
        flex: 1;
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
        display: flex;
        margin: .06rem 0 0 0;
        line-height: .2rem;
        font-size: .14rem;
        color: $hightlight-fontColor;
      }
      &_total {
        flex: 1;
        text-align: right;
        color: #000;
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
.order {
  display: flex;
  height: .49rem;
  line-height: .49rem;
  background: #fff;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  &_price {
    flex: 1;
    text-indent: .24rem;
    font-size: .14rem;
    color: #333;
    font-weight: bold;
  }
  &_btn {
    width: .98rem;
    background: #4fb0f9;
    color: #fff;
    text-align: center;
    font-size: .14rem;
  }
}

.mask {
  z-index: 1;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  &_content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    widows: 3rem;
    height: 1.56rem;
    background: #fff;
    border-radius: .04rem;
    z-index: 2;
    &_title {
      margin: .24rem 0 0 0;
      line-height: .26rem;
      font-size: .18rem;
      color: #333;
      text-align: center;
    }
    &_desc {
      margin-top: .08rem;
      font-size: .14rem;
      color: #666;
      text-align: center;
    }
    &_btns {
      display: flex;
      margin: .24rem .58rem;
    }
    &_btn {
      flex: 1;
      width: .8rem;
      line-height: .32rem;
      border-radius: .16rem;
      text-align: center;
    }
    &_btn:first-child {
      margin-right: .12rem;
      color: #4fb0f9;
      border: .01rem solid #4fb0f9;
    }
    &_btn:last-child {
      margin-left: .12rem;
      color: white;
      background-color: #4fb0f9;
      border: .01rem solid #4fb0f9;
    }
  }
}
</style>
