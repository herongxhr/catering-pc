import React from 'react';
// import classNames from 'classnames';
import styles from './index.less';

// 类似于按钮组的东西，显示效果更接近链接
export default class TabLInks extends React.Component {
    //点击筛选数据
    clickToFilter = clickedItem => {
        const { dispatch } = this.props;
        dispatch({
            type: 'accSupermarket/doFilter',
            payload: clickedItem,
        })
    }

    render() {
        //当前选中项和列表
        const {
            linksData,
            currSelect
        } = this.props;

        // 只选辅料分类
        const tabLinks = linksData
            .map(item => {
                // 是否有active样式
                const itemStyle = item.id == currSelect ? 'filterLink active' : 'filterLink';
                return (
                    <li
                        className={itemStyle}
                        key={item.id}
                        onClick={() => this.clickToFilter(item)}
                    >
                        {item.catalog_name || item.brand_name || item.status_name }
                    </li>
                )
            })

        return (
            <div style={{display: "inline-block"}} >
                <ul>
                    {tabLinks}
                </ul>
            </div>
        )
    }
} 