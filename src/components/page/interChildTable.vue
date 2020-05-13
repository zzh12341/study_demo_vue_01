<template>
  <div class="inter-child"  v-loading="loading">
    <div class="inter-table">
      <div class="inter-tr">
        <span> 重量(kg)</span>
        <span v-for="(val) in weightList" :key="val.id">{{val.minMaxWeight}}</span>
      </div>
      <div class="inter-tr2">
         <div v-for="(item) in tableData" :key="item.id" class="inter-td">
           <div class="inter-tr2-head">
              <span>{{item.zoneName}}</span>
              <span>{{item.destinationCountryName}}</span>
           </div>
            <div v-for="(val) in item.presetZoneReportPriceItemList" :key="val.id" >
              <span>￥{{val.firstWeightPrice}}</span>
            </div>
         </div>
      </div>
    </div>
  </div>
</template>
<script>
// import {presetProductChildList} from '../../lib/api'
import {dataList}  from './perr'
export default {
  // props: ['presetProductId'],
  components: {},
  data () {
    return {
      tableData: [],
      weightList: [],
      weight: [],
      loading: false,
    }
  },
  computed: {},
  created () {},
  mounted () {
    // this.presetProductChildListA(this.presetProductId)
    this.presetProductChildListA()
  },
  methods: {
    // async presetProductChildListA (params) {
     presetProductChildListA () {
      this.loading = true
      // let res = await presetProductChildList(params)
      // if (res.flag) {
        // const arr = res.rows
        const arr = dataList
        for (let i = 0; i < arr.length; i++) {
          const obj = {}
          // 分区
          obj.zoneName = arr[i].zoneName  
          obj.id = arr[i].id
          const country = arr[i].presetZoneItemList
          // 国家
          obj.destinationCountryName = country.map(L => L.destinationCountryName).join(',')
          if (arr[i].presetZoneReportPriceItemList) {
            obj.presetZoneReportPriceItemList = arr[i].presetZoneReportPriceItemList
            this.weight = arr[0].presetZoneReportPriceItemList
          }
          this.tableData.push(obj)
        }
        
        for (let y = 0; y < this.weight.length; y++) {
            var objTwo = {}
            // 重量段
            objTwo.minMaxWeight = this.weight[y].minWeight+ '-' +this.weight[y].maxWeight
            this.weightList.push(objTwo)
        }
       this.loading = false
      // }
    },
  }
}
</script>
<style lang="scss">
.inter-child{
 .inter-table{
   width: 100%;
   border: 1px solid #EBEEF5; 
   display: flex;
    .inter-tr{
      width: 10%;
      span{
        display: block;
        height: 34px;
        padding-left: 10px;
        line-height: 34px;
        border-right:  1px solid #EBEEF5;
        border-bottom:  1px solid #EBEEF5;
       
        &:nth-child(1){
          height: 64px;
          line-height: 60px;
          background-color: #d9e7ff;
          color: #333333;
          font-weight: 700;
        }
      }
    }
    .inter-tr2{
      width: 90%;
      display: flex;
      span{
        display: block;
        padding-left: 10px;
        height: 34px;
        line-height: 34px;
        border-right:  1px solid #EBEEF5;
        border-bottom:  1px solid #EBEEF5;
      }
      .inter-td{
        flex: 1;
        .inter-tr2-head{
          height: 64px;
          background-color: #d9e7ff;
          span{
            height: 32px;
            font-weight: 700;
            color: #333333;
          }
        }
      }
    }
 }
}
</style>