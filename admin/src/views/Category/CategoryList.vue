<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="250">
      </el-table-column>
      <el-table-column prop="parent.name" label="上级分类" width="250" >
      </el-table-column>
      <el-table-column prop="name" label="分类名称" >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="400">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="edit(scope.row._id)">编辑</el-button>
          <el-button type="primary" size="small" @click="deleteById(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import {
    SelectCategory,
    DeleteById
  } from "network/category"


  export default {
    name: "CategoryList",
    data() {
      return {
        items: []
      }
    },
    methods: {
      async fetch() {
        // 发送axios请求
        const items1 = await SelectCategory()
        this.items = items1.data
      },
      edit(_id){
        this.$router.push("/categories/edit/"+_id)
      },
      async deleteById(row){

        this.$confirm(`是否确定要删除分类？"${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          
          const res = await DeleteById(row._id)

           this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch()

        })


      }
    },
    created() {
      this.fetch()
    }
  }
</script>
<style scoped>

</style>