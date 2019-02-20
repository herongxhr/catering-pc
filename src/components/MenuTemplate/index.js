import React from 'react'
import { Form , Select , Input, Button , Row, Col , Badge , Card , Tag } from 'antd'
import { template } from '../../DataConfig'
import './index.less'

const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
const ButtonGroup = Button.Group;
const { Meta } = Card;



class Template extends React.Component {
  render(){
    const { getFieldDecorator } = this.props.form;
    const styles = {
      width: 340,
      height: 202,
      marginRight: 40,
      marginTop: 20 
    }
    return (
      <div className='Template'>
        <Form layout="inline">
          <FormItem>
            {
              getFieldDecorator('state',{
                  initialValue:'1'
              })(
                <Select style={{width:160}}>
                  <Option value="1">创建时间</Option>
                  <Option value="2">修改时间</Option>
                  <Option value="3">使用次数</Option>
                </Select>
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('state',{
                  initialValue:'模板名称/标签'
              })(
                <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                style={{ width: 300 }}
              />              
              )
            }
          </FormItem>
        </Form>
        <Row style={{marginTop:20}}>
          <Col span={2}>
            <Button type="primary">创建模板</Button>
          </Col>
          <Col span={4} offset={18}>
            <ButtonGroup>
              <Button style={{width:70,height:32}}>我的</Button>
              <Button style={{width:80,height:32}}>
                <span>推荐</span>
                <Badge count={8} offset={[10,-6]} />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        <div className='card-group'>
          {
            template.map(item => (
              <Card
                className='card'
                style={{ ...styles }}
                actions={[<span>创建:2018-11-01</span>,<span>修改:2018-11-02</span>]}
                hoverable={true}
              >
                <div className='card-body'>
                  <p className='card-content'>
                    <span className='card-content-title'>
                      {item.title}
                    </span>
                    <span className='right' style={{ fontSize: 14 }}>
                      {item.subTitle}
                    </span>
                  </p>
                  <p className='card-content'>
                    <span>
                      {item.meal}
                    </span>
                    <span className='right'>
                      {item.subMeal}
                    </span>
                  </p>
                  <p className='card-content'>
                    <span>
                      {item.data}
                    </span>
                    <span className='right'>
                      {item.subData}
                    </span>
                  </p>
                </div>
                <div className='card-footer'>
                  <Tag color="magenta">中小学</Tag>
                  <Tag color="red">夏季</Tag>
                  <Tag color="volcano">高蛋白</Tag>
                  <Tag color="orange">1日5餐</Tag>
                </div>
              </Card>
            ))
          }
        </div>

      </div>

    )
  }
}

const MenuTemplate = Form.create()(Template)


export default MenuTemplate

