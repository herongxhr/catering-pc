import React, { Component, Fragment } from 'react';
import { Button, Card, Tag } from 'antd';
import { getYMD, getYMDHms } from '../../utils/utils';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import DescriptionList from '../../components/DescriptionList';
import BreadcurmbComponent from '../../components/BreadcrumbComponent';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import ShowArrangedDishes from '../../components/ShowArrangedDishes';

const ButtonGroup = Button.Group;
const { Description } = DescriptionList;
/**
 * 模板新建后会跳转到详情页
 * 模板查看和编辑页也会跳转到详情页
 * 此时location.state会带有templateFrom属性
 */
class TemplateDetails extends Component {
    state = {
        id: '',
        templateFrom: ''
    }

    static getDerivedStateFromProps(props) {
        const { location } = props;
        if (location.state) {
            const { id = '', templateFrom = '' } = location.state;
            return { id, templateFrom }
        }
        return null;
    }

    // 跳转至模板编辑页
    handleEditTemplate = () => {
        const { id } = this.state;
        this.props.dispatch(routerRedux.push({
            pathname: '/menubar/menu-template/edit-template',
            state: id
        }))
    }

    getTemplateDetails = () => {
        const { id, templateFrom } = this.state;
        this.props.dispatch({
            type: `menuCenter/fetch${templateFrom}TemplateDetails`,
            payload: id
        })
    }

    componentDidMount() {
        this.getTemplateDetails();
    }

    render() {
        const { location, templateDetails, allMealsData } = this.props;
        const tags = templateDetails.tags || '';
        const description = (
            <DescriptionList>
                <Description term='使用次数'>{templateDetails.used}</Description>
                <Description term='上次使用'>{getYMDHms(templateDetails.lastTime) || '未使用'}</Description>
                <Description style={{ clear: 'both' }} term=''>
                    {tags.split(',').map((tag, index) => {
                        const colors = ['cyan', 'orange', 'green', 'magenta', 'lime', 'pruple', 'red', 'blue'];
                        return <Tag key={index} color={colors[index]}>{tag}</Tag>
                    })}
                </Description>
            </DescriptionList>
        );
        const action = (
            <Fragment>
                {false
                    ? (<ButtonGroup>
                        <Button onClick={this.getMenuDetail}>取消</Button>
                        <Button>保存</Button>
                    </ButtonGroup>)
                    : (<ButtonGroup>
                        <Button>复制</Button>
                        <Button>删除</Button>
                        <Button onClick={this.handleEditTemplate}>修改</Button>
                    </ButtonGroup>)}
                <Button type='primary'>使用</Button>
            </Fragment>
        );

        return (
            <div>
                <BreadcurmbComponent {...location} />
                <PageHeaderWrapper
                    title={`模板名称${templateDetails.templateName}`}
                    logo={
                        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
                    }
                    action={action}
                    content={description}
                    {...this.props}
                >
                    {/* 排餐区 */}
                    <Card
                        bordered={false}
                        style={{ marginTop: 20 }}>
                        <ShowArrangedDishes
                            allMealsData={allMealsData}
                        />
                    </Card>
                </PageHeaderWrapper>
            </div>
        )
    }
}

export default connect(({ menuCenter }) => ({
    ...menuCenter
}))(TemplateDetails)