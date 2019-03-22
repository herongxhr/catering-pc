import React from 'react';
import { Row, Col, Card, Button, Divider } from 'antd';
import { routerRedux } from 'dva/router';
import TemplateCard from '../../components/TemplateCard';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import { connect } from 'dva';
import './index.less'

class ChoiceTemplate extends React.Component {
  state = {
    currTemplateId: '',
    isNew: ''
  }

  // 对模板进行查看选择操作
  handleTemplateActions = (e, id, isNew) => {
    const { dispatch } = this.props;
    // 通过e.target.id来获取当前操作类型copy,delete,edit
    const action = e.target.id;
    // 查看模板
    if (action === 'preview') {
      dispatch(routerRedux.push({
        pathname: '/menubar/menu-template/details',
        state: id
      }))
      return;
    }
    // 点击选择按钮
    if (action === 'choice') {
      // 记录当前操作的模板id
      this.setState({
        currTemplateId: id,
        isNew
      });
    }
  }
  // 点击下一步回调
  handleClickOk = () => {
    const { dispatch } = this.props;
    const { currTemplateId, isNew } = this.state;
    dispatch(routerRedux.push({
      pathname: '/menubar/my-menu/from-template',
      state: { currTemplateId, isNew }
    }))
  }
  // 点击取消回调
  handleClickCancel = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push({
      pathname: '/menubar/my-menu',
    }))
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // 获取推荐模板数据
    dispatch({
      type: 'menuCenter/fetchNewMenuTemplate',
    });
    // 获取我的模板数据
    dispatch({
      type: 'menuCenter/fetchMyMenuTemplate',
    });
  }

  render() {
    const {
      location,
      myMenuTemplate,
      newMenuTemplate,
    } = this.props
    const { currTemplateId, isNew } = this.state;
    return (
      <div>
        <BreadcrumbComponent {...location} />
        <Card
          title='请选择模板'
          className='templateCardWrap'
          bodyStyle={{ padding: '30px 30px 0' }}
        >
          <div className='cardsWrapper'>
            {newMenuTemplate.records
              && newMenuTemplate.records.length > 0
              && newMenuTemplate.records
                .slice(0, 3).map(item =>
                  <TemplateCard
                    // 当前卡片与点击的卡片是同一个，并且是推荐模板
                    isSelect={item.id === currTemplateId && isNew === true}
                    isNew={true}
                    key={item.id}
                    itemData={item}
                    handleTemplateActions={this.handleTemplateActions}>
                  </TemplateCard>)}
          </div>
          {/* 分隔线 */}
          <Row>
            <Col><Divider orientation='left'>我的模板：</Divider></Col>
          </Row>
          <div className='cardsWrapper'>
            {myMenuTemplate.records
              && myMenuTemplate.records.length > 0
              && myMenuTemplate.records
                .slice(0, 6).map(item =>
                  (<TemplateCard
                    // 当前卡片与点击的卡片是同一个，并且不是推荐模板
                    isSelect={item.id === currTemplateId && isNew === false}
                    key={item.id}
                    itemData={item}
                    handleTemplateActions={this.handleTemplateActions}>
                  </TemplateCard>))}
          </div>
        </Card>
        <div className={'footerWrap'}>
          <div className={'footerBtn'}>
            <Button onClick={this.handleClickCancel}>取消</Button>
            <Button onClick={this.handleClickOk} type='primary'>下一步</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(({ menuCenter }) => ({
  myMenuTemplate: menuCenter.myMenuTemplate,
  newMenuTemplate: menuCenter.newMenuTemplate
}))(ChoiceTemplate);

