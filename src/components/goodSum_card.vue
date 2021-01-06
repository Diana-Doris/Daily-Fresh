<template>
  <div style="background-color: #ececec; padding: 20px;">
    <a-row :gutter="16">
      <a-col
        :span="8"
        v-for="card in cardData"
        :key="card.name"
      >
        <a-card
          :title="card.name"
          :bordered="false"
        >
          <p>{{ card.content }}</p>
        </a-card>
      </a-col>

    </a-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cardData: [{
        name: '电商总览', content: 'card1 content'
      }, {
        name: '用户总览', content: 'card2 content'
      }, {
        name: '销售总览', content: 'card3 content'
      }]
    }
  },
}
</script>
