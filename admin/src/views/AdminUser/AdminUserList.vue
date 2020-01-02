<template>
  <div>
    <h1>管理员列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="250">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="250" >
      </el-table-column>
      <el-table-column prop="password" label="密码" >
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
  } from "network/adminuser"


  export default {
    name: "AdminUserList",
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
        this.$router.push("/admin_users/edit/"+_id)
      },
      async deleteById(row){

        this.$confirm(`是否确定要删除管理员？"${row.username}"`, '提示', {
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