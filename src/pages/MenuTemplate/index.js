import React from 'react';
import { Form, Select, Input, Button, Badge, Tag, Icon, Radio, Card, Checkbox } from 'antd';
import { Link, routerRedux } from 'dva/router';
import classNames from 'classnames';
import Cartoon from '../../components/Cartoon';
import MenuTemplateCard from '../../components/MenuTemplateCard';
import BreadcrumbWithTabs from '../../components/BreadcrumbWithTabs';
// import { template } from '../../DataConfig';
import { connect } from 'dva';
import './index.less'

const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
const ButtonGroup = Button.Group;
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
    activeTabKey: 'menu-template'
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
  // fetchMyMenuTemplate = params => {
  //   console.log('params', params);
  //   const { dispatch } = this.props;
  //   const defultOptions = {
  //     orderByAttr: 'create_date',
  //     desc: true,
  //     searchContent: null,
  //     current: 1,
  //     pageSize: 10
  //   }
  //   dispatch({
  //     type: 'menuCenter/fetchMyMenuTemplateu',
  //     payload: {
  //       ...defultOptions,
  //       ...params
  //     }
  //   })
  // }

  // static getDerivedStateFromProps(props) {
  //   return {
  //     template: props.unifiedMenus.myTemplate.records
  //   }
  // }

  // queryRecommend = () => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'unifiedMenus/queryRecommend'
  //   })
  // }

  // queryRecommendTemplate = () => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'unifiedMenus/queryRecommendTemplate'
  //   })
  // }

  // handleRecommend = () => {
  //   this.queryRecommendTemplate()
  // }

  componentDidMount() {
    console.log('didmout')
    const { dispatch } = this.props;
    dispatch({
      type: 'menuCenter/fetchMyMenuTemplate',
      playload: {
        //...allValues
      }
    })
    //this.queryMytemplate()
    //this.queryRecommend()
  }

  // onChange = (e) => {
  //   if (e.target.value == '1') {
  //     this.queryMytemplate()
  //   }
  //   if (e.target.value == '2') {
  //     this.queryRecommendTemplate()
  //   }
  // }

  render() {
    const {
      location,
      myMenuTemplateData = {},
      form: {
        getFieldDecorator,
      }
    } = this.props

    const {
      current,
      pages,
      records = [],
      searchCount,
      pageSize,
      total
    } = myMenuTemplateData;

    const { desc } = this.state;
    return (
      <div>
        <BreadcrumbWithTabs
          {...location}
          tabList={tabList}
          onChange={this.handleLinkChange}
          activeTabKey={this.state.activeTabKey}
        />
        <Card style={{
          width: 1160,
          margin: '20px auto',
        }}>
          <div>
            <Form layout="inline">
              <FormItem label='排序' colon>
                {getFieldDecorator('state', { initialValue: 'create_date' })
                  (<Select style={{ width: 160 }}>
                    <Option value="create_date">创建时间</Option>
                    <Option value="modify_date">修改时间</Option>
                    <Option value="used">使用次数</Option>
                  </Select>)}
              </FormItem>
              {/* 排序按钮 */}
              <FormItem>
                {getFieldDecorator('sorter', { valuePropName: 'checked' })(
                  <div className='top-down' onClick={this.handleSorter}>
                    <Icon type="caret-up"
                      className={classNames({ 'blue-color': desc })} />
                    <Icon type="caret-down"
                      className={classNames({ 'blue-color': !desc })} />
                    <Checkbox style={{ display: "none" }} />
                  </div>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('search')
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
            <RadioGroup onChange={this.onChange} defaultValue="1">
              <RadioButton style={{ width: 70, height: 32 }} value="1">我的</RadioButton>
              <RadioButton style={{ width: 80, height: 32 }} value="2">
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
                </MenuTemplateCard>)) : null
            }
          </div>
        </Card>
      </div>
    )
  }
}

const WrappedMenuTemplate = Form.create({
  onValuesChange: (props, _, allValues) => {
    console.log(allValues);
    const { dispatch } = props;
    dispatch({
      type: 'menuCenter/handleFetchUnifiedMenu',
      playload: {
        ...allValues
      }
    })
  }
})(MenuTemplate);


export default connect(({ menuCenter }) => ({
  myMenuTemplateData: menuCenter.myMenuTemplate
}))(WrappedMenuTemplate);

