<template>
  <div class="nodeBox">
  </div>
</template>

<script>
export default {
  props:{
    opts:{
      type:Object,
      default(){
        return {
          id:'',
          options:{}
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.nodeBox{}
</style>