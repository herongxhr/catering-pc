import React from 'react';
import PageHeader from '../PageHeader';
import { connect } from 'dva';
import GridContent from './GridContent';
import styles from './index.module.less';

const PageHeaderWrapper = ({
    children,
    contentWidth,
    wrapperClassName,
    top,
    ...restPropss
}) => (
        <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
            {top}
            <PageHeader
                wide={contentWidth === 'Fixed'}
                home={'Home'}
                key="pageheader"
                {...restPropss}
            />
            {children ? (
                <div className={styles.content}>
                    <GridContent>{children}</GridContent>
                </div>
            ) : null}
        </div>
    );

export default connect(({ setting }) => ({
    contentWidth: setting.contentWidth,
}))(PageHeaderWrapper);