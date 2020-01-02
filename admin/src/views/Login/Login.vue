<template>
  <div class="login_container">
    <el-card class="box-card">
      <div slot="header">
        <span>请先登录</span>
      </div>
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password"></el-input>
        </el-form-item>
        <el-button type="primary" native-type="submit">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {login} from "network/login"

export default {
  name:"login",
  data(){
    return {
      model:{}
    }
  },
  methods:{
    async login(){
      const res = await login(this.model)

      // 看需求
      // 浏览器关闭则清除
      // sessionStorage.token = res.data.token

      // 保留在本地，浏览器关闭后还存在
      localStorage.token = res.data.token

      this.$router.push("/")
      this.$message({
        type:"success",
        message:"成功"
      })

    } 
  }
}
</script>

<style scoped>
  .box-card{
    width: 35rem;
    margin: 6rem auto;
  }
</style>