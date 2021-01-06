<template>
  <div class="product-list">
    <!-- 搜索 -->
    <search-inp
      @submit="searchSubmit"
      :cateGoryList="cateGoryList"
    />
    <!-- 添加商品 -->
    <div class="addGoods">
      <router-link :to="{name: 'goodAdd'}">
        <a-button>添加商品</a-button>
      </router-link>

    </div>
    <!-- 表格 -->
    <table-show
      :data="tableData"
      :page="pagination"
      @changePage="changeTablePage"
      :cateGoryList="cateGoryList"
      @editTable="editTable"
      @deleteTable="deleteTable"
    />
    <router-view></router-view>
  </div>
</template>

<script>
import searchInp from '@/components/goodList_search.vue'
import tableShow from '@/components/goodList_table.vue'
import product from '@/api/product.js'
import category from '@/api/category.js'

export default {
  components: {
    searchInp,
    tableShow
  },
  methods: {
    /* 获取搜索的信息 */
    searchSubmit (form) {
      this.searchForm = form;
      console.log(form)
      this.getProductList()

    },
    /* 随着页码改变，更换pagination的信息 */
    changeTablePage (page) {
      this.pagination = page
      // console.log(this.pagination)
      this.getProductList()
    },
    /* 获取每页的data */
    getProductList () {
      // console.log(this.searchForm)
      product.list({
        params: {
          page: this.pagination.current,
          size: this.pagination.pageSize,
          ...this.searchForm,
        }
      }).then(res => {
        // console.log(res)
        this.pagination.total = res.total
        this.tableData = res.data.map(ele => {
          return {
            ...ele,
            key: ele.id,
            categoryName: this.cateListObj[ele.category]
          }
        })
      })
    },
    /* 获取类目 */
    getCategoryList () {
      category.list().then(res => {
        // console.log(res)
        this.cateGoryList = res.data;
        res.data.forEach(item => {
          this.cateListObj[item.id] = item.name
        })
      })
    },
    /* 编辑 */
    editTable (data) {
      this.$router.push({
        // name: "goodListEdit",
        name: "goodAdd",
        params: {
          id: data.id
        }
      });
      this.$store.state.form = {
        ...data
      }
    },
    /* 删除 */
    deleteTable (data) {
      this.$confirm({
        title: '确认删除商品',
        content: '' + data.title + "?",
        onOk: () => {
          product.del(data.id).then((res) => {
            this.getProductList()
          })
        },
        onCancel () { },
      });
    },
  },
  data () {
    return {
      tableData: [],
      searchForm: {},
      pagination: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1
      },
      cateGoryList: [],
      cateListObj: []
    }
  },
  async created () {
    await this.getCategoryList();
    this.getProductList();

  },

}
</script>

<style lang="less" scope>
.product-list {
  position: relative;
  .addGoods {
    position: absolute;
    right: 20px;
    top: 0;
    height: 60px;
    line-height: 60px;
  }
}
</style>