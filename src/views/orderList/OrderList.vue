<template>
  <div class="back">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order"
        v-for="(item, index) in orderList.list"
        :key='index'
      >
        <div class="order_title">
          {{item.name}}
          <span class="order_status">{{item.isCancle?'已取消':'已下单'}}</span>
        </div>
        <div class="order_content">
          <div class="order_content_imgs">
            <template v-for="(imgItem,imgIndex) in item.imgs" :key='imgIndex'>
               <img class="order_content_imgs_img" :src="imgItem" alt="">
            </template>
          </div>
          <div class="order_content_info">
            <div class="order_content_price">&yen;{{item.price}}</div>
            <div class="order_content_count">共{{item.count}}件</div>
          </div>
        </div>
      </div>

    </div>
  </div>
  <tabBar :currentIndex=2 />

  <Toast :message='toastData.message' v-if="toastData.showToast" />
</template>

<script setup>

import { post } from '@/utils/request'
import tabBar from '../tabbar/tabbar'
import Toast, { showToastData } from '@/components/toast.vue'
import { reactive } from '@vue/reactivity'

const { toastData, showToast } = showToastData()

const orderList = reactive({ list: [] })
const requestOrderList = async () => {
  try {
    const result = await post('/orderList', {})
    if (result) {
      orderList.list = result
    } else {
      showToast(result?.message || '请求失败')
    }
  } catch (error) {
    showToast('请求失败')
  }
}

requestOrderList()

</script>

<style lang="scss" scoped>
.back {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: #f8f8f8;
}

.title {
  line-height: .44rem;
  background: #fff;
  font-size: .16rem;
  color: #333;
  text-align: center;
}

.orders {

}

.order {
  padding: .16rem;
  margin: .16rem .18rem;
  background: #fff;
  &_title {
    line-height: .22rem;
    font-size: .16rem;
    color: #333;
    margin-bottom: .16rem;
  }
  &_status {
    float: right;
    font-size: .14rem;
    color: #999;
  }
  &_content {
    display: flex;
    &_imgs {
      flex: 1;
      &_img {
        width: .4rem;
        height: .4rem;
        margin-right: .12rem;
      }
    }
    &_info {
      width: .7rem;
    }
    &_price {
      line-height: .2rem;
      font-size: .18rem;
      color: #e93b3b;
      text-align: right;
      margin-bottom: .24rem;
    }
    &_count {
      font-size: .12rem;
      color: #333;
      line-height: .14rem;
      text-align: right;
    }
  }
}

</style>
