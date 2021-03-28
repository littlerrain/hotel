<template>
    <div class>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-copy"></i> 待办事项管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`未解决代办事项(${unread.length})`" name="first">
                    <el-table :data="unread" :show-header="false" style="width: 100%">
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.title}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="masterTime" width="180"></el-table-column>
                        <el-table-column width="120">
                            <template slot-scope="scope">
                                <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="handle-row">
                        <el-button type="primary" @click="editVisible = true">新建待办事项</el-button>
                        <el-button type="primary" @click="deleteAllMaster1()">全部标为已读</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`已解决待办事项(${read.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="read" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger" @click="deleteAllMaster()">删除全部</el-button>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`回收站(${recycle.length})`" name="third">
                    <template v-if="message === 'third'">
                        <el-table :data="recycle" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button @click="handleRestore(scope.$index)">还原</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger" @click="deleteMaster()">清空回收站</el-button>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
            <el-dialog title="代办事项" :visible.sync="editVisible" width="30%">
                <el-form ref="form" :model="form" label-width="70px">
                    <el-date-picker v-model="form.masterTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
                    <el-form-item label="内容">
                        <el-input v-model="form.masterTitle"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="createMaster">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    name: 'tabs',
    data() {
        return {
            message: 'first',
            showHeader: false,
            unread: [],
            read: [],
            recycle: [],
            editVisible: false,
            form: {
                masterTime: null,
                masterTitle: null,
                masterType: 0,
                finishType: 0
            }
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            var _this = this;
            var userId = localStorage.getItem('ms_userid');
            this.$http.post('/selectMaster', { UserId: userId }).then(function(res) {
                console.log(res.data);
                res.data.forEach(element => {
                    element.masterTime = _this.renderTime(element.masterTime);
                    if (element.masterType == 0) {
                        element.title = '【个人通知】' + element.masterTitle;
                    }
                    if (element.masterType == 1) {
                        element.title = '【系统通知】' + element.masterTitle;
                    }
                    if (element.finishType == 0) {
                        _this.unread.push(element);
                    }
                    if (element.finishType == 1) {
                        _this.read.push(element);
                    }
                    if (element.finishType == 2) {
                        _this.recycle.push(element);
                    }
                });
            });
        },
        handleRead(index) {
            var _this = this;
            const item = this.unread.splice(index, 1);
            item[0].finishType = 1;
            this.read = item.concat(this.read);
            console.log(this.unread.length);
            bus.$emit('unread', this.unread.length);
            this.$http.post('/updateMaster', { finishType: item[0].finishType, masterId: item[0].masterId }).then(function(res) {});
        },
        handleDel(index) {
            const item = this.read.splice(index, 1);
            item[0].finishType = 2;
            this.recycle = item.concat(this.recycle);
            this.$http.post('/updateMaster', { finishType: item[0].finishType, masterId: item[0].masterId }).then(function(res) {});
        },
        handleRestore(index) {
            const item = this.recycle.splice(index, 1);
            item[0].finishType = 1;
            this.read = item.concat(this.read);
            this.$http.post('/updateMaster', { finishType: item[0].finishType, masterId: item[0].masterId }).then(function(res) {});
        },
        renderTime(date) {
            var dates = new Date(date).toJSON();
            return new Date(+new Date(dates) + 8 * 3600 * 1000)
                .toISOString()
                .replace(/T/g, ' ')
                .replace(/\.[\d]{3}Z/, '');
        },
        deleteMaster() {
            this.recycle = [];
            this.$http.post('/deleteMaster').then(function(res) {
                console.log(res);
            });
        },
        deleteAllMaster() {
            this.recycle = this.read.concat(this.recycle);
            this.read = [];
            this.$http.post('/updateAllMaster', { finishType1: 2, finishType2: 1 }).then(function(res) {
                console.log(res);
            });
        },
        deleteAllMaster1() {
            this.read = this.unread.concat(this.read);
            this.unread = [];
            this.$http.post('/updateAllMaster', { finishType1: 1, finishType2: 0 }).then(function(res) {
                console.log(res);
            });
        },
        createMaster() {
            var _this = this;
            var form = this.form;
            form.masterTime = this.renderTime(form.masterTime);
            form.userId = localStorage.getItem('ms_userid');
            console.log(this.form);
            this.$http.post('/createMaster', form).then(function(res) {
                console.log(res);
            });
            form.title = '【个人通知】' + form.masterTitle;
            this.unread.push(form);
            this.editVisible = false;
        }
    }
};
</script>

<style>
.message-title {
    cursor: pointer;
}
.handle-row {
    margin-top: 30px;
}
</style>

