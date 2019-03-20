import React from 'react';
import { Form, Select, Input, Button, Badge, Tag, Row, Col, Radio, Card } from 'antd';
import { Link, routerRedux } from 'dva/router';
//import Cartoon from '../../components/Cartoon';
import MenuTemplateCard from '../../components/MenuTemplateCard';
import BreadcrumbWithTabs from '../../components/BreadcrumbWithTabs';
import { connect } from 'dva';
import './index.less'
import SorterArrow from '../../components/SorterArrow';

const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

// 面包屑Tab数据
const tabList = [
  {
    key: 'unified-menu',
    tab: '统一菜单',
  },
  {
    key: 'my-menu',
    tab: '我的菜单',
  },
  {
    key: 'menu-template',
    tab: '菜单模板',
  },
];
class MenuTemplate extends React.Component {
  state = {
    desc: true,
    activeTabKey: 'menu-template',
    // 当前操作的模板
    currTemplateId: ''
  }
  // 改变排序
  handleSorter = () => {
    this.setState({
      desc: !this.state.desc
    })
  }

  handleLinkChange = key => {
    const { dispatch } = this.props;
    // 不是所有key都setState
    this.setState({
      activeTabKey: key
    })
    dispatch(routerRedux.push({
      pathname: `/menubar/${key}`,
    }))
  }
  // 改变模板类型
  changeTemplateType = e => {
    const { dispatch, form } = this.props;
    dispatch({
      type: 'menuCenter/changeTemplateType',
      payload: e.target.value
    })
    form.resetFields();
    dispatch({
      type: 'menuCenter/fetchMenuTemplate',
    })
  }
  // 对模板进行复制，删除等操作
  handleTemplateActions = (e, id) => {
    const { dispatch } = this.props;
    // 通过e.target.id来获取当前操作类型copy,delete,edit
    const action = e.delAction || e.target.id;
    // 查看模板
    if (action === 'view') {
      dispatch(routerRedux.push({
        pathname: '/menubar/menu-template/details',
        state: { id }
      }))
      return;
    }
    if (action === 'copy' || action === 'delete') {
      // 记录当前操作的模板id
      this.setState({
        currTemplateId: id,
      });
    }
    // 先显示加载
    dispatch({
      type: 'menuCenter/saveTemplateActionResult',
      payload: false
    })
    // 调用相应的effect方法
    dispatch({
      type: `menuCenter/templateActions`,
      payload: { id, action }
    })
  }

  handleShowDetails = id => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push({
      pathname: '/menubar/menu-template/details',
      state: { id }
    }))
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'menuCenter/fetchMenuTemplate',
    })
  }

  render() {
    const {
      location,
      menuTemplateData = {},
      form: {
        getFieldDecorator,
      },
      templateActionResult
    } = this.props
    const { currTemplateId } = this.state;
    const { records = [] } = menuTemplateData;
    return (
      <div>
        <BreadcrumbWithTabs
          {...location}
          tabList={tabList}
          onChange={this.handleLinkChange}
          activeTabKey={this.state.activeTabKey}
        />
        <Card style={{ width: 1160, margin: '20px auto', }}>
          <div>
            <Form layout="inline">
              <FormItem label='排序' colon>
                {getFieldDecorator('orderByAttr', { initialValue: 'create_date' })
                  (<Select style={{ width: 160 }} onChange={this.handleChange}>
                    <Option value="create_date">创建时间</Option>
                    <Option value="modify_date">修改时间</Option>
                    <Option value="used">使用次数</Option>
                  </Select>)}
              </FormItem>
              {/* 排序按钮 */}
              <FormItem>
                {getFieldDecorator('desc', { initialValue: true })(
                  <SorterArrow />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('searchContent', { initialValue: null })
                  (<Search
                    placeholder="模板名称/标签"
                    onSearch={value => console.log(value)}
                    style={{ width: 300 }}
                  />)}
              </FormItem>
            </Form>
          </div>

          <div className='filterWrapper'>
            <Button type="primary" >
              <Link to='/menubar/template/new'>创建模板</Link>
            </Button>
            {/* <div className='cartoon-wraper'>
                {true ? <Cartoon /> : null}
              </div> */}
            <RadioGroup onChange={this.changeTemplateType} defaultValue="my">
              <RadioButton style={{ width: 70, height: 32 }} value="my">我的</RadioButton>
              <RadioButton style={{ width: 80, height: 32 }} value="new">
                <Badge count={records.length ? records.length : null} offset={[10, -6]}>
                  <span>推荐</span>
                </Badge >
              </RadioButton>
            </RadioGroup>
          </div>
          <div className='cardsWrapper'>
            {!!records.length && records
              .map(item =>
                (<MenuTemplateCard key={item.id} id={item.id}
                  handleTemplateActions={this.handleTemplateActions}
                  // 当操作不成功并且卡片id和当前操作的卡片id相同时，不再显示加载
                  spinning={!templateActionResult && item.id === currTemplateId}
                  actionsText={item.createDate}>
                  <div className='templateCardContent'>
                    <Row style={{ marginBottom: 16 }} span={24} >
                      <Col span={16}>{item.templateName}</Col>
                      <Col style={{ textAlign: 'right' }} span={8}>{item.used || 0}次</Col>
                    </Row>
                    <Row style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)', marginBottom: 16 }} span={24}>
                      <Col>
                        <Row>
                          <Col span={18}>{item.echoMealTimeses}</Col>
                          <Col span={6} style={{ textAlign: 'right' }}>上次使用</Col>
                        </Row>
                        <Row>
                          <Col span={18}>{item.echoZjs}</Col>
                          <Col span={6} style={{ textAlign: 'right' }}>
                            {item.lastTime && item.lastTime.substring(0, 10)}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: 16 }} span={24}>
                      <Col>
                        <Tag color="cyan">{item.tags.split(',')[0]}</Tag>
                        <Tag color="red">{item.tags.split(',')[1]}</Tag>
                        <Tag color="green">{item.tags.split(',')[2]}</Tag>
                        <Tag color="orange">{item.tags.split(',')[3]}</Tag></Col>
                    </Row>
                  </div>
                </MenuTemplateCard>))}
          </div>
        </Card>
      </div>
    )
  }
}

// 当表单元素值发生改变时发送请求
const WrappedMenuTemplate = Form.create({
  onValuesChange: (props, _, allValues) => {
    const { dispatch } = props;
    dispatch({
      type: 'menuCenter/fetchMenuTemplate',
      payload: {
        ...allValues
      }
    })
  }
})(MenuTemplate);

export default connect(({ menuCenter }) => ({
  menuTemplateData: menuCenter.menuTemplate,
  templateType: menuCenter.activeTemplateType,
  templateActionResult: menuCenter.templateActionResult
}))(WrappedMenuTemplate);

