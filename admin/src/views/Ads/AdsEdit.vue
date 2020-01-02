<template>
  <div>
    <h1>{{this.id ? "编辑" : "新建"}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-row style="margin-left:120px; margin-bottom:100px;">
      <el-button type="success" @click="model.items.push({})"> <i class="el-icon-plus"></i> 添加广告</el-button>
      </el-row>
      <el-row type="flex" style="flex-wrap:wrap">
        <el-col :span="12" v-for="(item,i) in model.items" :key="i">
          <el-form-item label="URL">
            <el-input v-model="item.url"></el-input>
          </el-form-item>
          <el-form-item label="广告图">
            <el-upload class="avatar-uploader" :action="'http://localhost:3000/admin/api' + '/upload'"
              :show-file-list="false" :on-success="res => $set(item,'image',res.url)">
              <img v-if="item.image" :src="item.image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-button type="danger" @click="model.items.splice(i,1)">删除广告</el-button>
          </el-form-item>

        </el-col>
      </el-row>

      <!-- <el-form-item label="图标">
        <el-upload class="avatar-uploader" :action="'http://localhost:3000/admin/api' + '/upload'"
          :show-file-list="false" :on-success="successUpload">
          <img v-if="model.items.image" :src="model.items.image" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item> -->
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
  } from "network/ads"


  export default {
    name: "AdsEdit",
    data() {
      return {
        model: {
          items: []
        }
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


        this.$router.push("/ads/list")

        // elementUI提供的提示框组件 可以直接使用
        this.$message({
          type: "success",
          message: "保存成功"
        })

      },
      async fetch() {

        const res = await SelectOneCategory(this.id)
        console.log(res)
        this.model = Object.assign({}, this.model, res.data)
      },
      async successUpload(res) {
        this.$set(this.model, "icon", res.url)
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
    min-width: 10rem;
    height: 10rem;
    line-height: 10rem;
    text-align: center;
  }

  .avatar {
    min-width: 10rem;
    height: 10rem;
    display: block;
  }
</style>