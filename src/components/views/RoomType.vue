<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-copy"></i> 房间类型管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
                    <div class="handle-box">
                        <el-table
                            :data="roomTypeData"
                            border
                            class="table"
                            ref="multipleTable1"
                            header-cell-class-name="table-header"
                        >
                            <el-table-column prop="RoomTypeId" label="ID" width="55" align="center"></el-table-column>
                            <el-table-column prop="RoomType" label="房间类型"></el-table-column>
                            <el-table-column prop="Area" label="房间面积"></el-table-column>
                            <el-table-column label="房间床位" align="center" prop="Bed">
                                <template slot-scope="{row: {Bed}}">
                                    <span v-if="+Bed === 1">大床</span>
                                    <span v-else>普通床</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="Price" label="房间价格"></el-table-column>
                            <el-table-column label="有无宽带" align="center" prop="Broadband">
                                <template slot-scope="{row: {Broadband}}">
                                    <span v-if="+Broadband === 1">有宽带</span>
                                    <span v-else>无宽带</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="Remark" label="备注"></el-table-column>
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
                    </div>
            <!-- 编辑弹出框 -->
            <el-dialog title="房间类型信息" :visible.sync="editVisible" width="30%">
                <el-form ref="form" :model="form" label-width="70px">
                    <el-form-item label="面积">
                        <el-input v-model="form.Area"></el-input>
                    </el-form-item>
                    <el-form-item label="床类型">
                        <el-radio v-model="form.Bed" :label="0">普通床</el-radio>
                        <el-radio v-model="form.Bed" :label="1">大床</el-radio>
                    </el-form-item>
                    <el-form-item label="价格">
                        <el-input v-model="form.Price"></el-input>
                    </el-form-item>
                    <el-form-item label="有无宽带">
                        <el-radio v-model="form.Broadband" label="0">无</el-radio>
                        <el-radio v-model="form.Broadband" label="1">有</el-radio>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="form.Remark"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit1">确 定</el-button>
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
            editVisible: false,
            form: {},
            idx: -1,
            id: -1,
            roomTypeData: []
        };
    },
    created() {
        this.getRoomTypeData();
    },
    methods: {
        getRoomTypeData() {
            var _this = this;
            this.$http.post('/selectRoomType').then(function(res) {
                console.log(res.data);
                _this.roomTypeData = res.data;
            });
        },
        // 编辑操作
        handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible = true;
        },
        // 保存编辑
        saveEdit1() {
            this.editVisible = false;
            this.$message.success(`修改 ${this.form.RoomType} 信息成功`);
            console.log(this.form)
            this.$http.post('/updateRoomType', this.form).then(function(res) {
                console.log(res);
            });
            this.getRoomTypeData();
        },
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
