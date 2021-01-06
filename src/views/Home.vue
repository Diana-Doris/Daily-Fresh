<template>
  <div class="home">
    <!-- 左侧部分菜单 -->
    <left-menu :key="key" />

    <!-- 右侧内容区 -->
    <div :class="{'main-app':true,'menu-unfold':$store.state.collapsed}">
      <!-- 右上半部分- -->
      <slider-nav />
      <!-- 路由切换区 -->
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import LeftMenu from './home_layout/menu.vue'
import SliderNav from './home_layout/sliderNav.vue'

export default {
  components: {
    LeftMenu,
    SliderNav
  },
  data () {
    return {
      key: new Date().getTime()
    };
  },
  watch: {
    $route () {
      this.key = new Date().getTime()
    }
  }

};
</script>

<style lang="less">
/* ~ 代表的是我们当前这个路径是需要通过模块进行一个编译的，就会把@当做src这个文件夹 */
@import url("~@/assets/css/home.less");
</style>