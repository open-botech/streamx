<template>
  <a-modal
      v-model="viewElementVisible"
      title="查看组件"
      width="70%"
      ok-text="确认"
      cancel-text="取消"
      @ok="hideElementModal">
      <div>
        <a-select :default-value="activeElementType" style="width: 200px;">
          <a-select-option v-for="item of elementType" :key="item.value" :value="item.value">
            {{ item.type }}
          </a-select-option>
        </a-select>
        <a-select :default-value="defaultDataSource" style="width: 200px;" @change="handleSourceChange">
          <a-select-option v-for="item of DATA_SOURCE" :key="item.key" :value="item.code">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </div>

      <div class="sql-box" id="flink-sql-small">
      </div>
      <p class="element-code"></p>
    </a-modal>
</template>

<script>
import { DATA_SOURCE } from './constant'
import {
  initEditorSingle,
} from '../AddEdit'
export default {
  data() {
    return {
      smallController: null,
      defaultDataSource: DATA_SOURCE[0].name,
      DATA_SOURCE: DATA_SOURCE,
      viewElementVisible: false,
      activeElementType: 'restful',
      elementType: [
        {
          type: 'restful',
          value: 'restful'
        },
        {
          type: '加密/解密',
          value: '加密/解密'
        },{
          type: '分支',
          value: '分支'
        },{
          type: '字段合并拆分',
          value: '字段合并拆分'
        },{
          type: '字段内容清洗',
          value: '字段内容清洗'
        },{
          type: '空值转换',
          value: '空值转换'
        },{
          type: '中文数字转换',
          value: '中文数字转换'
        },{
          type: '日期时间转换',
          value: '日期时间转换'
        },{
          type: '数据类型转换',
          value: '数据类型转换'
        },{
          type: '过滤',
          value: '过滤'
        },{
          type: '抽样',
          value: '抽样'
        },{
          type: '去重 ',
          value: '去重'
        }
      ]
    }
  },
  methods: {
    show() {
      this.viewElementVisible = true

      if (this.smallController) {
        //
      } else {
        this.$nextTick(() => {
          this.smallController = initEditorSingle(this, DATA_SOURCE[0].code, '#flink-sql-small')
        })
      }
    },
    hideElementModal() {
      this.viewElementVisible = false
    },
    handleSourceChange(code) {
      this.smallController.editor.flinkSql.setValue(code)
    },
    handleChangeType(val) {
      this.activeElementType = val
    }
  }
}
</script>
