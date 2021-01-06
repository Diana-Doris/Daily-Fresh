<template>
  <div class="basic-info">
    <!--formmodel中ref：给当前的标签的组件起了一个名字，我们就可以通过这个名字拿取到我们这个组件了； -->
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <!-- 副标题 -->
      <a-form-model-item
        ref="title"
        label="副标题"
        prop="title"
        required
      >
        <a-input v-model="form.title" />
      </a-form-model-item>

      <!-- 商品描述 -->
      <a-form-model-item
        label="商品描述"
        prop="desc"
      >
        <a-input
          v-model="form.desc"
          type="textarea"
        />
      </a-form-model-item>

      <!-- 商品类目 -->
      <a-form-model-item
        label="商品类目"
        prop="category"
        required
      >
        <!-- 类目 -->
        <a-select
          v-model="form.category"
          placeholder="请选择商品类别"
        >
          <a-select-option
            :value="item.id"
            v-for="item in categoryList"
            :key="item.id"
          >
            {{ item.name }}
          </a-select-option>

        </a-select>
        <!-- 子类目 -->
        <a-select
          v-model="form.c_item"
          placeholder="请添加子类目"
        >
          <a-select-option
            v-for="c_item in categoryItems"
            :key="c_item"
            :value="c_item"
          >
            {{ c_item }}
          </a-select-option>
        </a-select>

      </a-form-model-item>

      <!-- 商品标签 -->
      <a-form-model-item
        ref="name"
        label="商品标签"
        prop="tags"
        required
      >
        <a-select
          mode="tags"
          v-model="form.tags"
          :default-value="['包邮,最晚次日到达~']"
          placeholder="请添加标签"
        >
          <a-select-option value="包邮,最晚次日到达~">
            包邮,最晚次日到达~
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <!-- 下一步 -->
      <a-form-model-item :wrapper-col="{ span: 10, offset: 4 }">
        <a-button
          type="primary"
          @click="onSubmit"
        >
          下一步
        </a-button>

      </a-form-model-item>

    </a-form-model>
  </div>
</template>
<script>
export default {
  props: ['form', 'categoryList', 'categoryItems'],
  created () {

    /* await category.list().then(res => {
      console.log(res)
      this.categoryList = res.data;
      this.categoryItems = this.categoryList[this.form.category - 1].c_items
    }) */
    console.log('kaishi', this.categoryList)
  },
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 10 },
      other: '',
      rules: {},
    };
  },

  methods: {
    onSubmit (e) {
      this.$refs.ruleForm.validate((valid, obj) => {

        if (valid) {
          this.$emit('next', this.form)
          return true
        } else {
          return true;
        }
      });
    },
  },
};
</script>

<style scoped>
.ant-row {
  margin-left: 200px;
}
</style>
