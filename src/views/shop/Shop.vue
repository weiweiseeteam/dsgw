<template>
  <div class="shopBack">
    <div class="search">
      <div class="search_back iconfont" @click="handleClickBack">&#xe697;</div>
      <div class="search_content">
        <span class="search_content_icon iconfont">&#xe648;</span>
        <span class="search_content_input">
          <input type="text" placeholder="请输入商品名称">
        </span>
      </div>
    </div>
    <nearBy :item='item.item' v-if="item.item.id"/>
  </div>
  <Content :shopName='item.item.title' v-if="item.item.title"/>
  <Cart :shopName='item.item.title' v-if="item.item.title"/>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import nearBy from '../../components/nearby'
import { post } from '@/utils/request'
import Content from './Content'
import Cart from './Cart'

const requestShopInfo = (itemId) => {
  const item = reactive({ item: {} })
  const getShopInfo = async () => {
    const result = await post('/shop_detail', { id: itemId })
    item.item = result.detail
  }
  getShopInfo()
  return { item }
}

const clickBack = () => {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return handleBack
}

export default {
  name: 'jdShop',
  // props: ['item'],
  components: { nearBy, Content, Cart },
  setup (props, content) {
    // console.log(props)
    const route = useRoute()
    const { item } = requestShopInfo(route.params.id)
    const handleClickBack = clickBack()
    return { item, handleClickBack }
  }
}
</script>

<style lang="scss" scoped>
.shopBack{
  margin: .2rem .1rem;
}
.search
{
  height: .32rem;
  margin: .14rem 0 .04rem 0;
  display: flex;
  line-height: .32rem;
  background: none;
  &_back
  {
    width: .3rem;
    font-size: .24rem;
    color: #B6B6B6;
    background: none;
  }
  &_content
  {
    display: flex;
    flex: 1;
    background: #F5F5F5;
    line-height: .32rem;
    border-radius: .16rem;
    &_icon{
      width: .44rem;
      text-align: center;
      margin-left: .1rem;
    }
    &_input, &_input input{
      width: 100%;
      display: block;
      border: none;
      outline: none;
      background: none;
      line-height: .32rem;
      padding-right: .2rem;
    }
    &_input input::placeholder{
      color: #333;
      font-size: .14rem;
    }
  }
}

</style>
