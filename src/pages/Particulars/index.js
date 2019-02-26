import React from 'react'
import Bread from '../../components/Bread'
import { Card , Button , Row, Col , Checkbox , Switch } from 'antd'
import { Steps } from 'antd';


import './index.less'

const Step = Steps.Step;

class Particulars extends React.Component {
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
				<Bread bread={bread} />
        <Card className='DetailsOperation'>
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
          <div style={{display:'flex',justifyContent:'space-between'}} className='PaContent'>
            <div>
             <Checkbox onChange={this.onChange}>配料详情</Checkbox>
             <Checkbox onChange={this.onChange}>收起空餐饮</Checkbox>
            </div>
            <div>
              图片模式<Switch defaultChecked onChange={this.onChange} />
            </div>            
          </div>
      </div>
    )
  }
}

export default Particulars