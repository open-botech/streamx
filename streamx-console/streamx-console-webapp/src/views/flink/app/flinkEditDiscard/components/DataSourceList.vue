<template>
  <a-tree class="datasource-list" :replaceFields="replaceFields" :load-data="loadTableData" :tree-data="initDataSourceList" />
</template>

<script>
import { list, table } from '@/api/dataSource'
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
        params: {
          current: 1,
          size: 100
        }
      }).then(res => {
        if(res.code === 200) {
          this.initDataSourceList = res.data.records
        }
      }).catch(error => {
        console.log(error)
      })
    },
    loadTableData(treeNode) {
      if (treeNode.dataRef.children) {
        resolve()
        return
      }else {
        const dataSourceId = treeNode.dataRef.dataSourceId
        if(dataSourceId) {
          table({
            params: {
              
            }
          })
        }
      }
    }
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