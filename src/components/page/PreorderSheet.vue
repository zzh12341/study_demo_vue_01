<template>
  <div class="private-child"  v-loading="loading">
    <table  cellspacing="0" cellpadding="0">
      <tr>
        <th class="padding-class">分区</th>
        <th v-for="(val) in weightList" :key="val.id" class="table-header">
          <div>{{val.minMaxWeight}}</div>
          <div>
          
            <span>处理费/票</span><span>首重/{{val.firstWeight}}kg</span><span>续重/{{val.followWeight}}kg</span>
          </div>
        </th>
        <th class="padding-class">实效</th>
        <th class="padding-class">国家</th>
      </tr>
      <tr v-for="(item) in tableData" :key="item.id">
        <td class="padding-class">{{item.zoneName}}</td>
        <td v-for="(val) in item.presetZoneReportPriceItemList" :key="val.id" class="table-body">
          <div>
            
            <span>{{val.handleWeightPrice}}</span>
            <span>{{val.firstWeightPrice}}</span>
            <span>{{val.followWeightPrice}}</span>
          </div>
        </td>
        <td class="padding-class">{{item.minMaxShippingCycle}}</td>
        <td class="padding-class">{{item.destinationCountryName}}</td>
      </tr>
    </table>
  
  </div>
</template>
<script>
// import {presetProductChildList} from '../../lib/api'
import {dataList}  from './perr'

export default {
  // props: ['presetProductId'],
  components:  { },
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
    // this.presetProductId
    this.presetProductChildListA()
  },
  methods: {
   
    // async presetProductChildListA (params) {
    presetProductChildListA () {
      // this.loading = true
      // let res = await presetProductChildList(params)
      console.log(dataList);

      // if (res.flag) {
        const arr = dataList
        for (let i = 0; i < arr.length; i++) {
          const obj = {}
          // 分区
          obj.zoneName = arr[i].zoneName  
          // 实效      
          obj.minMaxShippingCycle = arr[i].minShippingCycle +'-'+ arr[i].maxShippingCycle
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
            // 首重
            objTwo.firstWeight = this.weight[y].firstWeight
            // 续重
            objTwo.followWeight = this.weight[y].followWeight
            // 重量段
            objTwo.minMaxWeight = this.weight[y].minWeight+ '-' +this.weight[y].maxWeight
            this.weightList.push(objTwo)
        }
      }
      // this.loading = false
    // },
  }
}
</script>
<style lang="scss">
.private-child{
  table{
    width:90%;
    border: 1px solid #ccc;
    margin-top: 20px;
    tr th{
      background-color: #d9e7ff;
      min-width: 100px;
      padding: 0;
      height: 60px;
      border-right: 1px solid #ccc;
      &:nth-child(1){
        width: 80px;
      }
    }
    tr td {
      height: 34px;
      line-height: 34px;
      padding: 0;
      border-right: 1px solid #c3bfbf;
      border-bottom:1px solid #c3bfbf; 
    }
    .table-header{
       line-height: 30px;
      div:nth-child(1){
        padding-left: 10px;
        border-bottom:1px solid #ccc; 
      }
      div:nth-child(2){
        display: flex;
        span{
          flex: 1;
          padding-left: 10px;
          display: inline-block;
          &:nth-child(even){
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
          }
        }
      }
    }
    .table-body{
      div{
        display: flex;
        span{
          display: inline-block;
          flex: 1;
          height: 40px;
          padding-left: 10px;
          &:nth-child(even){
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
          }
        }
      }
    }
  }
  .padding-class{
    padding-left: 20px;
  }
}
</style>