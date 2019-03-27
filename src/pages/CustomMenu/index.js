import React, { Component } from 'react';
import { Card, DatePicker, Button, Row, Col, message } from 'antd';
import { connect } from 'dva';
import Moment from 'moment';
import ArrangeDishes from '../../components/ArrangeDishes';
import styles from './index.module.less';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import creatHistory from 'history/createBrowserHistory';
import { routerRedux } from 'dva/router';

const history = creatHistory();

const { WeekPicker, } = DatePicker;
class CustomMenu extends Component {
  state = {
    menuTemplateId: '',
    templateFrom: '',
    nd: '',
    week: '',
  }

  static getDerivedStateFromProps(props) {
    const { location } = props;
    // 只有从模板新建，选择了模板后
    // location.state才存在，直接自定义菜单是location.state为undefined
    if (location.state) {
      const { menuTemplateId = '', templateFrom = '' } = location.state;
      return { menuTemplateId, templateFrom }
    }
    return null;
  }

  // 选择周次回调
  handleSelectWeek = (_, dateString) => {
    const [, nd = '', week = ''] = dateString && dateString.match(/^(\d{4})-(\d{2})/);
    this.setState({ nd, week });
  }

  handleClickCancel = () => {
    history.goBack();
  }

  handleClickOk = () => {
    const { dispatch, templateDetails } = this.props;
    const { nd = '', week = '' } = templateDetails;
    // 显示加载按钮
    dispatch({
      type: 'menuCenter/saveNewMenuDataResult',
      payload: ''// 即没有返回id值
    })
    // 从局部state中取数据，再向后端传数据
    const { menuTemplateId, templateFrom, } = this.state;
    dispatch({
      type: 'menuCenter/newMenu',
      payload: {
        menuTemplateId,
        templateFrom,
        nd: this.state.nd || nd,//state中有设置过值则取之，否则取默认
        week: this.state.week || week
      }
    });
  }

  success = () => {
    message.success('菜单保存成功')
  }

  componentDidMount() {
    const { menuTemplateId, templateFrom } = this.state;
    // 如果是从模板新建，要获取相应模板的详情
    if (menuTemplateId) {
      this.props.dispatch({
        type: `menuCenter/fetch${templateFrom}TemplateDetails`,
        payload: menuTemplateId
      })
    }
  }

  componentDidUpdate() {
    const { dispatch, createMenuDataResult } = this.props;
    // 如果createMenuDataResult有id，即为true,定向到详情页
    if (createMenuDataResult !== true) {
      console.log('id:',createMenuDataResult)
      this.success();
      dispatch(routerRedux.push({
        pathname: '/menubar/my-menu/details',
        // 传递后端返回的id
        state: { id: createMenuDataResult }
        
      }))
    }
  }

  render() {
    const { location, createMenuDataResult, templateDetails } = this.props;
    const { nd = '', week = '' } = templateDetails;
    const weekMoment = Moment().week(`${nd}-W${week}`);
    // 是否从模板新建
    return (
      <div>
        <BreadcrumbComponent {...location} />
        {/* 如果是自定义菜单时显示 */}
        <Card className={styles.wrap}>
          <Row>
            <Col span={8}>适用周次：<WeekPicker
              ref={ref => this.weekpicker = ref}
              defaultValue={weekMoment}
              style={{ width: 260 }}
              onChange={this.handleSelectWeek}
              placeholder="选择周次"
            />
            </Col>
          </Row>
        </Card>
        <Card
          className={styles.wrap}
          style={{ marginBottom: 76 }}
          bodyStyle={{ padding: 20 }}>
          {/* 排餐控件 */}
          <ArrangeDishes isMy={true} {...this.props} />
        </Card>
        {/* 底部按钮 */}
        <div className={styles.footerWrap}>
          <div className={styles.footerBtn}>
            <Button
              onClick={this.handleClickCancel}
            >取消</Button>
            <Button
              onClick={this.handleClickOk} type='primary'
              loading={!createMenuDataResult}
            >保存</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(({ menuCenter,loading }) => ({
  loading: loading,
  ...menuCenter
}))(CustomMenu);
