<template>
  <a-form-model
    class="login-form"
    ref="loginForm"
    :model="loginForm"
    :rules="rules"
    v-bind="layout"
  >
    <!-- 邮箱 -->
    <a-form-model-item
      has-feedback
      label="邮箱"
      prop="email"
    >
      <a-input
        v-model="loginForm.email"
        placeholder="Email"
      />
    </a-form-model-item>

    <!-- 密码 -->
    <a-form-model-item
      has-feedback
      label="密码"
      prop="password"
    >
      <a-input
        v-model="loginForm.password"
        type="password"
        autocomplete="off"
        placeholder="Password"
      />
    </a-form-model-item>
    <!-- button 按钮 -->
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button
        type="primary"
        @click="submitForm('loginForm')"
      >
        登录
      </a-button>
      <a-button
        style="margin-left: 10px"
        @click="resetForm('loginForm')"
      >
        注册
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import api from '../api/user'
export default {
  data () {
    /* 校验邮箱 */
    let emailReg = /\w+@\w+.com$/g;

    let checkEmail = (rule, value, callback) => {
      /* 邮箱输入框是否有值 */
      if (!value) {
        callback(new Error('请填写邮箱'));
      }
      /* 邮箱是否符合规格 */
      if (emailReg.test(value)) {
        return callback();/* 继续 */
      } else {
        console.log('email is not quality')
        // return callback(new Error('邮箱不符合规格'))
      }

    };
    /* 校验密码 */
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        password: '',
        email: ''
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'blur' }]
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm (formName) {
      /* 通过$refs可以知道指定的表单 */
      this.$refs[formName].validate(valid => {
        if (valid) {
          api.login(this.loginForm).then(res => {
            console.log(res)
            /* 存储用户信息 */
            this.$store.dispatch('setUserInfo', res)

            /* 跳转页面 */
            this.$router.push({
              name: 'Home'
            })
          }).catch(error => {
            this.$message.error(error)
          })
          return true;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less">
@import url("../assets/css/login.less");
</style>
