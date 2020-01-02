<template>
  <div>
    <h1>{{CreateOrEdit}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">

      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
        <el-form-item label="密码">
        <el-input v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  // 网络请求封装好的函数
  import {
    CreateCategory,
    SelectOneCategory,
    UpdateOneCategory,
    SelectCategory
  } from "network/adminuser"


  export default {
    name: "AdminUserEdit",
    data() {
      return {
        model: {},
      }
    },
    props: {
      id: {
        type: String
      }
    },
    computed: {

      CreateOrEdit() {
        return this.id ? "编辑" : "新建"
      }

    },
    methods: {
      async save() {

        if (this.id) {
          // 保存修改
          const res = await UpdateOneCategory(this.id,this.model)
        } else {
          // 发起请求，这里使用axios请求，我们使用自己封装的api
          const res = await CreateCategory(this.model)
        }


        this.$router.push("/admin_users/list")

        // elementUI提供的提示框组件 可以直接使用
        this.$message({
          type: "success",
          message: "保存成功"
        })

      },
      async fetch() {

        const res = await SelectOneCategory(this.id)
        this.model = res.data
      }

    },
    created() {

      this.id && this.fetch()
      
    }
  }
</script>

<style scoped>


</style>