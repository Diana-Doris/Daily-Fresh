<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :pagination="page"
    @change="changePage"
  >
    <div
      slot="operation"
      slot-scope="text,record"
    >
      <a-button @click="editTable(record)">编辑</a-button>
      <a-button @click="deleteTable(record)">删除</a-button>
    </div>
  </a-table>
</template>

<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: '5%'
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    key: 'category',
    ellipsis: true,
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
    ellipsis: true,
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
    ellipsis: true,
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    ellipsis: true,
  },
  {
    title: '限制购买数量',
    dataIndex: 'inventory',
    key: 'inventory',
    ellipsis: true,
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    ellipsis: true,
    customRender: function (text, record) {
      return record.status === 1 ? '上架' : '下架'
    }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: '200'
  },
];



export default {
  data () {
    return {
      columns,
    };
  },
  props: ["data", "page"],
  created () {
    // console.log(this.data)
  },
  methods: {
    changePage (e) {
      this.$emit('changePage', e)
    },
    editTable (data) {
      this.$emit('editTable', data)
    },
    deleteTable (data) {
      this.$emit('deleteTable', data)
    },
  }
};
</script>

<style scoped>
.ant-btn {
  margin: 0 5px;
}
</style>