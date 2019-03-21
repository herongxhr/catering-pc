import React, { Component } from 'react';
import { Card, DatePicker, Input, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import ArrangeDishes from '../../components/ArrangeDishes';
import styles from './index.module.less';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import EditableTagGroup from '../../components/EditableTagGroup';

const { WeekPicker, } = DatePicker;
class CustomMenu extends Component {
  state = {
    menuTemplateId: '',
    templateFrom: '',
    type: '',
    nd: '',
    week: ''
  }

  // editTag = (tag, flag) => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'menuCenter/editTag',
  //     payload: { tag, flag }
  //   })
  // }

  handleSelectWeek = (_, dateString) => {
    const [, nd = '', week = ''] = dateString && dateString.match(/^(\d{4})-(\d{2})/);
    this.setState({ nd, week });
  }

  handleClickCancel = () => {
    this.props.history.back();
  }

  handleClickOk = () => {
    const { dispatch } = this.props;
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
    const { location, dispatch } = this.props;
    // 从location中获取传递过来的模板id和是否推荐模板
    const { currTemplateId, isNew } = location.state;
    let fetchFunc;
    if (isNew) {
      fetchFunc = 'fetchNewTemplateDetails';
    } else {
      fetchFunc = 'fetchMyTemplateDetails';
    }
    dispatch({
      type: `menuCenter/${fetchFunc}`,
      payload: currTemplateId
    })
  }
  render() {
    const { location, templateDetails } = this.props;
    // 是否从模板新建
    const { type } = location.state;
    const isFromTemplate = type === 'fromTemplate';
    return (
      <div>
        <BreadcrumbComponent {...location} />
        {/* 如果是自定义菜单时显示 */}
        <Card className={styles.wrap}>
          <span>适用周次：
            <WeekPicker
              style={{ width: 260 }}
              onChange={this.handleSelectWeek}
              placeholder="选择周次"
            /></span>
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
