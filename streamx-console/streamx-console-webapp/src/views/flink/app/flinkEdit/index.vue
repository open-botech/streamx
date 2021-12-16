<template>
  <div style="height: 100%;">
    <div class="flinkEdit">
      <a-row type="flex" class="top">
        <a-col flex="300px" style="height: 100%;">
          <OperateArea></OperateArea>
        </a-col>
        <a-col flex="auto" class="edit">
          <EditTabs></EditTabs>
        </a-col>
      </a-row>
      <div class="info">  
        info
      </div>
    </div>
  </div>
</template>

<script>
import EditTabs from './components/editTabs.vue'
import OperateArea from './components/OperateArea.vue'
export default {
  components:{EditTabs, OperateArea}
}
</script>
<style lang="less" scoped>
.flinkEdit{
  display: flex;
  height: 100%;
  flex-direction: column;
  background: @component-background;
  .info{
    flex: 1;
  }
  .top{
    height: 500px;
    .edit{
      border:1px solid #343434
    }
  }
}

</style>