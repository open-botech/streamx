import $ from 'jquery'
import {Node} from 'butterfly-dag'
import Vue from 'vue/dist/vue.esm.js'
import './base_node.less'

class BaseNode extends Node {
  constructor(opts) {
    super(opts)
    this.options = opts
  }

  draw = (opts) => {
    // let container = $('<div class="relation-node" style="position: absolute;"></div>')
    //   .css('top', opts.top)
    //   .css('left', opts.left)
    //   .attr('id', opts.id)
    //   .addClass(opts.options.className);

    // let logoContainer = $(`<div class="logo-container">${opts.options.name}</div>`);
    // logoContainer.addClass(opts.options.className);

    // container.append(logoContainer);
    

    const css={
      position: 'absolute',
      top:opts.top,
      left:opts.left
      
    }
    const content=Vue.extend({
      template:'<div :id="opts.id" @click="nodeClick(opts.id)" class="relation-node" :style="css"><div class="logo-container">{{opts.options.name}}</div></div>',
      data(){
        return {
          opts:opts,
          css:css
        }
      },
      methods:{
        nodeClick(id){
          console.log(id)
        }
      }
    })

    const component=new content().$mount()
    const container = $(component.$el).css('top', opts.top).css('left', opts.left)
    // return component
    return container[0]

  }
}

export default BaseNode