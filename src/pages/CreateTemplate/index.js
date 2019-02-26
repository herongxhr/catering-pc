import React from 'react'
import SubHeader from '../../components/SubHeader'
import { Card , Checkbox , Form , Button } from 'antd'

import './index.less'

const FormItem = Form.Item;

class Create extends React.Component {

  onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  }

  handleSubmit = ()=>{
    let userInfo = this.props.form.getFieldsValue();
    console.log(JSON.stringify(userInfo))
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div className='createTemplate'>
        <Card
          title={<SubHeader title='菜单中心' subTitle='菜单模板' cascade='创建模板'/>}
        >
          <Card
            title='创建模板'
          >
            <p>请选择用餐日</p>
            <Form layout="inline">
              <FormItem>
                {
                  getFieldDecorator('monday', {
                      initialValue: false
                  })(
                    <Checkbox onChange={this.onChange}>周一</Checkbox>,
                  )
                }
              </FormItem>
              <FormItem>
                {
                  getFieldDecorator('Tuesday', {
                      initialValue: false
                  })(
                    <Checkbox onChange={this.onChange}>周二</Checkbox>,
                  )
                }
              </FormItem>
              <FormItem>
                {
                  getFieldDecorator('Wednesday', {
                      initialValue: false
                  })(
                    <Checkbox onChange={this.onChange}>周三</Checkbox>,
                  )
                }
              </FormItem>
              <FormItem>
                {
                  getFieldDecorator('Thursday', {
                      initialValue: false
                  })(
                    <Checkbox onChange={this.onChange}>周四</Checkbox>,
                  )
                }
              </FormItem>
              <FormItem>
                {
                  getFieldDecorator('Friday', {
                      initialValue: false
                  })(
                    <Checkbox onChange={this.onChange}>周五</Checkbox>,
                  )
                }
              </FormItem>
              <FormItem>
                {
                  getFieldDecorator('Saturday', {
                      initialValue: false
                  })(
                    <Checkbox onChange={this.onChange}>周六</Checkbox>,
                  )
                }
              </FormItem>
              <FormItem>
                {
                  getFieldDecorator('Sunday', {
                      initialValue: false
                  })(
                    <Checkbox onChange={this.onChange}>周日</Checkbox>,
                  )
                }
              </FormItem>
              <FormItem>
                <Button onClick={this.handleSubmit}>submit</Button>
              </FormItem>
            </Form>
          </Card>
        </Card>
      </div>

    )
  }
}

const CreateTemplate = Form.create()(Create)

export default CreateTemplate