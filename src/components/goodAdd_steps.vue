<template>
  <div class="step-and-content">
    <!-- 步骤条 -->
    <a-steps
      :current="current"
      class="product-steps"
    >
      <a-step
        v-for="item in steps"
        :key="item.title"
        :title="item.title"
      />
    </a-steps>

    <!-- 内容区 -->
    <div class="steps-content">
      <!-- step1 -->
      <basic-info
        v-if="current === 0"
        @next="next"
        :form='form'
        :categoryList="categoryList"
        :categoryItems="categoryItems"
      />
      <!-- step2 -->
      <sale-info
        v-else
        @completed="completed"
        @prev="prev"
        :form='form'
      />
    </div>
  </div>
</template>

<script>
import basicInfo from '../components/goodAdd_Basiccontent.vue'
import saleInfo from '../components/goodAdd_Salecontent.vue'
import category from '../api/category'
import product from '../api/product'
export default {
  components: {
    basicInfo,
    saleInfo
  },
  data () {
    return {
      current: 0,
      steps: [
        {
          title: '填写商品计本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
      form: {
        title: '',
        desc: '',
        category: '',
        c_items: [],
        tags: [],
        price: null,
        price_off: null,
        unit: '',
        inventory: null,
        images: [],
        status: 0
      },
      categoryList: [],
      categoryItems: []
    };
  },
  async created () {
    const { id } = this.$route.params;
    await this.getCategotyList();

    if (id) {
      // console.log(this.$store.state.form)
      this.form = this.$store.state.form
      console.log(this.categoryList)
    }
    // this.form = this.$store.state.form.price ? this.$store.state.form : this.form;
  },
  methods: {
    getCategotyList () {
      category.list().then(res => {
        console.log(res)
        this.categoryList = res.data;
        this.categoryItems = this.form.category ? this.categoryList[this.form.category - 1].c_items : []
      })
    },
    next (baseform) {
      console.log(baseform)
      this.current++;
      this.form = {
        ...baseform,
        ...this.form
      }
    },
    prev () {
      this.current--;
    },
    completed (saleform) {

      if (this.$route.params.id) {
        product.edit({
          ...saleform
        }).then(res => {
          console.log(res)
          this.$message.success('修改成功')
          this.$router.push('/goodList')
        })
      } else {
        product.add({
          ...saleform
        }).then(res => {
          console.log(res)
          this.$message.success('添加成功')
          this.$router.push('/goodList')
        })
      }

      console.log(saleform)

      console.log(saleform)
    }
  },
};
</script>

<style scoped lang="less">
.step-and-content {
  .product-steps {
    width: 70%;
    margin: 20px auto;
  }
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }

  .steps-action {
    margin-top: 24px;
  }
}
</style>
