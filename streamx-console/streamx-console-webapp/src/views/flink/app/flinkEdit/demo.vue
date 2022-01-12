<template>
  <lineage-table style="position" :tables="tables" :relations="relations" @onEachFrame="() => { }"></lineage-table>
</template>

<script>
import {LineageTable} from 'react-lineage-dag'
export default {
  components:{LineageTable},
  data(){
    return {
        tables: [
    {
      id: '1',
      name: 'table-1',
      columns: [
        {
          name: 'id',
          title: 'id'
        },
        {
          name: 'age',
          title: 'age'
        }
      ]
    },
    {
      id: '2',
      name: 'table-2',
      columns: [
        {
          name: 'id',
          title: 'id'
        },
        {
          name: 'age',
          title: 'age'
        }
      ]      
    },
    {
      id: '3',
      name: 'table-3',
      columns: [
        {
          name: 'id',
          title: 'id'
        },
        {
          name: 'age',
          title: 'age'
        }
      ]      
    }    
  ],
  relations: [
    {
      srcTableId: '1',
      tgtTableId: '2',
      srcTableColName: 'id',
      tgtTableColName: 'age'
    },
    {
      srcTableId: '1',
      tgtTableId: '3',
      srcTableColName: 'id',
      tgtTableColName: 'age'
    }
  ],
    }
  }
}
</script>

<style>

</style>