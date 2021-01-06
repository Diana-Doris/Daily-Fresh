<template>
  <div class="index">
    <!-- 卡片 -->
    <card />
    <!-- 折线图 -->
    <show-line></show-line>
  </div>
</template>

<script>
import Card from '@/components/goodSum_card.vue'
import showLine from '@/components/goodSum_line.vue'

export default {
  components: {
    Card,
    showLine
  }
}
</script>
