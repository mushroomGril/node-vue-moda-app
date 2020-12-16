<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "创建" }}管理员</h1>
    <!-- @submit.native.prevent阻止表单默认提交 -->
    <el-form label-width="80px" @submit.native.prevent="save">     
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {},    
    };
  },
  methods: {
    /**
     * 数据保存
     * 先判断id是否存在,如果存在则修改数据，
     * 如果不存在，则创建一条数据
     * 操作执行成功后跳转到list列表页面
     */
    async save() {
      if (this.id) {
        await this.$http.put(`rest/admin_users/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/admin_users", this.model);
      }
      this.$router.push("/admin_users/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    //通过ID找到对应表数据
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`);
      this.model = res.data;    
    },
    
  },
  created() {   
    this.id && this.fetch();
  },
};
</script>