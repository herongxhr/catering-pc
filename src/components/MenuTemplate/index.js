import React from 'react'
import { Form , Select , Input, Button , Badge ,  Tag , Icon , Radio  } from 'antd'
import { Link } from 'react-router-dom'
import Cartoon from '../Cartoon'
import MyCard from '../Card'
// import { template } from '../../DataConfig'
import { connect } from 'dva';

import './index.less'


const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
const ButtonGroup = Button.Group;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Template extends React.Component {
  state = {
    changeColor:true,
    template:[]
  }

  colorChange =  () => {
    this.setState({
      changeColor:!this.state.changeColor
    })
  }

  queryMytemplate = (params = {}) => {
    const { dispatch } = this.props;
    //请求待办事项
    dispatch({
      type: 'unifiedMenus/queryMytemplate',
    })
    // this.setState({
    //   template:this.props.unifiedMenus.myTemplate.records
    // })
  }

  static getDerivedStateFromProps(props) {
    return {
      template: props.unifiedMenus.myTemplate.records
    }
  }

  queryRecommend = () => {
    const { dispatch } = this.props;
    dispatch({
      type:'unifiedMenus/queryRecommend'
    })
  }

  queryRecommendTemplate = () => {
    const { dispatch } = this.props;
    dispatch({
      type:'unifiedMenus/queryRecommendTemplate'
    })
  }

  // handleRecommend = () => {
  //   this.queryRecommendTemplate()
  // }
  
  componentDidMount() {
    this.queryMytemplate()
    this.queryRecommend()
  }

  onChange = (e) => {
    if(e.target.value == '1') {
      this.queryMytemplate()
    }
    if(e.target.value == '2') {
      this.queryRecommendTemplate()
    }
  }

  render(){
    const { unifiedMenus } = this.props
    const { getFieldDecorator } = this.props.form;
    const template = unifiedMenus.myTemplate.records
    return (
      <div className='Template'>
        <div style={{display:'flex',justifyContent:'space-between'}} className='TemplateHeader'>
          <Form layout="inline">
            <FormItem label='排序' colon={true}>
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
              <div className='top-down'>
                <Icon type="caret-up" onClick={this.colorChange} className={this.state.changeColor? 'blue-color' : null} />
                <Icon type="caret-down" onClick={this.colorChange} className={this.state.changeColor? null : 'blue-color'} />
              </div>
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
          <div className='cartoon-wraper'>
              {unifiedMenus.myRecommend ? <Cartoon /> : null}
          </div>
        </div>

        <div style={{display:'flex',justifyContent:'space-between'}} className='TemplateSubheader'>
          <Button type="primary" >
              <Link to='/menubar/template/new'>创建模板</Link>
          </Button>
          {/* <ButtonGroup>
            <Button style={{width:70,height:32}}>我的</Button>
            <Button style={{width:80,height:32}}>
              <span onClick={this.handleRecommend}>推荐</span>
              <Badge count={8} offset={[10,-6]} />
            </Button> */}
            <RadioGroup onChange={this.onChange} defaultValue="1">
              <RadioButton value="1">我的</RadioButton>
              <RadioButton value="2">
               <span>推荐</span>
               <Badge count={this.state.template?this.state.template.length:null} offset={[10,-6]} />
              </RadioButton>
            </RadioGroup>
        </div>

        <div className='card-group'>
          {
            this.state.template ? template.map(item => 
              (
              <MyCard key={item.id} id={item.id} actions={'2019-02-27'}>
                <div className='card-body'>
                  <p className='card-content'>
                    <span className='card-content-title'>
                      {item.templateName}
                    </span>
                    <span className='right' style={{ fontSize: 14 }}>
                      {item.used}
                    </span>
                  </p>
                  <p className='card-content'>
                    <span>
                      {item.echoMealTimeses}
                    </span>
                    <span className='right'>
                      上次使用
                    </span>
                  </p>
                  <p className='card-content'>
                    <span>
                      {item.echoZjs}
                    </span>
                    <span className='right'>
                      {/* {item.lastTime} */}
                      2019-02-27
                    </span>
                  </p>
                </div>
                <div className='card-footer'>
                  <Tag color="magenta">{item.tags.split(',')[0]}</Tag>
                  <Tag color="red">{item.tags.split(',')[1]}</Tag>
                  <Tag color="volcano">{item.tags.split(',')[2]}</Tag>
                  <Tag color="orange">{item.tags.split(',')[3]}</Tag>
                </div>
              </MyCard>
              )
            ) : null
          }
        </div>
      </div>
    )
  }
}

const MenuTemplate = Form.create()(Template)


export default connect(({unifiedMenus})=> ({
  unifiedMenus
}))(MenuTemplate)

