import React from 'react'
import Bread from '../../components/Bread'
import EditableTagGroup from '../../components/EditableTagGroup'
import CreateTemplate from '../../components/CreateTemplate'
import { Card , Input , Checkbox , Switch , Select } from 'antd'
import './index.less'

const Option = Select.Option;

class Edit extends React.Component {
  onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  }

  handleChange = (checked) => {
    console.log(`switch to ${checked}`);
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
      <div className='edit'>
				<Bread bread={bread} />
        <Card
          title='基本属性'
          bordered={true}
          style={{width:1140}}
          className='basic'
        >
          <div className='basic-left'>
            <p className='edit-title'>模板名称</p>
            <Input placeholder='幼儿园春季菜单,高蛋白' style={{width:260,height:32}}></Input>
          </div>
          <div className='basic-right'>
            <p className='edit-title'>标签</p>
            <EditableTagGroup />
          </div>
        </Card>
        {/* <CreateTemplate /> */}
        <Card
          style={{width:1140}}>
          <div style={{display:'flex',justifyContent:'space-between'}} className='edit-content'>
            <div className='edit-content-left'>
              <Checkbox onChange={this.onChange}>配料详情</Checkbox>
              <Select defaultValue="1" style={{ width: 120,marginLeft: 10 }}>
                <Option value="1">已选5天</Option>
                <Option value="2">Lucy</Option>
                <Option value="3" disabled>Disabled</Option>
                <Option value="4">yiminghe</Option>
              </Select>
              <Select defaultValue="1" style={{ width: 120,marginLeft: 10 }}>
                <Option value="1">已选4餐</Option>
                <Option value="2">Lucy</Option>
                <Option value="3" disabled>Disabled</Option>
                <Option value="4">yiminghe</Option>
              </Select>
            </div>
            <div className='edit-content-right' >
              <span>图片模式</span>
              <Switch  handleChange={this.handleChange} style={{marginLeft:6}} />
            </div>
          </div>
          <div className='edit-content-footer'>

          </div>
        </Card>
      </div>
    )
  }
}

export default Edit