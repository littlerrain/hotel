<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 用户管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
        <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table :data="userData" border class="table" ref="multipleTable" header-cell-class-name="table-header" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="UserId" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="UserName" label="用户名"></el-table-column>
        <el-table-column label="性别" align="center" prop="Sex">
          <template slot-scope="{row: {Sex}}">
            <span v-if="+Sex === 1">男</span>
            <span v-else>女</span>
          </template>
        </el-table-column>
        <el-table-column prop="UserTel" label="手机号码"></el-table-column>
        <el-table-column prop="Password" label="密码"></el-table-column>
        <el-table-column prop="UserDocType" label="证件类型"></el-table-column>
        <el-table-column prop="UserDocId" label="证件号"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex" :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.UserName"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="form.UserTel"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.Password"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-input v-model="form.UserDocType"></el-input>
        </el-form-item>
        <el-form-item label="证件号">
          <el-input v-model="form.UserDocId"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchData, SelectUserData } from '../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            userData: [],
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            var _this = this;
            this.$http.post('/selectSomeUser',{UserName:this.query.name}).then(function(res) {
                console.log(res.data);
                _this.userData = res.data;
                _this.pageTotal = res.data.length;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    var param = this.userData.splice(index, 1);
                    console.log(param)
                    this.$http.post('/deleteUser', param[0]).then(function(res) {
                        console.log(res);
                    });
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            var _this = this;
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                //从数据库中删除对应的列
                this.$http.post('/deleteUser', this.multipleSelection[i]).then(function(res) {
                    console.log(res);
                    _this.getData();
                });
                //this.userData.splice(i, 1);
                str += this.multipleSelection[i].UserName + ' ';
            }

            this.multipleSelection = [];
            this.$message.error(`删除了${str}`);
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            console.log(this.form);
            this.$http.post('/updateUser', this.form).then(function(res) {
                console.log(res);
            });
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
