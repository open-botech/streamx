<template>
  <div id="butterFly" ref="butterFly"></div>
</template>

<script>
// import {Canvas} from 'butterfly-dag'
import DagreCanvas from './dagresCanvas'
import RelationEdge from './edge'
import 'butterfly-dag/dist/index.css'
export default {
  props:{
    // canvasData:{
    //   type:Object,
    //   default:()=>{
    //     return {}
    //   }
    // },
    canvasConf:{
      type:Object,
      default:()=>{
        return {}
      }
    },
  },
  data(){
    return {
      canvas:{}
    }
  },
  mounted(){
    console.log(this.canvasConf)
    this.canvas = new DagreCanvas({
      root: this.$refs.butterFly,              //canvas的根节点(必传)
      ...this.canvasConf,
      theme: {
        edge: {
          shapeType: 'Manhattan',
          arrow: true,
          arrowPosition: 0.5,
          Class: RelationEdge
        }
      }
    })
  },
  methods:{
    canvasDraw(data){
      this.canvas.draw({
        ...data,
      })
    },
  }
}
</script>

<style lang="less">
#butterFly{
  height: 100%;
  width: 100%;
}
</style>