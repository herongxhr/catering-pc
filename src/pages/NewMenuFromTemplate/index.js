import React, { Component } from 'react';
import { Card } from 'antd';
import { connect } from 'dva';
import ArrangeDishes from '../../components/ArrangeDishes';
import styles from './index.module.less';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';

class NewMenu extends Component {
  render() {
    const { location } = this.props;
    return (
      <div>
        <BreadcrumbComponent {...location} />
        <Card
          className={styles.wrap}>
          <span>适用周次：</span>
          <WeekPicker
            style={{ width: 260 }}
            onChange={() => { }}
            placeholder="选择周次"
          />
        </Card>
        <Card
          className={styles.wrap}
          bodyStyle={{ padding: 20 }}>
          {/* 排餐控件 */}
          <ArrangeDishes weekData={{}} {...this.props} />
        </Card>
      </div>
    )
  }
}

export default connect(({ menuCenter }) => ({
  ...menuCenter
}))(NewMenu);
