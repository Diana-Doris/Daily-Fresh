<template>
  <div class="main-header">
    <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ currentRoutes[0] ? currentRoutes[0].meta.title : '' }}</a-breadcrumb-item>
        <a-breadcrumb-item><a :href="currentRoutes[1] ? currentRoutes[1].path : ''">{{ currentRoutes[1] ? currentRoutes[1].meta.title : '' }}</a></a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <!-- 用户信息 -->
    <ul class="user-info">
      <li class="user-name">
        {{ $store.state.user.username}}
        <a-icon type="down" />
      </li>
      <li @click="goOUt()">退出</li>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentRoutes: [],
    }
  },
  watch: {
    $route: {
      handler (newName) {
        this.currentRoutes = newName.matched;
      },
      immediate: true,
    }
  },
  methods: {
    toggleCollapsed () {
      this.$store.dispatch('changeCollapsed')
    },
    goOUt () {
      console.log('goout~')
      this.$store.dispatch('loginOut');
      this.$router.push('/login');

    }
  },
}
</script>