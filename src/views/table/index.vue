<template>
  <!-- <div class="app-container">
    <el-table v-loading="listLoading"
              :data="list"
              element-loading-text="Loading"
              border
              fit
              highlight-current-row>
      <el-table-column align="center"
                       label="ID"
                       width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author"
                       width="110"
                       align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews"
                       width="110"
                       align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col"
                       label="Status"
                       width="110"
                       align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       prop="created_at"
                       label="Display_time"
                       width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div> -->
  <el-container>
    <el-table :data="tableData"
              style="width: 100%"
              max-height="600">
      <el-table-column fixed
                       prop="username"
                       label="用户名">
      </el-table-column>
      <el-table-column prop="specialities"
                       label="专业">
      </el-table-column>
      <el-table-column prop="grade"
                       label="年级">
      </el-table-column>
      <el-table-column prop="lab"
                       label="实验室">
      </el-table-column>
      <el-table-column prop="skills"
                       label="技能">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作">
        <template slot-scope="scope">
          <el-button @click.native.prevent="OnClickdeleteUser(scope.$index, scope.row)"
                     type="text"
                     size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script>
import { getUserList, deleteUser } from "@/api/user";

export default {
  filters: {
    // statusFilter(status) {
    //   const statusMap = {
    //     published: "success",
    //     draft: "gray",
    //     deleted: "danger"
    //   };
    //   return statusMap[status];
    // }
  },
  data() {
    return {
      // list: null,
      // listLoading: false
      tableData: []
    };
  },
  created() {
    // getUserList().then(res => {
    //   console.log(res, "user list ");
    // });
    this.getAllUserList();
  },
  methods: {
    /**
     * 点击删除按钮事件
     */
    OnClickdeleteUser(idx, data) {
      console.log(idx, data);
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteUser(data._id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    /**
     * 获取所有用户信息
     */
    async getAllUserList() {
      try {
        const res = await getUserList();
        if (res.data.code === 200) {
          this.tableData = res.data.result;
        }
        console.log(this.tableData);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * 删除所选用户  调用删除用户api
     * @param  { id }
     */
    async deleteUser(id) {
      try {
        const res = await deleteUser({ id });
        if (res.data.code === 200) {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getAllUserList();
        } else {
          this.$message({
            type: "info",
            message: "删除失败！"
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
