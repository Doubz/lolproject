<template>
  <div>
    <h1>{{CreateOrEdit}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id"
          :label="item.name" :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
  } from "network/category"


  export default {
    name: "CategoryEdit",
    data() {
      return {
        model: {},
        parents:[]
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


        this.$router.push("/categories/list")

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
      async fetchParents() {

        const res = await SelectCategory()
        this.parents = res.data
        
      }
    },
    created() {

      this.id && this.fetch()
      this.fetchParents()
      
    }
  }
</script>

<style scoped>


</style>