import React, { PureComponent } from 'react';
import { Tabs, Skeleton } from 'antd';
import classNames from 'classnames';
import './index.less';
import BreadcrumbView from './breadcrumb';

const { TabPane } = Tabs;
export default class PageHeader extends PureComponent {
    onChange = key => {
        const { onTabChange } = this.props;
        if (onTabChange) {
            onTabChange(key);
        }
    };

    render() {
        const {
            title,
            logo,
            action,
            content,
            extraContent,
            tabList,
            className,
            tabActiveKey,
            tabDefaultActiveKey,
            tabBarExtraContent,
            loading = false,
            wide = false,
            hiddenBreadcrumb = false,
        } = this.props;

        const clsString = classNames("pageHeader", className);
        const activeKeyProps = {};
        if (tabDefaultActiveKey !== undefined) {
            activeKeyProps.defaultActiveKey = tabDefaultActiveKey;
        }
        if (tabActiveKey !== undefined) {
            activeKeyProps.activeKey = tabActiveKey;
        }
        return (
            <div className={clsString}>
                <div className={wide ? "wide" : ''}>
                    <Skeleton
                        loading={loading}
                        title={false}
                        active
                        paragraph={{ rows: 3 }}
                        avatar={{ size: 'large', shape: 'circle' }}
                    >
                        {hiddenBreadcrumb ? null : <BreadcrumbView {...this.props} />}
                        <div className={"detail"}>
                            {logo && <div className={"logo"}>{logo}</div>}
                            <div className={"main"}>
                                <div className={"row"}>
                                    {title && <h1 className={"title"}>{title}</h1>}
                                    {action && <div className={"action"}>{action}</div>}
                                </div>
                                <div className={row}>
                                    {content && <div className={"content"}>{content}</div>}
                                    {extraContent && <div className={"extraContent"}>{extraContent}</div>}
                                </div>
                            </div>
                        </div>
                        {tabList && tabList.length ? (
                            <Tabs
                                className={"tabs"}
                                {...activeKeyProps}
                                onChange={this.onChange}
                                tabBarExtraContent={tabBarExtraContent}
                            >
                                {tabList.map(item => (
                                    <TabPane tab={item.tab} key={item.key} />
                                ))}
                            </Tabs>
                        ) : null}
                    </Skeleton>
                </div>
            </div>
        );
    }
}
