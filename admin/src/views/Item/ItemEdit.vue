<template>
  <div>
    <h1>{{this.id ? "编辑" : "新建"}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="物品名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload class="avatar-uploader" :action="'http://localhost:3000/admin/api' + '/upload'" :show-file-list="false"
              :headers="{Authorization:getAuth()}"
          :on-success="successUpload" >
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
  } from "network/item"


  export default {
    name: "CategoryEdit",
    data() {
      return {
        model: {}
      }
    },
    props: {
      id: {
        type: String
      }
    },
    methods: {
      async save() {

        if (this.id) {
          // 保存修改
          const res = await UpdateOneCategory(this.id, this.model)
        } else {
          // 发起请求，这里使用axios请求，我们使用自己封装的api
          const res = await CreateCategory(this.model)
        }


        this.$router.push("/items/list")

        // elementUI提供的提示框组件 可以直接使用
        this.$message({
          type: "success",
          message: "保存成功"
        })

      },
      async fetch() {

        const res = await SelectOneCategory(this.id)
        this.model = res.data
      },
      async successUpload(res){
        this.$set(this.model,"icon",res.url)
      }
    },
    created() {
      this.id && this.fetch()
    }
  }
</script>

<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>