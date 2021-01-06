<template>
  <div class="sale-info">
    <!--formmodel中ref：给当前的标签的组件起了一个名字，我们就可以通过这个名字拿取到我们这个组件了； -->
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <!-- 商品售价 -->
      <a-form-model-item
        ref="price"
        label="商品售价"
        prop="price"
        required
      >
        <a-input v-model="form.price" />
      </a-form-model-item>

      <!-- 商品折扣价 -->
      <a-form-model-item
        ref="price_off"
        label="商品折扣价"
        prop="price_off"
      >
        <a-input v-model="form.price_off" />
      </a-form-model-item>

      <!-- 商品库存 -->
      <a-form-model-item
        ref="inventory"
        label="商品库存"
        prop="inventory"
        required
      >
        <a-input v-model="form.inventory" />
      </a-form-model-item>

      <!-- 计量单位 -->
      <a-form-model-item
        ref="unit"
        label="计量单位"
        prop="unit"
        required
      >
        <a-input v-model="form.unit" />
      </a-form-model-item>

      <!-- 图片 -->
      <a-form-item
        label="图片相册"
        ref="images"
        prop="images"
      >
        <div class="clearfix">
          <a-upload
            :action="'https://mallapi.duyiedu.com/upload/images?appkey='+$store.state.user.appkey"
            list-type="picture-card"
            :file-list="fileList"
            @preview="handlePreview"
            @change="handleChange"
            name="avatar"
          >
            <div v-if="fileList.length < 8">
              <a-icon type="plus" />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
          <a-modal
            :visible="previewVisible"
            :footer="null"
            @cancel="handleCancel"
          >
            <img
              alt="example"
              style="width: 100%"
              :src="previewImage"
            />
          </a-modal>
        </div>
      </a-form-item>

      <!-- 是否上架 -->
      <a-form-item :label="null">
        <a-checkbox
          :checked="form.status === 0 ? false : true"
          class="radiobox"
          @change="changeStatus"
        >
          是否上架
        </a-checkbox>
      </a-form-item>

      <!-- 下一步 || 完成 -->
      <a-form-model-item :wrapper-col="{ span: 10, offset: 4 }">
        <a-button
          class="btn-mr"
          type="primary"
          @click="prev"
        >
          上一步
        </a-button>
        <a-button
          class="btn-mr"
          type="primary"
          @click="completed"
        >
          完成
        </a-button>

      </a-form-model-item>

    </a-form-model>
  </div>
</template>
<script>
function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  props: ['form'],
  data () {
    return {
      post: 'post',
      labelCol: { span: 4 },
      wrapperCol: { span: 10 },
      other: '',
      categoryList: [],
      rules: {},
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  },
  created () {
    if (this.form.images.length > 0) {
      this.fileList = this.form.images.map((ele, index) => {
        return {
          uid: index,
          name: `image${index}.png`,
          status: 'done',
          url: ele
        }
      })
    }
  },
  methods: {
    changeStatus () {
      this.form.status = this.form.status ? 0 : 1;
    },
    prev () {
      this.$emit('prev')
    },
    completed () {
      this.$refs.ruleForm.validate((valid, obj) => {
        if (valid) {
          this.$emit('completed', this.form)
          return true
        } else {
          return true;
        }
      });
      console.log('完成')
    },
    handleCancel () {
      this.previewVisible = false;
    },
    async handlePreview (file) {
      console.log(file)
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      console.log(file.url)
      this.previewImage = file.url || file.preview;
      // this.form.images.push(file.url)
      this.previewVisible = true;
    },
    handleChange ({ fileList, file }) {
      this.fileList = fileList;
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url)
        console.log(this.form)
      } else if (file.status === 'removed') {
        console.log('remove')
        this.form.images = this.form.images.filter(ele => ele !== file.response.data.url)
        console.log(this.form)
      }

    },
  },
};
</script>

<style scoped>
.ant-row {
  margin-left: 20%;
}
.btn-mr {
  margin: 0 10px;
}
.radiobox {
  margin-left: 70%;
}
</style>
