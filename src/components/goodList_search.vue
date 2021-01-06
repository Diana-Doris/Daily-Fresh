<template>
  <div class="search-box">
    <a-form-model
      layout="inline"
      :model="searchForm"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-form-model-item label="检索关键字">
        <a-input
          v-model="searchForm.searchWord"
          placeholder="请输入关键字"
        >
        </a-input>
      </a-form-model-item>

      <a-form-model-item label="商品类目">
        <a-select
          show-search
          placeholder="请选择一个商品类目"
          style="width: 200px"
          @change="handleChange"
          allowClear
        >
          <a-select-option
            v-for=" li in cateGoryList"
            :key="li.id"
            :value="li.id"
          >
            {{ li.name }}
          </a-select-option>

        </a-select>
      </a-form-model-item>

      <a-form-model-item>
        <a-button
          type="primary"
          html-type="submit"
        >
          Search
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>


export default {
  props: ["cateGoryList"],
  data () {
    return {
      searchForm: {
        searchWord: '',
        category: ''
      },
    };
  },
  methods: {
    /* 提交表单 */
    handleSubmit () {
      this.$emit('submit', this.searchForm)
    },
    /* 切换类目时 */
    handleChange (val) {
      console.log(val);
      this.searchForm.category = val;
    },
  },
};
</script>

<style scoped lang='less'>
.search-box {
  padding: 10px 30px;
}
</style>
