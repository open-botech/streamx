import React from 'react'
import {Tooltip} from 'antd'
import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined} from '@ant-design/icons'
const e = React.createElement
const getOps = ({
                  isFold,
                  onAction,
                  tableId,
                }) => [
  // isExpand ?
  // {
  //   tooltip: '收起血缘',
  //   action: 'shrink',
  //   component: <FullscreenExitOutlined />
  // }
  // :
  // {
  //   tooltip: '展开血缘',
  //   action: 'expand',
  //   component: <FullscreenOutlined />
  // },
  {
    tooltip: '展开字段',
    action: 'fold',
  }
].map(op => {
  return {
    component: e(
      'span',
      { onClick: () => onAction(op.action, tableId) },
      e(VerticalAlignBottomOutlined),
    )
  }
})

export default getOps
