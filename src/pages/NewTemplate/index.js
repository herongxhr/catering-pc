import React, { Component } from 'react';
import { Card, Button, Row, Col, message, Input } from 'antd';
import { connect } from 'dva';
import ArrangeDishes from '../../components/ArrangeDishes';
import styles from './index.module.less';
import { routerRedux } from 'dva/router';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import EditableTagGroup from '../../components/EditableTagGroup';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
/**
 * 新建模板与编辑模板共用一个页面
 */
class NewTemplate extends Component {
  state = {
    menuTemplateId: '',
    templateFrom: '',
    templateName: '',
    tag: '' // 模板标签
  }

  static getDerivedStateFromProps(props) {
    const { location } = props;
    // 编辑模式才有state
    if (location.state) {
      const { menuTemplateId = '', templateFrom = '' } = location.state;
      return {
        menuTemplateId,
        templateFrom,
      }
    }
    return null;
  }

  // 输入模板名称
  handleTemplateNameInput = e => {
    this.setState({ templateName: e.target.value });
  }
  // 编辑标签的回调
  editTag = (tag, flag) => {
    this.props.dispatch({
      type: 'menuCenter/editTag',
      payload: { tag, flag }
    })
  }

  handleClickCancel = () => {
    history.goBack();
  }

  handleClickOk = () => {
    // 从局部state中取数据，再向后端传数据
    const { templateName } = this.state;
    if (!templateName) {
      this.warning();
      return;
    }
    this.props.dispatch({
      type: 'menuCenter/newTemplate',
      payload: templateName 
    });
  }

  success = () => {
    message.success('模板新建成功')
  }
  warning = () => {
    message.warning('请输入模板名称');
  };

  componentDidMount() {
    const { menuTemplateId, templateFrom } = this.state;
    // 如果是从编辑模板，要获取相应模板的详情
    if (menuTemplateId) {
     this.props.dispatch({
        type: `menuCenter/fetch${templateFrom}TemplateDetails`,
        payload: menuTemplateId
      })
    }
  }

  componentDidUpdate() {
    const { dispatch, newTemplateResult } = this.props;
    // 如果createMenuDataResult有id，即为true,定向到详情页
    if (newTemplateResult) {
      this.success();
      dispatch(routerRedux.push({
        pathname: '/menubar/menu-template/details',
        // 传递后端返回的id
        state: { 
          id: newTemplateResult,
          templateFrom: 'P'
        }
      }))
    }
  }

  render() {
    const { location, loading, tagString } = this.props;
    const isLoading = loading.effects['menuCenter/newTemplate'];
    return (
      <div>
        <BreadcrumbComponent {...location} />
        {/* 如果是自定义菜单时显示 */}
        <Card className={styles.wrap}>
          <Row gutter={24}>
            <Col span={8}>
              <Row>
                <Col style={{ marginBottom: 10 }}>模板名称：</Col>
                <Col>
                  <Input
                    allowClear
                    onChange={this.handleTemplateNameInput} />
                </Col>
              </Row>
            </Col>
            <Col span={16}>
              <Row>
                <Col style={{ marginBottom: 10 }}>标签：</Col>
                <Col>{/* 从模板新建才显示标签 */}
                  <EditableTagGroup editTag={this.editTag} tagString={tagString} /></Col>
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
            <Button
              onClick={this.handleClickOk}
              loading={isLoading}
              type='primary'>保存</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(({ menuCenter, loading }) => ({
  loading,
  ...menuCenter
}))(NewTemplate);
