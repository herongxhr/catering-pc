import React from 'react'
import Bread from '../../components/Bread'
import { Card , Button , Row, Col , Checkbox , Switch , Table} from 'antd'
import { Steps } from 'antd';
import { connect } from 'dva'


import './index.less'

const Step = Steps.Step;

const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  if (index === 4) {
    obj.props.colSpan = 0;
  }
  return obj;
};
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  tel: '0571-22098909',
  phone: 18889898989,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: '',
  tel: '0571-22098333',
  phone: 18889898888,
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  tel: '0575-22098909',
  phone: 18900010002,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Jim Red',
  age: 18,
  tel: '0575-22098909',
  phone: 18900010002,
  address: 'London No. 2 Lake Park',
}, {
  key: '5',
  name: 'Jake White',
  age: 18,
  tel: '0575-22098909',
  phone: 18900010002,
  address: 'Dublin No. 2 Lake Park',
}];


const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render: (value,row,index) => {
    const obj = {
      children:value,
      props:{}
    }
    if(index == 0) {
      obj.props.rowSpan = 5
    }
    if(index == 1 || index == 2 || index == 3 || index == 4) {
      obj.props.rowSpan = 0
    }
    return obj
  },
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Home phone',
  dataIndex: 'tel',
}, {
  title: 'Phone',
  dataIndex: 'phone',
}, {
  title: 'Address',
  dataIndex: 'address',
}];

class Particulars extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
		dispatch({
			type:'unifiedMenus/queryList',
			payload:{a:1}
		})
  }
  
  onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  }

  render() {
    const bread = [{
      href:'/menubar',
      breadContent:'菜单中心'
    },{
      href:'/menubar',
      breadContent:'统一菜单'
    },{
      href:'/particulars',
      breadContent:'创建模板'
    }]
    return(
      <div className='Particulars'>
				<Bread bread={bread}  />
        <Card className='DetailsOperation' style={{width:1200,marginTop:-7}}>
          <div className='card-body'>
            <Row className='card-header'>
              <Col span={12} className='card-header-title'>
                <span className="iconfont">&#xe62b;</span>
                <span className='odd-number'>采购单号：5472563456765</span>
              </Col>
              <Col span={12}  className='right' style={{ fontSize: 14 }}>
                <Button>打印</Button>
                <Button>删除</Button>
                <Button>调整</Button>
                <Button type='primary'>下单</Button>
              </Col>
            </Row>
            <Row className='card-content'>
              <Col span={8} >
                <p className='card-content-top'>周次:第52周</p>
                <p>日期：2018-12-01 至  2018-12-07</p>
              </Col>
              <Col span={8}>
                <p className='card-content-top'>下达单位：浙江省教育局</p>
                <p>下达时间：2018-11-25   11：09</p>
              </Col>
              <Col span={8}>
                <Col span={12}><p className='card-content-top'></p><p></p></Col >
                <Col span={12}><p className='card-content-top'>状态</p><p>待执行</p></Col >            
              </Col>
            </Row>
          </div> 
        </Card>
        <Steps current={1} progressDot>
          <Step title="菜单下达" description="2018-11-25 11:09" />
          <Step title="采购订单" description="待采购" />
          <Step title="下达订单" description="" />
        </Steps>
        <Card>
          <div style={{display:'flex',justifyContent:'space-between'}} className='PaContent'>
            <div>
              <Checkbox onChange={this.onChange}>配料详情</Checkbox>
              <Checkbox onChange={this.onChange}>收起空餐饮</Checkbox>
            </div>
            <div>
              图片模式<Switch onChange={this.onChange} style={{marginLeft:10}}/>
            </div>            
          </div>
        </Card>
        <Table columns={columns} dataSource={data} bordered></Table>
      </div>
    )
  }
}

export default connect(( {unifiedMenus} ) => ({
  unifiedMenus,
}))(Particulars)