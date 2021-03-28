<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-copy"></i> 房间管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
                    <div class="handle-box">
                        <el-button
                            type="primary"
                            icon="el-icon-delete"
                            class="handle-del mr10"
                            @click="delAllSelection"
                        >批量停用</el-button>
                        <el-input v-model="query.id" placeholder="房间号" class="handle-input mr10"></el-input>
                        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                    </div>
                    <el-table
                        :data="roomData"
                        border
                        class="table"
                        ref="multipleTable"
                        header-cell-class-name="table-header"
                        @selection-change="handleSelectionChange"
                    >
                        <el-table-column type="selection" width="55" align="center"></el-table-column>
                        <el-table-column prop="RoomId" label="ID" width="55" align="center"></el-table-column>
                        <el-table-column prop="RoomNum" label="房间号"></el-table-column>
                        <el-table-column label="房间状态" align="center" prop="Static">
                            <template slot-scope="{row: {Static}}">
                                <span v-show="+Static === 0">空房间</span>
                                <span v-show="+Static === 1">已预订</span>
                                <span v-show="+Static === 2">已入住</span>
                                <span v-show="+Static === 3">已停用</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="RoomType" label="房间类型"></el-table-column>
                        <el-table-column label="操作" width="180" align="center">
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    icon="el-icon-edit"
                                    @click="handleEdit(scope.$index, scope.row)"
                                >编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination
                            background
                            layout="total, prev, pager, next"
                            :current-page="query.pageIndex"
                            :page-size="query.pageSize"
                            :total="pageTotal"
                            @current-change="handlePageChange"
                        ></el-pagination>
                    </div>
            <!-- 编辑弹出框 -->
            <el-dialog title="房间信息" :visible.sync="editVisible" width="30%">
                <el-form ref="form" :model="form" label-width="70px">
                    <el-form-item label="房间状态">
                        <el-select v-model="form.StaticShow" placeholder="请选择">
                            <el-option
                                v-for="(item,index) in staticData"
                                :key="index"
                                :label="item"
                                :value="item"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="房间类型">
                        <el-input v-model="form.RoomType"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </el-dialog>
        </div>
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
                id: '',
                pageIndex: 1,
                pageSize: 10
            },
            staticData: ['空房间', '已预订', '已入住', '已停用'],
            roomData: [],
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            var _this = this;
            this.$http.post('/selectSomeRoom', { RoomNum: this.query.id }).then(function(res) {
                _this.roomData = res.data.slice((_this.query.pageIndex - 1) * 10, _this.query.pageIndex * 10);//封装之后得加两个data不封装，删除其中一个就可以
                _this.pageTotal = res.data.length;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.query.pageIndex = 1;
            this.getData();
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
                //从数据库中修改对应的字段
                let params = {
                    RoomId: this.multipleSelection[i].RoomId,
                    RoomType: this.multipleSelection[i].RoomType,
                    Static: 3
                };
                this.$http.post('/updateRoom', params).then(function(res) {
                    console.log(res);
                    _this.getData();
                });
                //this.userData.splice(i, 1);
                str += this.multipleSelection[i].UserName + ' ';
            }
            this.query.pageIndex = 1;
            this.multipleSelection = [];
            this.$message.error(`停用了${str}`);
        },
        // 编辑操作
        handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.form.StaticShow = this.staticData[this.form.Static];
                this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改 ${this.form.RoomNum} 房间成功`);
            this.form.Static = this.staticData.indexOf(this.form.StaticShow);
            console.log(this.form);
            this.$http.post('/updateRoom', this.form).then(function(res) {
                console.log(res);
            });
            this.getData();
        },
        // 分页导航
        handlePageChange(val) {
            this.query.pageIndex = val;
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
