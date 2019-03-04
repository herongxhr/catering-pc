import React from 'react'
import Bread from '../../components/Bread'
import { Card,Row,Col } from 'antd'
import ParameterTable from '../../components/ParameterTable'

import './index.less'

class Parameter extends React.Component {
  render() {
    const bread = [{
      href:'parameter',
      breadContent:'台账'
    },{
      href:'catalog',
      breadContent:'采购目录'
    }]
    return(
      <div className='Parameter'>
        <Bread bread={bread} />
        <ParameterTable />
      </div>
    )
  }
}

export default Parameter