<template>
  <a-tree class="datasource-list" :replaceFields="replaceFields" :load-data="loadTableData" :tree-data="initDataSourceList" />
</template>

<script>
import { list } from '@/api/dataSource'
export default {
  data() {
    return {
      initDataSourceList: [],
      replaceFields: {
        title: 'name',
        key: 'dataSourceId'
      }
    }
  },
  created() {
    this.loadDataSource()
  },
  methods: {
    loadDataSource() {
      list({
        current: 1,
        size: 100
      }).then(res => {
        if(res.code === 200) {
          this.initDataSourceList = res.data.records
        }
      }).catch(error => {
        console.log(error)
      })
    },
    loadTableData() {}
  }
}
</script>

<style lang='less' scoped>
.datasource-list{
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>