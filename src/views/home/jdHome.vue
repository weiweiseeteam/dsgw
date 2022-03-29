<template>
  <div class="content">
    <homeTop />
    <homeBottom />
  </div>
  <tabBar :currentIndex=0 />
</template>

<script>
import homeTop from './homeTop'
import homeBottom from './homeBottom'
import tabBar from '../tabbar/tabbar'
export default {
  name: 'jdHome',
  components: {
    homeTop, homeBottom, tabBar
  }
}

</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.content
{
  overflow-y: auto;
  position: absolute;
  left: 0;
  bottom: .5rem;
  top: 0;
  right: 0;
  padding: 0 .18rem .15rem .18rem;
  color: $content-fontcolor;
}

</style>
