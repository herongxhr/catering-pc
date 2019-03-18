import React, { Component, Fragment } from 'react';
import { Button, Card, Checkbox, Switch, Table } from 'antd';
import { connect } from 'dva';
import DescriptionList from '../../components/DescriptionList';
import BreadcurmbComponent from '../../components/BreadcrumbComponent';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import ShowArrangedDishes from '../../components/ShowArrangedDishes';

const ButtonGroup = Button.Group;
const { Description } = DescriptionList;
const description = (
    <DescriptionList>
        <Description term='使用次数'></Description>
        <Description term='上次使用'></Description>
        <Description term=''></Description>
    </DescriptionList>
);
const action = (
    <Fragment>
        <ButtonGroup>
            <Button>复制</Button>
            <Button>删除</Button>
            <Button>修改</Button>
        </ButtonGroup>
        <Button type='primary'>使用</Button>
    </Fragment>
);

class TemplateDetails extends Component {

    getTemplateDetail = () => {
        const { dispatcth, location } = this.props;
        let { id } = location.state;
        dispatcth({
            type: 'menuCenter/fetchTemplateDetail',
            payload: id
        })
    }

    render() {
        const { location, templateDetails } = this.props;
        return (
            <div>
                <BreadcurmbComponent {...location} />
                <PageHeaderWrapper
                    title={`菜单名称`}
                    logo={
                        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
                    }
                    action={action}
                    content={description}
                    {...this.pros}
                >
                    {/* 排餐区 */}
                    <Card>
                        <ShowArrangedDishes arrangedDishes={''} />
                    </Card>
                </PageHeaderWrapper>
            </div>
        )
    }
}

export default connect(({ menuCenter }) => ({
    arrangedDishes: menuCenter.templateDetail
}))(TemplateDetails)