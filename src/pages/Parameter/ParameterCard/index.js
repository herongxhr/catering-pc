import React from 'react'
import { Card , List} from 'antd'
import ParameterList from '../ParameterList'

import './index.less'

const data = [
  {
    date: '2018-12-02 周二',
    number:'12345678',
    price:'$94,700'
  },
  {
    date: '2018-12-03 周三',
    number:'12345678',
    price:'$94,700'
  },
  {
    date: '2018-12-04 周四',
    number:'12345678',
    price:'$94,700'
  },
  {
    date: '2018-12-05 周五',
    number:'12345678',
    price:'$94,700'
  },
];


class ParameterCard extends React.Component {
  render() {
    return(
      <Card title='明细' className='ParameterDetail-card'>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <ParameterList date={item.date} number={item.number} price={item.price} />
          )}
        />
    </Card>
    )
  }
}

export default ParameterCard