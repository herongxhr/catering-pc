import React from 'react';
import { Form, Select, Input, Button, Badge, Tag, Icon, Radio, Card, Checkbox } from 'antd';
import { Link, routerRedux } from 'dva/router';
import Cartoon from '../../components/Cartoon';
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
  // 复制模板
  handleCopy = id => {
    const { dispatch } = this.props
    dispatch({
      type: 'menuCenter/copyTemplate',
      payload: id
    })
    window.location.reload()
  }
  // 删除模板
  handleDelte = id => {
    const { dispatch } = this.props
    dispatch({
      type: 'menuCenter/delteTemplate',
      payload: id
    })
    window.location.reload()
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
      }
    } = this.props
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
            {records.length ? records
              .map(item =>
                (<MenuTemplateCard key={item.id} id={item.id}
                  handleCopy={this.handleCopy}
                  handleDelte={this.handleDelte}
                  handleShowDetails={this.handleShowDetails}
                  actionsText={'2019-02-27'}
                  className='menuTemplateCard'>
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
                        {item.lastTime}
                      </span>
                    </p>
                  </div>
                  <div className='card-footer'>
                    <Tag color="magenta">{item.tags.split(',')[0]}</Tag>
                    <Tag color="red">{item.tags.split(',')[1]}</Tag>
                    <Tag color="volcano">{item.tags.split(',')[2]}</Tag>
                    <Tag color="orange">{item.tags.split(',')[3]}</Tag>
                  </div>
                </MenuTemplateCard>)) : null
            }
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
}))(WrappedMenuTemplate);

