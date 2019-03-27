import React, { Component } from 'react';
import { Card, DatePicker, Button } from 'antd';
import Moment from 'moment';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import ArrangeDishes from '../../components/ArrangeDishes';
import styles from './index.module.less';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const { WeekPicker, } = DatePicker;
class AdjustMenu extends Component {
  state = {
    id: '',
    type: '',
    nd: '',
    week: ''
  }

  static getDerivedStateFromProps(props) {
    const { location } = props;
    if (location.state) {
      const { id = '', type = '' } = location.state;
      return { id, type }
    }
    return null;
  }

  // 从location.state中获取页面传过来的参数
  // 根据type值的不同，调用不同方法来请求不同的接口
  getMenuDetail = () => {
    const { id, type } = this.state;
    const url = type === 'unified-menu' ? 'Unified' : 'My';
    this.props.dispatch({
      type: `menuCenter/fetch${url}MenuDetails`,
      payload: id
    })
  }

  handleSelectWeek = (_, dateString) => {
    const [, nd = '', week = ''] = dateString && dateString.match(/^(\d{4})-(\d{2})/);
    this.setState({ nd, week });
  }

  handleClickCancel = () => {
    history.goBack();
  }

  handleClickOk = () => {
    const { id, nd, week } = this.state;
    this.props.dispatch({
      type: 'menuCenter/updateMenu',
      payload: { id, nd, week, }
    });
  }

  componentDidMount() {
    this.getMenuDetail();
  }

  render() {
    const { location, menuDetails } = this.props;
    const nd = menuDetails.nd || '';
    const week = menuDetails.week || '';
    const weekMoment = Moment().week(`${nd}-W${week}`);
    // 新建菜单的类型type
    const { type } = this.state;
    const isMy = type === 'my-menu';
    return (
      <div>
        <BreadcrumbComponent {...location} />
        {/* 如果是自定义菜单时显示 */}
        {isMy && <Card className={styles.wrap}>
          <span>适用周次：
            <WeekPicker
              defaultValue={weekMoment}
              style={{ width: 260 }}
              onChange={this.handleSelectWeek}
              placeholder="选择周次"
            /></span>
        </Card>}
        <Card
          className={styles.wrap}
          style={{ marginBottom: 76 }}
          bodyStyle={{ padding: 20 }}>
          {/* 排餐控件 */}
          <ArrangeDishes isMy={isMy} {...this.props} />
        </Card>
        {/* 底部按钮 */}
        <div className={styles.footerWrap}>
          <div className={styles.footerBtn}>
            <Button onClick={this.handleClickCancel}>取消</Button>
            <Button onClick={this.handleClickOk} type='primary'>保存</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(({ menuCenter }) => ({
  ...menuCenter
}))(AdjustMenu);
