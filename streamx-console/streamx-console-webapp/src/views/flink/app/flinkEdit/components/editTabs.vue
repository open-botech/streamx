<template>
  <div>
    <a-tabs v-model="activeKey" type="editable-card" hide-add @edit="onEdit">
      <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="pane.closable">
        {{ pane.content }}
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  data(){
    const panes = [
      { title: 'Tab 1', content: 'Content of Tab 1', key: '1',closable: false },
      { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
    ]
    return {
      panes,
      activeKey:1,
      newTabIndex:100,

    }
  },
  methods:{
    add(param={}) {
      const {key,title,type}=param
      const panes = this.panes
      const newTabIndex =key|| this.newTabIndex++
      panes.push({ title: title||'New Tab', type: type||'edit', key: newTabIndex })
      this.panes = panes
      this.activeKey = newTabIndex
    },
    onEdit(targetKey, action) {
      this[action](targetKey)
    },
    remove(targetKey) {
      let activeKey = this.activeKey
      let lastIndex
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1
        }
      })
      const panes = this.panes.filter(pane => pane.key !== targetKey)
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].key
        } else {
          activeKey = panes[0].key
        }
      }
      this.panes = panes
      this.activeKey = activeKey
    },
  }
}
</script>

<style>

</style>