<template>
  <div class="pagination-wrap">
    <el-pagination
      :page-size="pagerData.pageSize"
      :total="pagerData.pageTotal"
      :current-page="pagerData.pageNo"
      layout="total, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
     props:{
    pagerData:{
        type:Object,
        required:false
    }
    },
    model:{
        prop:'pagerData',
        event:'valueChange'
    },
 
    data(){
       return{

       }
    },
       methods:{
      handleCurrentChange(pageNo){
this.pagerData.pageNo=pageNo
   this.$emit('valueChange',this.pagerData)
          this.$emit('onSearch')
      }
    }
   
}
</script>
<style >
.pagination-wrap{
    text-align: right;
    margin-top: 20px;
}
</style>