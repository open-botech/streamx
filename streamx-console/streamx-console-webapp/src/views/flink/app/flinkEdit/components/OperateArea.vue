<template>
  <a-tabs
    :activeKey="activeKey"
    class="operate-tab"
    tab-position="left"
    @change="handleChangeTab">
    <a-tab-pane v-for="item in operateDataList" :key="item.value" :tab="item.label">
      <component :is="activeKey"></component>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import DataSourceList from './DataSourceList'
import ConfigList from './ConfigList'
import JarList from './JarList'
export default {
  components: {
    DataSourceList,
    JarList,
    ConfigList
  },
  data () {
    return {
      activeKey: 'DataSourceList',
      operateDataList: [{
        label: '编辑',
        value: 'DataSourceList'
      },{
        label: 'jar包',
        value: 'JarList'
      },{
        label: '配置',
        value: 'ConfigList'
      }]
    }
  },
  methods: {
    handleChangeTab(activeTab) {
      this.activeKey = activeTab
    }
  }
}
</script>

<style lang='less' scoped>
.operate-tab{
  width: 100%;
  height: 100%;
}
::v-deep.ant-tabs .ant-tabs-left-content{
  padding: 0;
  height: 100%;
  .ant-tabs-tabpane{
    height: 100%;
    overflow-y: auto;
  }
}
</style>