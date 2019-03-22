import React, { Component } from 'react';
import { Card, DatePicker, Button, Row, Col } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ArrangeDishes from '../../components/ArrangeDishes';
import styles from './index.module.less';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';

const { WeekPicker, } = DatePicker;
class CustomMenu extends Component {
  state = {
    menuTemplateId: '',
    templateFrom: '',
    nd: '',
    week: '',
    dispatch: ''
  }

  static getDerivedStateFromProps(props) {
    const { location, dispatch } = props;
    // 只有从模板新建，选择了模板后才
    // location.state才存在
    // 直接自定义菜单是没有这两个属性的
    if (location.state) {
      const { menuTemplateId = '', templateFrom = '' } = location.state;
      return {
        menuTemplateId,
        templateFrom,
        dispatch
      }
    }
    return null;
  }
  // 选择周次回调
  handleSelectWeek = (_, dateString) => {
    const [, nd = '', week = ''] = dateString && dateString.match(/^(\d{4})-(\d{2})/);
    this.setState({ nd, week });
  }

  handleClickCancel = () => {
    this.state.dispatch(routerRedux.push({
      pathname: '/menubar/my-menu/choice-template'
    }))
  }

  handleClickOk = () => {
    const { dispatch } = this.state;
    const { menuTemplateId, templateFrom, nd, week } = this.state;
    dispatch({
      type: 'menuCenter/newMenuSummary',
      payload: { menuTemplateId, templateFrom, nd, week, }
    });
    dispatch({
      type: 'menuCenter/newMenuData'
    });
  }

  componentDidMount() {
    const { menuTemplateId, templateFrom, dispatch } = this.state;
    // 如果是从模板新建，要获取相应模板的详情
    if (menuTemplateId) {
      dispatch({
        type: `menuCenter/fetch${templateFrom}TemplateDetails`,
        payload: menuTemplateId
      })
    }
  }
  render() {
    const { location } = this.props;
    // 是否从模板新建
    return (
      <div>
        <BreadcrumbComponent {...location} />
        {/* 如果是自定义菜单时显示 */}
        <Card className={styles.wrap}>
          <Row>
            <Col span={8}>适用周次：<WeekPicker
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
}))(CustomMenu);
