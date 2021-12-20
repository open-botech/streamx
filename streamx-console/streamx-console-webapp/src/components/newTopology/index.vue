<template>
  <div class="topologyBox">
    <ButterflyVue
      ref="butterflyVue"
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
    data:{
      type:Object,
      default(){
        return {
          nodes:[],
          edges:[]
        }
      }
    }
  },
  watch:{
    data(val){
      if(this.createFlag==true){
        this.$refs.butterflyVue.canvasReDraw(val)
      }
    }
  },
  data(){
    return {
      createFlag:false,
      options:{
        layout: {
          type: 'dagreLayout',
          options: {
            rankdir: 'LR',
            nodesep: 60,
            ranksep: 80,
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
            arrow: false,//箭头
            type: 'Manhattan',
            isExpandWidth: false,//增加线条交互区域
            defaultAnimate: true//默认开启线条动画
          }
        }
      }
    }
  },
  mounted(){
    this.$refs.butterflyVue.canvasDraw(this.data)
    this.createFlag=true
  },

}
</script>

<style>
.topologyBox{
  height: 400px;
  width: 100%;
  /* background: #fff; */
  position: relative;
}
</style>