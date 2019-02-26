import React from 'react';
// import classNames from 'classnames';
import styles from './index.less';

// 类似于按钮组的东西，显示效果更接近链接
export default class GoodsFilter extends React.Component {
    state = {
        brandLimit: true,
        showMoreText: true,
    }
    handleShowMoreBrand = () => {
        this.setState({
            brandLimit: !this.state.brandLimit,
            showMoreText: !this.state.showMoreText,
        })
    }
    
    render() {
        const {
            clickToFilter,
            className,
            catalogList,
            brandList,
            collectStatus,
            currCatalog,
            currBrand,
            currCollectStatus,
        } = this.props;
        // 按分类筛选
        const catalogFilter = catalogList.map(item => {
            //是否有active样式
            const itemStyle = item.id == currCatalog ? 'filterLink filterActive' : 'filterLink';
            return (
                <li
                    className={itemStyle}
                    key={item.id}
                    onClick={() => clickToFilter(item.id, currBrand, currCollectStatus)}
                >
                    {item.catalog_name}
                </li>
            )
        })

        // 按品牌筛选
        console.log(brandList);
        const brandFilter = brandList.slice(0, (this.state.brandLimit ? 10 : 100)).map(item => {
            //是否有active样式
            const itemStyle = item.id == currBrand ? 'filterLink filterActive' : 'filterLink';
            return (
                <li
                    className={itemStyle}
                    key={item.id}
                    onClick={() => clickToFilter(currCatalog, item.id, currCollectStatus)}
                >
                    {item.brand_name}
                </li>
            )
        }).concat(<li className="filterLink moreBrand" onClick={this.handleShowMoreBrand} key={brandList.length + 1}>{this.state.showMoreText ? "更多" : "收起"}</li>)

        // 按收录状态筛选
        const collectStatusFilter = collectStatus.map(item => {
            //是否有active样式
            const itemStyle = item.id == currCollectStatus ? 'filterLink filterActive' : 'filterLink';
            return (
                <li
                    className={itemStyle}
                    key={item.id}
                    onClick={() => clickToFilter(currCatalog, currBrand, item.id)}
                >
                    {item.status_name}
                </li>
            )
        })

        return (
            <div className="filterWraper">
                <ul className="filterRow">
                    <span className="filterTitle">分类</span>
                    {catalogFilter}
                </ul>
                <ul className="filterRow">
                    <span className="filterTitle">品牌</span>
                    <span className="brandWrapper">{brandFilter}</span>
                </ul>
                <ul className="filterRow">
                    <span className="filterTitle">收录</span>
                    {collectStatusFilter}
                </ul>
            </div>
        )
    }
} 