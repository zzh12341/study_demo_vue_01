<template>

   <div class="container">

       <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="同行报价1" name="first">
        <PrivateChildTable/>
    </el-tab-pane>
    <el-tab-pane label="同行报价2" name="second">
        <interChildTable/>
    </el-tab-pane>
  </el-tabs>
   </div>
</template>

<script>
import PrivateChildTable from './PrivateChildTable'
import interChildTable from './interChildTable'
export default {
    components: {PrivateChildTable, interChildTable},
    data() {
        return {
            activeName: 'first' 
        }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
}
</script>

<style>
.content{
    width: 100%;

}
</style>