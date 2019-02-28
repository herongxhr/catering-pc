import React from 'react'
import Bread from '../../components/Bread'
import EditableTagGroup from '../../components/EditableTagGroup'
import CreateTemplate from '../../components/CreateTemplate'
import { Card , Input , Checkbox , Switch } from 'antd'
import './index.less'

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
      <div className='Edit'>
				<Bread bread={bread} />
        <Card
          title='基本属性'
          bordered={true}
        >
          <div>
            <p>模板名称</p>
            <Input placeholder='幼儿园春季菜单,高蛋白'></Input>
          </div>
          <div>
            <span>标签</span>
            <EditableTagGroup />
          </div>
        </Card>
        <CreateTemplate />
        <Card>
          <div style={{display:'flex',justifyContent:'space-between'}} className='edit-content'>
            <Checkbox onChange={this.onChange}>配料详情</Checkbox>
            <div>
              <Switch  handleChange={this.handleChange} />
              <span>图片模式</span>
            </div>
          </div>
        </Card>

      </div>
    )
  }
}

export default Edit