import React, { Fragment } from 'react';
import { Card, Button, Row, Col, Steps } from 'antd';
import { connect } from 'dva';
import DescriptionList from '../../components/DescriptionList';
import BreadcrumbComponents from '../../components/BreadcrumbComponent';
import PageHeadWrapper from '../../components/PageHeaderWrapper';
import styles from './index.module.less';
import ShowArrangedDishes from '../../components/ShowArrangedDishes';
import ArrangeDishes from '../../components/ArrangeDishes';

const Step = Steps.Step;

const { Description } = DescriptionList;
const ButtonGroup = Button.Group;
class MenuDetails extends React.Component {
  state = {
    isArrangeDish: false
  }

  // 从location.state中获取页面传过来的参数
  // 根据type值的不同，调用不同方法来请求不同的接口
  getMenuDetail = () => {
    const { dispatch, location } = this.props;
    const { id, type } = location.state;
    const url = type === 'unified' ? 'Unified' : 'My';
    dispatch({
      type: `menuCenter/fetch${url}MenuDetails`,
      payload: { id }
    })
  }

  // 显示排餐表格
  handleArrangeDishes = () => {
    this.setState({
      isArrangeDish: true
    })
  }

  componentDidMount() {
    this.getMenuDetail();
  }

  render() {
    const { location, menuDetails } = this.props;
    const {
      date, menuCode, issuedTime,
      executeTime, orderCreateTime,
      status, superiorName, week,
      camenuDetailVOMap = {},
      priceDataMap = {}
    } = menuDetails;
    const { type } = location.state;
    // 是否我的菜单
    const isMy = type === 'my' ? true : false;
    // 记录订单是否已经执行，在下面内容中根据条件显示
    const isExecuted = status === '已执行' ? true : false;
    const { isArrangeDish } = this.state;
    // 操作区
    const action = (
      <Fragment>
        {isArrangeDish
          ? (<ButtonGroup>
            <Button onClick={this.getMenuDetail}>取消</Button>
            {!isExecuted && <Button>保存</Button>}
          </ButtonGroup>)
          : (<ButtonGroup>
            <Button>打印</Button>
            {!isExecuted && <Button>恢复</Button>}
            {!isExecuted && <Button onClick={this.handleArrangeDishes}>调整菜单</Button>}
          </ButtonGroup>)}
        {isExecuted
          ? <Button type="primary">查看采购单</Button>
          : <Button type="primary">采购食材</Button>}
      </Fragment>
    );
    // 详细描述
    const description = (
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term="周次">{week}</Description>
        {!isMy && <Description term="下达单位">{superiorName}</Description>}
        <Description term="日期">{date}</Description>
        <Description term="下达时间">{orderCreateTime}</Description>
      </DescriptionList>
    );
    // 汇总区
    const extra = (
      <Row>
        <Col>
          <div className={styles.textSecondary}>状态</div>
          <div style={{ fontSize: 18 }}>{status}</div>
        </Col>
      </Row>
    );

    return (
      <div className='menuDetails'>
        <BreadcrumbComponents {...location} />
        <PageHeadWrapper
          title={`菜单编号：${menuCode}`}
          logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
          action={action}
          content={description}
          extraContent={extra}
          {...this.props}
        >
          {/* 进度条 */}
          <Card style={{ width: 1160, marginTop: 20 }}>
            <Steps current={isExecuted ? 2 : 1} progressDot>
              <Step title="菜单下达" description={issuedTime} />
              <Step title="采购订单" description={executeTime} />
              <Step title="下达订单" description={isExecuted && orderCreateTime} />
            </Steps>
          </Card>
          {/* 排餐区 */}
          <Card
            style={{ width: 1160, marginTop: 20 }}
            bodyStyle={{ padding: 20 }}
          >
            {isArrangeDish
              ? <ArrangeDishes isMy={isMy} arrangedMeals={camenuDetailVOMap} {...this.props} />
              : <ShowArrangedDishes
                arrangedDishes={camenuDetailVOMap}
                priceDataMap={priceDataMap}
              />}
          </Card>
        </PageHeadWrapper>
      </div>
    )
  }
}

export default connect(({ menuCenter }) => ({
  ...menuCenter
}))(MenuDetails)