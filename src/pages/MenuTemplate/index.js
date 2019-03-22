import React from 'react';
import { Form, Select, Input, Button, Badge, Radio, Card } from 'antd';
import { Link, routerRedux } from 'dva/router';
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

// breadcrumbWithTabs中tabs数据
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
    asc: false,
    activeTabKey: 'menu-template',
    // 当前操作的模板
    currTemplateId: '',
    currTemplateType: 'P'
  }
  // 改变排序
  handleSorter = () => {
    this.setState({
      asc: !this.state.asc
    })
  }

  // 点击tabs标签跳转到指定页面
  // 页面state中的activeTabKey会传给面包屑
  handleTabChange = key => {
    this.props.dispatch(routerRedux.push({
      pathname: `/menubar/${key}`,
    }));
  }

  // 改变模板类型
  changeTemplateType = e => {
    this.setState({
      currTemplateType: e.target.value
    })
    const { dispatch, form } = this.props;
    // 表单重置
    form.resetFields();
    // 
    form.setFields({ currTemplateType: { value: this.state.currTemplateType } });
    dispatch({
      type: `menuCenter/fetch${e.target.value}MenuTemplate`,
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

  componentDidMount() {
    // 使用默认请求参数请求模板数据
    this.props.dispatch({
      type: `menuCenter/fetch${this.state.currTemplateType}MenuTemplate`,
    })
  }

  render() {
    const {
      location,
      form,
      templateActionResult
    } = this.props
    const { currTemplateId, currTemplateType } = this.state;
    const { getFieldDecorator } = form;
    // 解构相应的（餐饮单位/管理单位）模板数据
    const { records = [] } = this.props[`${currTemplateType}MenuTemplate`];
    return (
      <div>
        <BreadcrumbWithTabs
          {...location}
          tabList={tabList}
          onChange={this.handleTabChange}
          activeTabKey={this.state.activeTabKey}
        />
        <Card style={{ width: 1160, margin: '20px auto', }}>
          {/* 筛选区域 */}
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
                    style={{ width: 300 }}
                  />)}
              </FormItem>
              {/* 隐藏元素用来保存模板类型 */}
              <FormItem>
                {getFieldDecorator('currTemplateType', { value: this.state.currTemplateType })
                  (<Input type={'hidden'} />)}
              </FormItem>
            </Form>
          </div>
          <div className='filterWrapper'>
            <Button type="primary" >
              <Link to='/menubar/template/new'>创建模板</Link>
            </Button>
            <RadioGroup onChange={this.changeTemplateType} defaultValue={this.state.currTemplateType}>
              <RadioButton value="P">我的</RadioButton>
              <Badge count={records.length ? records.length : 0} >
                <RadioButton
                  style={{ borderRadius: '0 4px 4px 0', borderLeft: 'none' }}
                  value="C">
                  <span>推荐</span>
                </RadioButton>
              </Badge >
            </RadioGroup>
          </div>
          {/* 模板卡片展示区 */}
          <div className='cardsWrapper'>
            {records.length > 0 && records
              .map(item =>
                (<MenuTemplateCard
                  key={item.id}
                  itemData={item}
                  handleTemplateActions={this.handleTemplateActions}
                  // 当操作成功并且卡片id和当前操作的卡片id相同时，[不再]显示加载
                  spinning={!templateActionResult && item.id === currTemplateId}>
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
    const { currTemplateType, ...restValues } = allValues;
    props.dispatch({
      // 获得相应类型的模板数据
      type: `menuCenter/fetch${currTemplateType}MenuTemplate`,
      payload: {
        ...restValues
      }
    })
  }
})(MenuTemplate);

export default connect(({ menuCenter }) => ({
  CMenuTemplate: menuCenter.CMenuTemplate,
  PMenuTemplate: menuCenter.PMenuTemplate,
  templateActionResult: menuCenter.templateActionResult
}))(WrappedMenuTemplate);

