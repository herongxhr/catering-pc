import React, { Component } from 'react';
import { Card, DatePicker, Input, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import ArrangeDishes from '../../components/ArrangeDishes';
import styles from './index.module.less';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';

const { WeekPicker,  } = DatePicker;
class NewMenu extends Component {
  editTag = (tag, flag) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'menuCenter/editTag',
      payload: { tag, flag }
    })

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
    const {
      location,
      templateDetails,
    } = this.props;
    // 从location中获取传递过来的新建菜单的类型type
    const { type } = location.state;
    return (
      <div>
        <BreadcrumbComponent {...location} />
        {/* 如果是自定义菜单时显示 */}
        <Card className={styles.wrap}>
          <span>适用周次：
            <WeekPicker
              style={{ width: 260 }}
              onChange={() => { }}
              placeholder="选择周次"
            /></span>
        </Card>
        <Card
          className={styles.wrap}
          style={{ marginBottom: 76 }}
          bodyStyle={{ padding: 20 }}>
          {/* 排餐控件 */}
          <ArrangeDishes weekData={{}} {...this.props} />
        </Card>
        <div className={styles.footerWrap}>
          <div className={styles.footerBtn}>
            <Button>取消</Button>
            <Button type='primary'>保存</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(({ menuCenter }) => ({
  ...menuCenter
}))(NewMenu);
