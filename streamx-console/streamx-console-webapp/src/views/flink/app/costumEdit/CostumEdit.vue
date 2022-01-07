<template>
  <a-card
    :body-style="{padding: '24px 32px'}"
    :bordered="false"
    class="app_controller">
    <a-steps :current="current" style="margin:0 auto 30px;width:600px;">
      <a-step title="项目" />
      <a-step title="配置" />
    </a-steps>
    <div class="form-box">
      <a-form
        @submit="handleSubmit"
        :form="form">
        <a-form-item
          :wrapper-col="{ span: 24 }"
          class="submit-btn"
          style="text-align: center">
          <!-- <a-button
          @click="handleReset">
          Reset
        </a-button> -->
        
          <a-button
            v-show="current!=0"
            @click="current--"
            style="margin-left: 15px">
            prev
          </a-button>
          <a-button
            v-show="current!=2"
            type="primary"
            @click="current++"
            style="margin-left: 15px">
            next
          </a-button>
          <a-button
            v-if="current==2"
            html-type="submit"
            type="primary"
            :loading="submitting"
            :disabled="submitting"
            style="margin-left: 15px">
            Submit
          </a-button>
        </a-form-item>
        <div v-show="current==0" class="setpContent">
        </div>

        <div v-show="current == 1" class="stepContent">
        </div>

      </a-form>
    </div>
  </a-card>
</template>


<script>
import SvgIcon from '@/components/SvgIcon'
export default {
  name: 'CostumEdit',
  components: { SvgIcon },
  data() {
    return {
      current: 0,
      form:null
    }
  }
}
</script>

<style lang="less" scoped>
.setpContent{
  width:900px;
  margin: 0 auto;
}

.app_controller{
  height: 100%;
  position: relative;
  
  .form-box{
    flex:2;
    overflow: auto;
  }
  .info{
    flex:1;
    border-top: 1px solid #434343;
  }
  .submit-btn{
    position: absolute;
    right:50px;
    top:20px
  }
}

</style>
