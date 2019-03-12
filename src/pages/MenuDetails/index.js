import React, { Fragment } from 'react'
import { Card, Button, Row, Col, Checkbox, Switch, Table, Tag } from 'antd'
import { Steps } from 'antd';
import DescriptionList from '../../components/DescriptionList';
import BreadcrumbComponents from '../../components/BreadcrumbComponent';
import PageHeadWrapper from '../../components/PageHeaderWrapper';
import styles from './index.module.less'

const Step = Steps.Step;

const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  if (index === 4) {
    obj.props.colSpan = 0;
  }
  return obj;
};

const { Description } = DescriptionList;
const ButtonGroup = Button.Group;
// 定义表格列
const tabColumns = [
  {
    title: 'weekday',
    dataIndex: 'weekday',
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {}
      }
      if (index == 0) {
        obj.props.rowSpan = 5
      }
      if (index == 1 || index == 2 || index == 3 || index == 4) {
        obj.props.rowSpan = 0
      }
      return obj
    },
  },
  {
    title: '早餐',
    dataIndex: 'breakfast',
  },
  {
    title: '中餐',
    dataIndex: 'lunch',
  },
  {
    title: '点心',
    dataIndex: 'dessert',
  },
  {
    title: '晚餐',
    dataIndex: 'supper',
  }
];

// 详细描述
const description = (
  <DescriptionList className={styles.headerList} size="small" col="2">
    <Description term="周次">{"orderChannel"}</Description>
    <Description term="下达单位">{'orderInfo.distributionDate'}</Description>
    <Description term="日期">{'orderInfo.createTime'}</Description>
    <Description term="下达时间">{'orderInfo.remark'}</Description>
  </DescriptionList>
);

export default class MenuDetails extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'unifiedMenus/queryList',
      payload: { a: 1 }
    })
  }

  onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  }

  render() {
    const {
      location,
    } = this.props;
    const { id, status } = location.state;

    // 操作区
    const action = (
      <Fragment>
        <ButtonGroup>
          <Button>打印</Button>
          {!status && <Button>恢复</Button>}
          {!status && <Button>调整菜单</Button>}
        </ButtonGroup>
        <Button type="primary">采购食材</Button>
      </Fragment>
    );

    // 汇总区
    const extra = (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>状态</div>
          <div className={styles.heading}>{status ? '已执行' : '待执行'}</div>
        </Col>
      </Row>
    );

    const cardTitle = (
      <span className={styles.cardTitle}>商品明细：<Tag color="cyan">共{'goodsDetail.length'}条</Tag></span>
    );

    return (
      <div className='menuDetails'>
        <BreadcrumbComponents {...location} />
        <PageHeadWrapper
          title={`菜单编号：${1234578}`}
          logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
          action={action}
          content={description}
          extraContent={extra}
          {...this.props}
        >
          {/* 进度条 */}
          <Card>
            <Steps current={1} progressDot>
              <Step title="菜单下达" description="2018-11-25 11:09" />
              <Step title="采购订单" description="待采购" />
              <Step title="下达订单" description="" />
            </Steps>
          </Card>
          {/* 排餐区 */}
          <Card>
            <div style={{ margin: 20 }} >
              <span>
                <Checkbox onChange={this.onChange}>配料详情</Checkbox>
                <Checkbox onChange={this.onChange}>收起空餐饮</Checkbox>
              </span>
              <span>
                图片模式<Switch onChange={this.onChange} />
              </span>
            </div>
            <Table
              columns={tabColumns}
              dataSource={''}
              bordered
            />
          </Card>
        </PageHeadWrapper>
      </div>
    )
  }
}
