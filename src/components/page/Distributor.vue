<template>
  <div class="home">

    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-select v-model="searchFrom.userId" clearable filterable placeholder="请选择">
          <el-option v-for="(label, value) in dropData" :key="value" :label="label" :value="value"></el-option>
        </el-select>
          <!-- <el-input type="text" v-model="searchFrom.name" clearable placeholder="请输入用户名"></el-input> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="search(1)">搜索</el-button>
        <el-button type="primary" size="medium" plain @click="clearSearchForm()">清空搜索</el-button>
        <el-button type="primary" size="medium" @click="exportDataA()" plain>导出</el-button>
        <el-button type="primary" @click="addialogVisible" plain>新增用户</el-button>
      </el-form-item>
    </el-form>
     <el-table :data="myListData" border stripe class="home_table"  @expand-change="expandSelect">
          <el-table-column type="expand"   >
        <template slot-scope="scope">
          <DistributorChildTab :childData="scope.row" ref="ChildTable" ></DistributorChildTab>
        </template>
      </el-table-column>
        <el-table-column prop="code" label="CODE" min-width="140"  ></el-table-column>
        <el-table-column prop="name" :label="$t('Distributor.name')" min-width="120"  ></el-table-column>
        <el-table-column prop="password" :label="$t('Distributor.passWorde')" min-width="120" ></el-table-column>
        <el-table-column  :label="$t('Distributor.imgA')" min-width="140"  >
          <template slot-scope="scope">
            <img :src="scope.row.photoUrl" class="auter_img">
          </template>
        </el-table-column>
<el-table-column :label="$t('Distributor.options')" min-width="75"  class="bg" >
        <template slot-scope="scope">
          <el-dropdown @command="handleCommand" trigger="click" size="mini">
              <el-button type="primary" plain>
                  操作按钮<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="{i: 1, item: scope.row}" >编辑 </el-dropdown-item>
                  <el-dropdown-item :command="{i: 2, item: scope.row}">删除 </el-dropdown-item>
                  <!-- <el-dropdown-item :command="{i: 3, item: scope.row}">添加用户 </el-dropdown-item> -->
              </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
      </el-table>
    <Pagination v-model="searchFrom.pagingDto" @onSearch="search()"></Pagination>
    <!-- <el-dialog :title="title" :visible.sync="dialogVisible" width="40%" :before-close="()=>{dialogVisible = false}"> -->
       
    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
       <div class="add_my_list">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="CODE">
            <el-input v-model.number="form.code" placeholder="请输入CODE"></el-input>
          </el-form-item>
          <el-form-item label="名字">
            <el-input v-model="form.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" type="password" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="url">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:8769/demo/user/data/uploadImg"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateSubmit">确 定</el-button>
      </span>
    </el-dialog>
<!-- <h2>我的一段js</h2>
<el-button type="primary" onclick="document.getElementById('demo').innerHTML = Date()">点击这里来显示日期和时间</el-button>
  <p id="demo"></p> -->
  </div>

</template>
<script>
  import {mapState, mapActions,mapMutations} from "vuex";
  import Pagination from "../../components/Pagination"
  import DistributorChildTab from './DistributorChildTab'
  import axios from "axios"
  export default {
    components: {Pagination,DistributorChildTab},
    data() {
      return {
        listId: [],
         childTableId: '',
        dialogVisible: false,
        dateValue:[],
        // searchFrom:{},
        //彈框
         title: '新增人员',
        imageUrl: ''
      }
    },
    created() {
      // this.myListUserA()
      // this.dropListUserA()
      // this.search(1)
    },
    mounted () {
      this.myListUserA()
      this.dropListUserA()
      this.search(1)
    },
    computed: {
      ...mapState({
      searchFrom: state => state.dispatchSupplier.searchFrom,
       resetSearchFrom: state => state.dispatchSupplier.resetSearchFrom,
      myListData: state => state.dispatchSupplier.myListData,
      dropData: state => state.dispatchSupplier.dropData,
      form: state => state.dispatchSupplier.form,
         retform: state => state.dispatchSupplier.retform,
     
    })
  },
    methods: {
      ...mapActions('',['myListUserA', 'dropListUserA', 'searchOneUserA', 'deleteListUserA', 'exportDataA','updateListUserA', 'addMyListUserA']),
      ...mapMutations('dispatchSupplier',['clearSearchFormM']),
 
      search (val) {
      if (val) {
        this.searchFrom.pagingDto.pageNo = val
      }
        this.myListUserA()
      },
    
       expandSelect(row, expandedRows) {
      this.childTableId = row.id
    },
handleClose(){
  this.dialogVisible = false
     
},
     handleCommand (row) {
       switch (row.i) {
        case 1: 
        Object.assign(this.form, row.item)
        this.imageUrl = row.item.photoUrl //修改图片显示 主要就是item 
        this.title = '编辑人员'
        this.dialogVisible = true
        break;
        case 2:
        this.delUser(row.item.id)
        break;
      }
    },
    //新增用户
    addialogVisible(){
      Object.assign(this.form, this.retform)
       this.dialogVisible = true
      this.title = '新增用户'
      this.$nextTick(()=>{
        this.$refs['form'].resetFields()
      })
     
    },
  
     delUser (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteListUserA(id)
      })
    },
    //用户修改提交的方法
     updateSubmit() {
        if (this.title == '编辑人员') {
          this.updateListUserA()
        } else {
          this.addMyListUserA()
        }
        this.dialogVisible = false
      },
    
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.form.photoUrl = res.obj.savePath
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
         clearSearchForm () {
      this.dateValue = []
       this.clearSearchFormM()
       this.myListUserA()
      
      // Object.assign(this.searchFrom, this.resetSearchFrom)
   
    },
     }
   
  };
</script>
<style>
  .home_heade{
    text-align: right;
  }
  .home_table{
    margin-top: 15px;
    /* background-color: aqua; */
    
  }
/* .home_table>.bg{
  background-color: aquamarine;
} */

.demo-form-inline{
  margin-top: 20px;
}
  .auter_img{
    width: 135px;
    height: 25px;
  }
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
    width: 178px;
    height: 178px;
    line-height: 178px !important;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

