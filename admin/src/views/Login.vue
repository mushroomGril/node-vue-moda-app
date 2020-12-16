<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <!--prevent 阻止表单默认提交跳转页面 -->
      <el-form ref="form" @submit.native.prevent="login" label-width="80px">
        <el-form-item label="用户名">
          <el-input
            v-model="model.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="model.password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      localStorage.token = res.data.token;//把token保存在本地      
      this.$router.push('/')
      this.$message({type:'success',message:"登录成功"})
      
    },
  },
};
</script>
<style scoped>
.login-card {
  width: 25rem;
  margin: 5rem auto;
}
</style>