import React, { Component } from 'react';
import { Card, DatePicker, Input, Row, Col, Tag, Button } from 'antd';
import { connect } from 'dva';
import ArrangeDishes from '../../components/ArrangeDishes';
import styles from './index.module.less';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import EditableTagGroup from '../../components/EditableTagGroup';

const { WeekPicker } = DatePicker;
class NewMenu extends Component {
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
    const {
      templateName = '',
      tags = '',
    } = templateDetails;
    return (
      <div>
        <BreadcrumbComponent {...location} />
        {/* 如果是自定义菜单时显示 */}
        {type === 'my-menu' && <Card className={styles.wrap}>
          <span>适用周次：</span>
          <WeekPicker
            style={{ width: 260 }}
            onChange={() => { }}
            placeholder="选择周次"
          />
        </Card>}
        {type !== 'my-menu' && <Card
          title='基本属性'
          className={styles.wrap}
          bodyStyle={{ padding: 20 }}>
          <Row gutter={32} >
            <Col span={8}>
              <Row style={{ marginBottom: 10 }}><Col>模板名称</Col></Row>
              <Row><Col><Input value={templateName} /></Col></Row>
            </Col>
            <Col span={16}>
              <Row style={{ marginBottom: 10 }}><Col>标签</Col></Row>
              <Row><Col>
                <EditableTagGroup tags={tags} />
              </Col></Row>
            </Col>
          </Row>
        </Card>}
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
