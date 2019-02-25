import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Breadcrumb, Input, List, Icon, Badge, } from 'antd';
import CartPage from '../CartPage';
import GoodsFilter from '../../components/GoodsFilter';
import GoodsCardList from '../../components/GoodsCardList';

import './index.less';

const { Search } = Input;

class AccSupermarket extends PureComponent {
    /**
     * 点击链接按要求请求后台数据
     * 有三个筛选条件，还有一个默认条件选择辅料
     * 写在api方法queryGoods中
     * @param{number} currCatalog 当前所选分类
     * @param{number} currBrand 当前所选分类
     * @param{number} currCollectStatus 当前所选分类
     */
	filterGoods = (currCatalog = 0, currBrand = 0, currCollectStatus = 0) => {
		const { dispatch } = this.props;
		dispatch({
			type: 'accSupermarket/fetchGoodsF',
			payload: {
				currCatalog,
				currBrand,
				currCollectStatus
			},
		})
	}

	// 显示购物车页面
	showCartDrawer = () => {
		const { dispatch } = this.props;
		dispatch({
			type: 'accSupermarket/showCartDrawer',
		})

	}

	componentDidMount() {
		this.filterGoods();
	}

	render() {
		// 悬浮购物车图标
		const cartSquare = (
			<div className="shoppingCart">
				<Badge onClick={this.showCartDrawer} className="cartInner" count={6} >
					<Icon type="shopping-cart" style={{ fontSize: 20 }} />
					<div className="cartText">购物车</div>
				</Badge>
			</div>
		)

		return (
			<div className="supermarket-root">
				{/* 页面头部：面包屑+搜索框 */}
				<div className="header-container">
					<Breadcrumb style={{ marginLeft: 24 }}>
						<Breadcrumb.Item>辅料超市</Breadcrumb.Item>
					</Breadcrumb>
					<Search className="goodsSearch" placeholder="请输入关键字进行搜索" onSearch={() => ({})} />
				</div>

				{/* 筛选区域 */}
				<div className="section-wrapper">
					<GoodsFilter clickToFilter={this.filterGoods} {...this.props} />
				</div>

				{/* 筛选商品结果列表 */}
				<div className="goodsCardList">
					<GoodsCardList  {...this.props} />
				</div>
				
				{/* 悬浮购物车图标 */}
				{cartSquare}

				{/* 购物车详情页 */}
				<CartPage {...this.props} />
			</div>
		)
	}
}

export default connect(({ accSupermarket }) => ({
	...accSupermarket,
}))(AccSupermarket);