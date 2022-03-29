<template>
    <div class="position">
      <span class="iconfont position_icon">&#xe64c;</span>
      定位位置
      <span class="iconfont position_notice">&#xe63f;</span>
    </div>
    <div class="search">
      <span class="iconfont">&#xe648;</span>
      <span class="search_text">请输入关键字开始搜索</span>
    </div>
    <div class="banner">
      <img src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt="">
    </div>
    <div class="icons">
      <div class="icons_item" v-for="(item, index) in itemList" :key='index'>
        <img class="icons_item_img" :src="item.imgUrl" alt="">
        <p class="icons_item_desc">{{item.desc}}</p>
      </div>
    </div>
    <div class="gap"></div>
</template>

<script>
export default {
  name: 'homeTop',
  setup () {
    const itemList = [
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        desc: '超市便利'
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/菜市场.png',
        desc: '菜市场'
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/水果店.png',
        desc: '水果店'
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/鲜花.png',
        desc: '鲜花绿植'
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/医药健康.png',
        desc: '医药健康'
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/家居.png',
        desc: '家居时尚'
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/蛋糕.png',
        desc: '烘焙蛋糕'
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/签到.png',
        desc: '签到'
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/大牌免运.png',
        desc: '大牌免运'
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/红包.png',
        desc: '红包套餐'
      }
    ]

    return { itemList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.position
  {
    position: relative;
    padding: .16rem .24rem .16rem 0;
    line-height: .22rem;
    font-size: .16rem;
    @include ellipsis;
    .position_icon
    {
      position: relative;
      top: .02rem;
      font-size: .2rem;
    }
    .position_notice
    {
      top: .17rem;
      position: absolute;
      right: 0;
      font-size: .2rem;
    }
  }
  .search
  {
    margin-bottom: .12rem;
    line-height: .32rem;
    color: #B7B7B7;
    background: #F5F5F5;
    border-radius: .16rem;
    .iconfont
    {
      position: relative;
      top: .04rem;
      display: inline-block;
      font-size: .2rem;
      padding:  0 .12rem 0 .16rem;
    }
    &_text
    {
      display: inline-block;
      font-size: .14rem;
    }
  }
  .banner
  {
    // 使图片未加载之前 图片下的内容 位置在正确的位置
    height: 0;
    padding-bottom: 25.4%;
    overflow: hidden;
    // 使图片未加载之前 图片下的内容 位置在正确的位置
    img {
      width: 100%;
    }
  }
  .icons
  {
    margin-top: .16rem;
    display: flex;
    flex-wrap: wrap;
    &_item
    {
      width: 20%;
      &_img
      {
        display: block;
        width: .4rem;
        height: .4rem;
        margin: 0 auto;
      }
      &_desc
      {
        margin: .06rem 0 .16rem 0;
        text-align: center;
        color: $content-fontcolor;
      }
    }
  }
  .gap
  {
    height: .1rem;
    background: $content-bgColor;
    margin: 0 -.18rem;
  }
</style>
