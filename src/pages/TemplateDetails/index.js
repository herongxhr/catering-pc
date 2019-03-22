import React, { Component, Fragment } from 'react';
import { Button, Card, Row, Col, Tag } from 'antd';
import { connect } from 'dva';
import Moment from 'moment';
import DescriptionList from '../../components/DescriptionList';
import BreadcurmbComponent from '../../components/BreadcrumbComponent';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import ShowArrangedDishes from '../../components/ShowArrangedDishes';
import ArrangeDishes from '../../components/ArrangeDishes';

const ButtonGroup = Button.Group;
const { Description } = DescriptionList;
class TemplateDetails extends Component {
    state = {
        isArrangeDish: false
    }

    // 显示排餐表格
    handleArrangeDishes = () => {
        this.setState({
            isArrangeDish: true
        })
    }

    getTemplateDetail = () => {
        const { dispatch, location } = this.props;
        let { id } = location.state;
        dispatch({
            type: 'menuCenter/fetchMyTemplateDetails',
            payload: id
        })
    }

    componentDidMount() {
        this.getTemplateDetail();
    }

    render() {
        const { location, templateDetails } = this.props;
        // 加默认值初始取值时不容易报错
        const {
            camenuTemplateDetailVOMap = {},
            id = '',
            templateName = '',
            used = 0,
            tags = '',
            lastTime = '',
            priceDataMap = {}
        } = templateDetails;
        const { isArrangeDish } = this.state;
        const description = (
            <DescriptionList>
                <Description term='使用次数'>{used}</Description>
                <Description term='上次使用'>{Moment(lastTime).format('YYYY-MM-DD HH:mm')}</Description>
                <Description style={{ clear: 'both' }} term=''>
                    {tags.split(',').map((item, index) =>
                        <Tag key={index} color='green'>{item}</Tag>)}
                </Description>
            </DescriptionList>
        );
        const action = (
            <Fragment>
                {isArrangeDish
                    ? (<ButtonGroup>
                        <Button onClick={this.getMenuDetail}>取消</Button>
                        <Button>保存</Button>
                    </ButtonGroup>)
                    : (<ButtonGroup>
                        <Button>复制</Button>
                        <Button>删除</Button>
                        <Button onClick={this.handleArrangeDishes}>修改</Button>
                    </ButtonGroup>)}
                <Button type='primary'>使用</Button>
            </Fragment>
        );

        return (
            <div>
                <BreadcurmbComponent {...location} />
                <PageHeaderWrapper
                    title={`模板名称${templateName}`}
                    logo={
                        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
                    }
                    action={action}
                    content={description}
                    {...this.props}
                >
                    {/* 排餐区 */}
                    <Card bordered={false}
                        style={{ marginTop: 20 }}>
                        {isArrangeDish
                            ? <ArrangeDishes
                                // isMy判断是不是我的菜单从而对菜品操作权限不同
                                isMy={true}
                                // weekData为原始的排餐数据
                                weekData={camenuTemplateDetailVOMap}
                                {...this.props} />
                            : <ShowArrangedDishes
                                // arrangedDishes为已排菜品数据
                                arrangedDishes={camenuTemplateDetailVOMap}
                                // priceDataMap为每餐预估价信息
                                priceDataMap={priceDataMap}
                            />}
                    </Card>
                </PageHeaderWrapper>
            </div>
        )
    }
}

export default connect(({ menuCenter }) => ({
    ...menuCenter
}))(TemplateDetails)