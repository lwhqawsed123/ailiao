<template>
  <!-- 主播列表 -->
  <div class="record">
    <div class="record-conter">
      <el-row :gutter="20" class="record-top" style="margin-left: 0px; margin-right: 0px;">
        <el-col :span="24">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <!-- <el-form-item label="注册日期：">
              <dateTimePicker
                v-if="formInline.date.startday"
                :date="formInline.date"
                @onSubmit="onSubmit"
              ></dateTimePicker>
            </el-form-item>-->
            <!-- <el-form-item label="用户状态：">
              <el-select
                @change="onSubmit"
                clearable
                v-model="formInline.status"
                placeholder="请选择"
                size="mini"
                style="width:85px"
              >
                <el-option
                  v-for="(item,index) in liveingStateOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>-->
             <el-form-item label="公会：">
              <group-select :formInline="formInline" @onSubmit="onSubmit"></group-select>
            </el-form-item>
            <el-form-item label="审核状态：">
              <el-select
                @change="onSubmit"
                clearable
                v-model="formInline.gstatus"
                placeholder="请选择"
                size="mini"
                style="width:85px"
              >
                <el-option
                  v-for="(item,index) in gstatusOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="性别：">
              <el-select
                @change="onSubmit"
                clearable
                v-model="formInline.gender"
                placeholder="请选择"
                style="width:85px"
                size="mini"
              >
                <el-option
                  v-for="(item,index) in gengerOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备：">
              <el-select
                @change="onSubmit"
                clearable
                v-model="formInline.platform"
                placeholder="请选择"
                style="width:100px"
                size="mini"
              >
                <el-option
                  v-for="(item,index) in platformOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="手机：">
              <el-input
                v-model.trim="formInline.mobile"
                @keyup.enter.native="onSubmit"
                @clear="onSubmit"
                placeholder="请输入"
                clearable
                size="mini"
                maxlength="20"
              ></el-input>
            </el-form-item>

            <el-form-item label="昵称：">
              <el-input
                v-model.trim="formInline.nickname"
                @keyup.enter.native="onSubmit"
                @clear="onSubmit"
                placeholder="请输入昵称关键字"
                style="width:145px"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>

            <el-form-item label="用户ID：">
              <el-input
                v-model.trim="formInline.userid"
                @keyup.enter.native="onSubmit"
                @clear="onSubmit"
                placeholder="请输入用户id"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="短ID：">
              <el-input
                v-model.trim="formInline.username"
                @keyup.enter.native="onSubmit"
                @clear="onSubmit"
                placeholder="请输入短id"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="渠道号：">
              <el-input
                v-model.trim="formInline.channel"
                @keyup.enter.native="onSubmit"
                @clear="onSubmit"
                placeholder="请输入渠道号"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="mini">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                type="success"
                icon="el-icon-circle-plus"
                plain
                @click="bind.bindDialog=true"
                size="mini"
              >绑定主播</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <my-table
        :tableData="tableData"
        :formInline="formInline"
        :totalNum="totalNum"
        :ext_stat="ext_stat"
        :row-key="'id'"
        @getOnlineList="getOnlineList"
        :noPrev="true"
      >
        <!-- <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        row-key="proprId"
        @sort-change="sortChange"
        stripe
        >-->
        <el-table-column type="index" min-width="50px" label="编号"></el-table-column>
        <el-table-column prop="group_name" label="公会" min-width="50px"></el-table-column>
        <!-- 用户信息 -->
        <el-table-column label="头像" min-width="50px">
       
          <template slot-scope="scope">
            <!-- <el-popover placement="right" trigger="click" @show="getAnchorDetail(scope.row.userid)" @hide="anchorDetailLoading=false">
              <anchor-message :anchorDetail="anchorDetail" :loading="anchorDetailLoading"></anchor-message>
              <div class="anchor-info cursor" slot="reference">
                <div class="profile-box">
                  <img :src="scope.row.avatar" alt class="profile" />
                </div>
                <br v-if="scope.row.status==='3'||scope.row.status==='2'" />
                <span style="color:#f56c6c" v-if="scope.row.status==='3'">禁言</span>
                <span style="color:#f56c6c" v-else-if="scope.row.status==='2'">封号</span>
              </div>
            </el-popover> -->
            <info-popover v-if="scope.row.userid" :userid="scope.row.userid" :avatar="scope.row.avatar" :status="scope.row.status"></info-popover>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip min-width="120px" label="昵称/ID">
          <template slot-scope="scope">
            <span class="visitor-info-name" title="用户昵称">{{scope.row.nickname}}</span>
            <br />
            <span
              class="gender-men"
              :class="scope.row.gender==='1'?'':'gender-women'"
            >{{scope.row.age}}</span>
            <span
              class="el-icon-video-camera-solid verify_status"
              title="视频认证"
              v-if="scope.row.verify_status==='1'"
            ></span>
            <span title="短ID">{{scope.row.username}}</span>
            <br />
            <span title="用户ID">{{scope.row.userid}}</span>
          </template>
        </el-table-column>
        <!-- 用户信息结束 -->
        <el-table-column show-overflow-tooltip prop="memo" label="备注" min-width="60px"></el-table-column>
        <!-- <el-table-column prop="group_name" label="公会" show-overflow-tooltip></el-table-column> -->
        <!-- <el-table-column prop="platform" label="平台" min-width="80px" show-overflow-tooltip></el-table-column> -->
        <!-- 主播星级 -->
        <el-table-column label="星级" min-width="60px">
          <template slot-scope="scope">
            <!-- 设置星级 -->
            <!-- <el-dropdown
              trigger="click"
              @command="command=>{handleCommand(command,scope.row.userid)}"
            >
              <el-tag>
                {{myFilter(scope.row.nice,starOptions)}}
                <span
                  class="el-icon-arrow-down"
                ></span>
              </el-tag>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item,index) in starOptions"
                  :key="index"
                  :command="item.value"
                >{{item.label}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
             <el-tag>
                {{myFilter(scope.row.nice,starOptions)}}
              </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          sortable="custom"
          min-width="65px"
          prop="registertime"
          label="注册时间"
        >
          <template slot-scope="scope">{{parseTime(scope.row.registertime)}}</template>
        </el-table-column>

        <el-table-column
          sortable="custom"
          min-width="65px"
          prop="lastlogintime"
          label="最近登陆"
        >
          <template slot-scope="scope">{{parseTime(scope.row.lastlogintime)}}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip sortable="custom" prop="jifen_now" label="当前收益" min-width="65px">
          <!-- <template slot="header">
            <span>当前收益</span>
            <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
              <i class="el-icon-question icon-color"></i>
            </el-tooltip>
          </template> -->
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          sortable="custom"
          prop="jifen_all"
          label="历史收益"
          min-width="65px"
        >
          <!-- <template slot="header">
            <span>历史收益</span>
            <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
              <i class="el-icon-question icon-color"></i>
            </el-tooltip>
          </template> -->
        </el-table-column>
        <el-table-column label="通话记录" min-width="80px">
          <!-- <template slot="header">
            <span>通话记录</span>
            <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
              <i class="el-icon-question icon-color"></i>
            </el-tooltip>
          </template> -->
          <template slot-scope="scope">
            <a
              href="javascript:;"
              style="margin-right:3px; color: rgb(24, 144, 255);"
              @click="toCallRecords(scope.row)"
            >查看</a>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" min-width="80px">
          <template slot-scope="scope">
            <span v-if="scope.row.group_status ==='2'" style="color:#66b1ff">待审核</span>
            <span v-else-if="scope.row.group_status ==='0'" style="color:#f56c6c">未通过</span>
            <span v-else-if="scope.row.group_status ==='1'" style="color:#67c23a">已通过</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="160px">
          <template slot="header">
            <span>操作</span>
            <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
              <i class="el-icon-question icon-color"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-button
              icon="el-icon-chat-line-round"
              size="mini"
              title="聊天记录"
              @click="openChattingRecords(scope.row)"
              style="margin-bottom:5px"
            ></el-button>
            <el-button
              icon="el-icon-sell"
              size="mini"
              title="备注修改"
              @click="openMymember(scope.row.userid)"
              style="margin-bottom:5px"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-remove"
              plain
              @click="removeBind(scope.row)"
              size="mini"
            >解绑</el-button>
          </template>
        </el-table-column>
        <!-- </el-table> -->
      </my-table>
      <!-- <my-pagination
        v-show="totalNum>0"
        :total="totalNum"
        :page.sync="formInline.pageNum"
        :limit.sync="formInline.pageSize"
        :ext_stat="ext_stat"
        @pagination="getOnlineList"
      />-->
    </div>
    <!-- 用户详情组件 -->
    <detail v-if="userDetail.userid" :userDetail="userDetail"></detail>

    <!-- 绑定主播 -->
    <el-dialog
      @close="resetForm('bindForm')"
      id="bind-dialog"
      title="绑定主播到公会"
      :visible.sync="bind.bindDialog"
      width="500px"
      custom-class="common-dialog"
    >
      <el-form
        :rules="bind.rules"
        :model="bind.bindForm"
        label-width="80px"
        label-position="right"
        ref="bindForm"
        :close-on-click-modal="false"
      >
        <el-form-item label="主播手机" prop="mobile">
          <el-input v-model="bind.bindForm.mobile" maxlength="11" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-row>
            <el-col :span="10" style="margin-right:10px">
              <el-input v-model="bind.bindForm.code" maxlength="10" placeholder="请输入验证码"></el-input>
            </el-col>

            <el-col :span="10">
              <el-button
                type="success"
                style="width:100%"
                :disabled="bind.time!==0"
                @click="getCode('bindForm')"
              >
                <span>获取手机验证码</span>
                <span v-if="bind.time">{{bind.time}}s</span>
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="owner-dialog-footer">
        <el-button @click="resetForm('bindForm')">取消</el-button>
        <el-button type="primary" @click="submitForm('bindForm')">确定</el-button>
      </div>
    </el-dialog>
    <!-- 聊天记录弹框 -->
    <chattingRecords v-if="chattingData.userid" :chattingData="chattingData"></chattingRecords>
    <mymember v-if="mymemberData.id" :mymemberData="mymemberData" @getOnlineList="getOnlineList"></mymember>
  </div>
</template>

<script>
import {
  gengerOptions,
  platformOptions,
  liveingStateOptions,
  gstatusOptions,
} from "@/utils/options/common.js";
import { starOptions } from "@/utils/options/videoVerify.js";
import {
  list,
  get_user_by_id,
  channel,
  get_verifycode,
  bind_to_union,
  unbind,
  get_anchor_by_id,
  updatemymember_nice,
} from "@/api/union/anchors/list.js";
// import chattingRecords from "./chattingRecords.vue";
import chattingRecords from "@/views/common_components/chattingRecords/chattingRecords.vue";
import mymember from "./mymember.vue";
import detail from "@/views/common_components/detail/detail.vue";
import anchorMessage from "@/views/common_components/anchorMessage/anchorMessage.vue";
import infoPopover from "@/views/common_components/infoPopover/infoPopover.vue";
// import xhrData from "./muck.json";
export default {
  components: {
    chattingRecords: chattingRecords,
    mymember,
    detail,
    anchorMessage,
    infoPopover
  },
  data() {
    return {
      gengerOptions, // 性别
      platformOptions, // 设备
      liveingStateOptions, // 直播状态
      gstatusOptions, // 审核状态
      starOptions, // 星级
      // 总条数
      totalNum: 0,
      ext_stat: "",
      groupid: "",
      // 查询数据
      formInline: {
        groupid: this.$store.state.user.groupInfo.id,
        // groupid: "10",
        // date: {
        //   startday: "",
        //   endday: "",
        // }, // 日期
        status: "", // 状态
        mobile: "", // 手机号
        platform: "", // 设备
        nickname: "", // 昵称
        userid: "", // 用户id
        gender: "", // 性别
        username: "", // 短ID
        channel: "", // 渠道号
        gstatus: "",

        // // 排序列
        // orderByColumn: "id",
        // // 排序方式
        // isAsc: "desc",
        // 开始时间
        startday: "",
        //结束时间
        endday: "",
        // 当前显示条数
        pageSize: 20,
        // 当前显示页数
        pageNum: 1,
        offset: 0,
      },
      // 日期禁用项 禁用大于结束日期
      startOptions: {
        disabledDate: false,
      },
      // 日期禁用项 禁用小于开始日期
      endOptions: {
        disabledDate: false,
      },
      // 表格数据
      tableData: [],
      // 渠道包下拉框
      channelOptions: [],
      // 变更申请 对话框
      dialogVisible: false,
      // 主播绑定到公会
      bind: {
        // 短信计时
        time: 0,
        bindDialog: false,
        // ======绑定到主播=========
        bindForm: {
          groupid: "",
          mobile: "",
          code: "",
        },
        // 表单验证
        rules: {
          // 电话
          mobile: [
            { required: true, message: "请输入手机号", trigger: "blur" },
            {
              // pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
              pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
              message: "手机号格式不对",
              trigger: "blur",
            },
          ],
          // 验证码
          code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        },
      },

      // ====用户详情弹框=====
      userDetail: {
        timestamp: "",
        userid: "",
      },
      // ====聊天记录=====
      chattingData: {
        timestamp: "",
        userid: "",
      },
      chattingUserId: "",
      // 主播id
      mymemberData: {},
      // 当前用户详细信息
      anchorDetail: {},
      // loading
      anchorDetailLoading:false
    };
  },
  created() {
    // 获取默认开始时间和结束时间
    // this.formInline.date.startday = this.getDateNow()[0];
    // this.formInline.date.endday = this.getDateNow()[1];
    // 调用 获取列表 方法
    this.getOnlineList();
  },
  methods: {
    // 查看
    toCallRecords(row) {
      this.$router.push({
        name: "union/callRecords",
        params: { username: row.username },
      });
    },
    onSubmit() {
      this.formInline.pageNum=1
      this.getOnlineList();
    },
    // 获取列表
    getOnlineList() {
      let data = JSON.parse(JSON.stringify(this.formInline));
      // data.startday = data.date.startday;
      // data.endday = data.date.endday;
      data.offset = (data.pageNum - 1) * data.pageSize;
      // delete data.date;
      list(data).then((xhrData) => {
        if (xhrData.code === 0) {
          this.tableData = xhrData.data.items;
          this.groupid = xhrData.data.groupid;
          this.totalNum = +xhrData.data.total_rows;
          this.ext_stat = xhrData.data.ext_stat;
        }
      });
    },
    // 获取渠道包列表
    getChannelList() {
      let data = {
        platform: "",
        version_proc_verifing: 0,
        client_name: "",
      };
      channel(data).then((xhrData) => {
        if (xhrData.code === 0) {
          this.channelOptions = xhrData.data.items;
        }
      });
    },
    // 筛选渠道包
    checkChannel(client_id) {
      let channelOptions = this.channelOptions.filter((item) => {
        return item.client_id === client_id;
      });
      if (channelOptions.length) {
        return channelOptions[0].client_name;
      } else {
        return "";
      }
    },
    //  打开查看用户信息
    openDetail(id) {
      this.userDetail.timestamp = new Date().getTime();
      this.userDetail.userid = id;
    },
    // 打开聊天记录弹框
    openChattingRecords(row) {
      this.chattingData.timestamp = new Date().getTime();
      this.chattingData.userid = row.userid;
      this.chattingData.username = row.username;
    },
    // 子组件关闭窗口
    // closeDialog(params) {
    //   this.chattingRecordsDialog = params;
    // },
    // ==========绑定主播============
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.bind.bindDialog = false;
    },
    // 获取短信验证码
    getCode(formName) {
      if (this.bind.time) {
        return false;
      }

      this.$refs[formName].validateField("mobile", (res) => {
        if (!res) {
          let data = {
            mobile: this.bind.bindForm.mobile,
          };
          get_verifycode(data).then((res) => {
            if (res.code === 0) {
              this.$message.success(res.info);
              this.bind.time = 30;
              this.bind.interval = setInterval(() => {
                if (this.bind.time > 0) {
                  this.bind.time--;
                } else {
                  clearInterval(this.bind.interval);
                }
              }, 1000);
            }
          });
        }
      });
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.bind.bindForm));
          if (
            !this.$store.state.user.groupInfo &&
            !this.$store.state.user.groupInfo.id
          ) {
            this.$message.error("当前登陆用户没有创建公会,请先创建公会!");
            return false;
          }
          data.groupid = this.$store.state.user.groupInfo.id;
          bind_to_union(data).then((res) => {
            if (res.code === 0) {
              this.$message.success(res.info);
              this.$refs[formName].resetFields();
              this.getOnlineList();
              this.bind.bindDialog = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    // 解绑主播
    removeBind(row) {
      this.$confirm("是否解绑该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let data = {
          groupid: this.$store.state.user.groupInfo.id,
          userid: row.userid,
        };
        unbind(data).then((res) => {
          if (res.code === 0) {
            this.$message.success(res.info);
            this.getOnlineList();
          }
        });
      }).catch(()=>{
        return false
      })
    },
    // 打开主播分成
    openMymember(id) {
      this.mymemberData = {
        timestamp: new Date().getTime(),
        id: id,
      };
    },
    // 设置当前主播的星级
    handleCommand(command, userid) {
      let data = {
        userid: userid,
        nice: command,
      };
      updatemymember_nice(data).then((res) => {
        if (res.code === 0) {
          this.$message.success(res.info);
          this.getOnlineList();
        }
      });
    },
    // 获取当前主播详细信息
    getAnchorDetail(id) {
      this.anchorDetailLoading=true
      get_anchor_by_id(id).then((res) => {
        if (res && res.code === 0) {
          this.anchorDetail = res.data;
          this.anchorDetailLoading=false
        }
      }).catch(err=>{
        this.anchorDetailLoading=false
      })
    },
    
    
  },
};
</script>
<style>
/* 修改对话框整体 */
.el-dialog {
  border-radius: 5px;
}
/* 修改对话框中间部分 */
.el-dialog__body {
  padding-bottom: 0;
}
/* 修改对话框头部 */
.el-dialog__header {
  background-color: #e6e8eb;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
/* 修改对话框底部 */
.el-dialog__footer {
  padding: 10px;
  background-color: #e6e8eb;
}
/* 修改对话框标题 */
.el-dialog__title {
  font-size: 20px;
  font-weight: bold;
}
</style>
<style lang="scss" scoped>
@import "@/assets/styles/scss/list.scss";
</style>
<style lang="scss">
.chattingRecords .el-dialog__header {
  display: none !important;
}
.chattingRecords .el-dialog__body {
  padding: 2px;
  box-sizing: border-box;
}
.record {
  // .el-date-editor--datetimerange.el-input__inner {
  //   width: 340px;
  // }
  .record-top {
    .el-form-item__label {
      padding: 0;
    }
  }
}
</style>