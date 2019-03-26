import React, { Component } from 'react';
import { Card, DatePicker, Button, Row, Col } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ArrangeDishes from '../../components/ArrangeDishes';
import styles from './index.module.less';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import EditableTagGroup from '../../components/EditableTagGroup';

const { WeekPicker, } = DatePicker;
class EditTemplate extends Component {
  state = {
    menuTemplateId: '',
    templateFrom: '',
    nd: '',
    week: '',
    dispatch: ''
  }

  static getDerivedStateFromProps(props) {
    const { location } = props;
    // 只有从模板新建，选择了模板后才会有这两个属性
    // 直接自定义菜单是没有这两个属性的
    if (location.state) {
      const { menuTemplateId = '', templateFrom = '' } = location.state;
      return {
        menuTemplateId,
        templateFrom,
      }
    }
    return null;
  }
  // 选择周次回调
  handleSelectWeek = (_, dateString) => {
    const [, nd = '', week = ''] = dateString && dateString.match(/^(\d{4})-(\d{2})/);
    this.setState({ nd, week });
  }
  // 编辑标签的回调
  editTag = (tag, flag) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'menuCenter/editTag',
      payload: { tag, flag }
    })
  }

  handleClickCancel = () => {
    this.state.dispatch(routerRedux.push({
      pathname: '/menubar/my-menu/choice-template'
    }))
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
    const { menuTemplateId, templateFrom, dispatch } = this.state;
    console.log('this.state:', this.state);
    // 如果是从模板新建，要获取相应模板的详情
    if (menuTemplateId) {
      dispatch({
        type: `menuCenter/fetch${templateFrom}TemplateDetails`,
        payload: menuTemplateId
      })
    }
  }
  render() {
    const { location, templateDetails } = this.props;
    const { tags = '' } = templateDetails;
    // 是否从模板新建
    return (
      <div>
        <BreadcrumbComponent {...location} />
        {/* 如果是自定义菜单时显示 */}
        <Card className={styles.wrap}>
          <Row>
            <Col span={8}>
              <Row>
                <Col style={{ marginBottom: 10 }}>适用周次：</Col>
                <Col><WeekPicker
                  style={{ width: 260 }}
                  onChange={this.handleSelectWeek}
                  placeholder="选择周次"
                /></Col>
              </Row>
            </Col>
            <Col span={16}>
              <Row>
                <Col style={{ marginBottom: 10 }}>标签：</Col>
                <Col>{/* 从模板新建才显示标签 */}
                  <EditableTagGroup editTag={this.editTag} tags={tags} /></Col>
              </Row>
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
}))(EditTemplate);
