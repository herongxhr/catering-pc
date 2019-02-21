import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

// 类似于按钮组的东西，显示效果更接近链接
const TabLinks = ({ className, linksData, handleClick }) => {
    const clsString = classNames(className);
    clickToFilter = clickedItem => {
        const { id } = clickedItem;
        const { distpatch } = this.props;
        dispatch({
            type: 'accSupermarket/fetchFilteredGoods',
            payload: id
        })
    }
    //当前选中项和列表
    const { curr, list } = filterProp;
    // 只选辅料分类
    const tabLinks = list.filter(item => item.type === "F")
        // 按item.sort排序
        .sort((a, b) => +a.sort - +b.sort)
        .map(item => {
            // 是否有active样式
            const itemStyle = item.id == curr ? 'filterLink active' : 'filterLink';
            <li style={itemStyle} {...other} key={item.id} onClick={handleClick}>{item.catalog_name}</li>
        })

    return (
        <div className={clsString}>
            <ul>
                {tabLinks}
            </ul>
        </div>
    )

}

export default TabLinks;