<template>
  <div>
    <h1>{{CreateOrEdit}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item in filterCategory(categories)" :key="item._id" :label="item.name" :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    VueEditor
  } from "vue2-editor"
  // 网络请求封装好的函数
  import {
    CreateCategory,
    SelectOneCategory,
    UpdateOneCategory,
    SelectCategory,
    getCategoryData,
    UploadFile
  } from "network/article"


  export default {
    name: "CategoryEdit",
    components: {
      VueEditor
    },
    data() {
      return {
        model: {},
        categories: []
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
          const res = await UpdateOneCategory(this.id, this.model)
        } else {
          // 发起请求，这里使用axios请求，我们使用自己封装的api
          const res = await CreateCategory(this.model)
        }


        this.$router.push("/articles/list")

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
      async fetchCategories() {

        const res = await getCategoryData()
        this.categories = res.data

      },
      filterCategory(categories) {
        const res = categories.filter((item) => {
          return item.parent && item.parent.name === "新闻资讯"
        })
        return res

      },
      async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)

        var formData = new FormData();
        formData.append("file", file);

        const res = await UploadFile(formData)
        Editor.insertEmbed(cursorLocation, "image", res.data.url);
        resetUploader();

      }
    
  },
  created() {

    this.id && this.fetch()
    this.fetchCategories()

  }
  }
</script>

<style scoped>


</style>