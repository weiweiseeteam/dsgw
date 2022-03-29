<template>
    <div class="nearby">
        <div class="nearby_title">附近店铺</div>
        <router-link :to="`/shop/${item.id}`" v-for="item in nearbyList" :key='item.id'>
          <nearBy :item='item' :hideBorder='true' />
        </router-link>
        <Toast :message='toastData.message' v-if="toastData.showToast"/>
    </div>
</template>

<script>
import { post } from '../../utils/request'
import { reactive } from '@vue/reactivity'
import Toast, { showToastData } from '../../components/toast'
import nearBy from '../../components/nearby'

const requestData = () => {
  const { toastData, showToast } = showToastData()
  const nearbyList = reactive([]) ///  第二种响应式 = ref([])
  const requestShopList = async () => {
    const result = await post('/shoplist', {})
    console.log(result.datalist)
    if (result?.datalist) {
      nearbyList.push(result.datalist[0])
      nearbyList.push(result.datalist[1])
      // 第二种响应式 neabyList.value = result.datalist
    } else {
      showToast('获取数据失败')
    }
  }
  requestShopList()
  return { toastData, nearbyList }
}

export default {
  name: 'homeBottom',
  components: { Toast, nearBy },
  setup () {
    // 获取附近店铺数据
    const { toastData, nearbyList } = requestData()
    return { toastData, nearbyList }
  }
}
</script>

<style lang="scss" scoped>
    @import '../../style/viriables.scss';
    .nearby
    {
        &_title
        {
        margin: .16rem 0 .02rem 0;
        font-weight: normal;
        color: $content-fontcolor;
        font-size: .18rem;
        }
        & a{
          outline: none;
          text-decoration: none;
        }
    }
</style>
