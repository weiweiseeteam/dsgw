<template>
  <div class="nearby_item" @click="handleClickItem" :class="{'shop_content--bordered' : 'hideBorder'?false:true}">
    <img class="nearby_item_img" :src="item.imgUrl" alt="">
    <div class="nearby_content">
        <div class="nearby_content_title">{{item.title}}</div>
        <div class="nearby_content_tags">
        <span class="nearby_content_tag">{{item.tags[0]}}</span>
        <span class="nearby_content_tag">{{item.tags[1]}}</span>
        <span class="nearby_content_tag">{{item.tags[2]}}</span>
        </div>
        <p class="nearby_content_highlight">{{item.desc}}</p>
    </div>
    </div>
</template>

<script>
// const clickItem = () => {
//   const handleClickItem = () => {
//     const router = useRouter()
//     router.push({ name: 'Shop' })
//   }
//   return handleClickItem
// }

export default {
  name: 'nearBy',
  props: ['item', 'hideBorder']
  // setup () {
  //   const handleClickItem = clickItem()
  //   return { handleClickItem }
  // }
}
</script>

<style lang="scss" scoped>
  @import '../style/viriables.scss';
  @import '../style/mixins.scss';
  .nearby_item
    {
        display: flex;
        padding-top: .12rem;
        &_img
        {
            margin-right: .16rem;
            width: .56rem;
            height: .56rem;
        }
    }
    .nearby_content{
        flex: 1;
        padding-bottom: .12rem;
        &_title{
            line-height: .22rem;
            font-size: .16rem;
            color: $content-fontcolor;
        }
        &_tags
        {
            line-height: .18rem;
            margin-top: .08rem;
            font-size: .13rem;
            color: $content-fontcolor;

        }
        &_tag
        {
            margin-right: .16rem;
        }
        &_highlight
        {
            margin: .08rem 0 0 0;
            margin-top: .08rem;
            color: #E93B3B;
            line-height: .13rem;
        }
    }
    .shop_content--bordered{
      border-bottom: solid 1px $content-bgColor;
    }
</style>
