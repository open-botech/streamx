<template>
  <div class="ellipsis nodeBox" :title="name"> {{ name }}</div>
</template>

<script>
import { Tooltip } from 'ant-design-vue'
export default {
  components:{
    [Tooltip.name]:Tooltip
  },
  props:{
    name:{
      type:String,
      default:''
    }
  }
}
</script>

<style lang="less" scoped>
.nodeBox{
  background: #1d304c;
  width: 120px;
  box-sizing: border-box;
  padding:0 5px;
  height: 32px;
  line-height: 32px;
  color: #1890FF;
  text-align: center;
}
</style>