<template>
  <div class="menu-list">
    <a-menu
      :default-selected-keys="[$router.currentRoute.matched[1] ? $router.currentRoute.matched[1].name : '']"
      :default-open-keys="[$router.currentRoute.matched[0].name]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
    >
      <a-sub-menu
        v-for="route in $store.state.menuRoutes"
        :key="route.name"
      >
        <span slot="title">
          <a-icon
            type="home"
            v-if="route.name == 'Home'"
          />
          <a-icon
            type="gift"
            v-if="route.name == 'Product'"
          />
          <span>{{ route.meta.title }}</span>
        </span>
        <a-menu-item
          v-for="child in route.children"
          :key="child.name"
        >

          <router-link :to="{name: child.name}">

            <a-icon
              type="line-chart"
              v-if="child.name == 'goodSum'"
            />
            <a-icon
              type="unordered-list"
              v-if="child.name == 'goodList'"
            />
            <a-icon
              type="file-add"
              v-if="child.name == 'goodAdd'"
            />

            <span>{{ child.meta.title }}</span>
          </router-link>
        </a-menu-item>

      </a-sub-menu>

      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  created () {
    // console.log(this.$router.currentRoute.matched)
  },
}
</script>