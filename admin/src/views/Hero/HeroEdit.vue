<template>
  <div>
    <h1>{{this.id ? "编辑" : "新建"}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">

      <el-tabs type="border-card" value="skills">
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="物品名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload class="avatar-uploader" :action="'http://localhost:3000/admin/api' + '/upload'"
              :show-file-list="false" :on-success="successUpload">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option v-for="item of categories" :label="item.name" :value="item._id" :key="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度评分">
            <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.difficult  "></el-rate>
          </el-form-item>
          <el-form-item label="技能评分">
            <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.skill"></el-rate>
          </el-form-item>
          <el-form-item label="攻击评分">
            <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存评分">
            <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.survive"></el-rate>
          </el-form-item>

          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item of items" :label="item.name" :value="item._id" :key="item._id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item of items" :label="item.name" :value="item._id" :key="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.batterTips"></el-input>
          </el-form-item>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button @click="model.skills.push({})"> <i class="el-icon-plus"></i> 添加技能</el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :span="12" v-for="(item,i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload class="avatar-uploader" :action="'http://localhost:3000/admin/api' + '/upload'"
                  :show-file-list="false" :on-success="res => $set(item,'icon',res.url)">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>
              <el-button type="danger" @click="model.skills.splice(i,1)">删除技能</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-form-item>
        <el-button class="saveButton" type="primary" native-type="submit">保存</el-button>
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
    fetchCategories,
    fetchItems
  } from "network/hero"


  export default {
    name: "HeroEdit",
    data() {
      return {
        categories: [],
        items: [],
        items2: [],
        model: {
          name: "",
          avatar: "",
          skills:[],
          scores: {
            difficult: 0
          }
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


        this.$router.push("/heros/list")

        // elementUI提供的提示框组件 可以直接使用
        this.$message({
          type: "success",
          message: "保存成功"
        })

      },
      async fetch() {

        const res = await SelectOneCategory(this.id)
        this.model = Object.assign({}, this.model, res.data)
        // this.model = res.data
      },
      async successUpload(res) {
        // this.$set(this.model,"avatar",res.url)
        this.model.avatar = res.url
      },
      async fetchCategories() {
        const res = await fetchCategories()

        this.categories = res.data
      },
      async fetchItems() {

        const res = await fetchItems()

        this.items = res.data
      }

    },
    created() {
      this.fetchCategories()
      this.fetchItems()
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
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .saveButton {
    margin-top: 2rem;
    float: right;
  }
</style>