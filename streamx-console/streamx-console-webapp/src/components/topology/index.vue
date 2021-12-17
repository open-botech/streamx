<template>
  <div class="topologyBox">
    <ButterflyVue
      ref="butterflyVue"
      :canvas-data="mockData"
      :canvas-conf="options"></ButterflyVue>
  </div>
</template>

<script>
import ButterflyVue from './components/butterFlyVue.vue'
import mockData from './mockData'
export default {
  components:{
    ButterflyVue
  },
  props:{
    bloodData:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      mockData,
      options:{
        layout: {
          type: 'dagreLayout',
          options: {
            rankdir: 'LR',
            nodesep: 40,
            ranksep: 40,
            controlPoints: false,
          },
        },
        disLinkable: false, // 可删除连线
        linkable: false, // 可连线
        draggable: false, // 可拖动
        zoomable: true, // 可放大
        moveable: true, // 可平移
        theme: {
          edge: {
            arrow: true,//箭头
            type: 'Manhattan',
            isExpandWidth: true,//增加线条交互区域
            defaultAnimate: true//默认开启线条动画
          }
        }
      }
    }
  },
  mounted(){
    this.$refs.butterflyVue.canvasDraw(this.mockData)
  },

}
</script>

<style>
.topologyBox{
  height: 100%;
  width: 100%;
  background: #fff;
  position: relative;
}
</style>