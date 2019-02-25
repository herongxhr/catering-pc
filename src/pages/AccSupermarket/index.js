import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Breadcrumb, Input, Card, List, InputNumber, Icon, Badge, Drawer } from 'antd';
import GoodsFilter from '../../components/GoodsFilter';
import GoodsCard from '../../components/GoodsCard';
import CartPageBody from '../../components/CartPageBody';
import './index.less';
import goodsWine from './wine.png';

const { Search } = Input;

class AccSupermarket extends PureComponent {
	handChangeValue = () => {

	}
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

	showCartDrawer = () => {
		const { dispatch } = this.props;
		dispatch({
			type: 'accSupermarket/showCartDrawer',
		})

	}
	hideCartDrawer = () => {
		const { dispatch } = this.props;
		dispatch({
			type: 'accSupermarket/hideCartDrawer',
		})

	}
	componentDidMount() {
		console.log('didmout', this.props);
		this.filterGoods();
	}

	render() {

		const {
			goodsList,
			showCartDrawer,
		} = this.props;
		// 购物车商品数量
		const cartWithIconBade = (
			<Badge onClick={this.showCartDrawer} className="cartInner" count={6} showZero >
				<Icon type="shopping-cart" style={{ fontSize: 20 }} />
				<div className="cartText">购物车</div>
			</Badge>
		)

		// 购物车
		const shoppingCartDom = (
			<div className="shoppingCart">{cartWithIconBade}</div>
		)

		// 购物车详情标题
		const cartPageTitle = (
			<div className="cartPageTitle">{cartWithIconBade}</div>
		)

		// 商品展示
		const goodsListDom = (
			<List className="goodsList"
				dataSource={goodsList}
				renderItem={item =>
					(
						<List.Item
							className="listItem"
							key={item.id}
						>
							<GoodsCard className="goodsCard" {...item} />
						</List.Item>
					)
				}
			/>
		)

		return (
			<div className="supermarket-root">
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
				<div className="searchResultWrapper">
					{goodsListDom}
				</div>
				{shoppingCartDom}
				<div className="cartDrawer">
					<Drawer
						placement="right"
						title={cartPageTitle}
						closable={true}
						width={470}
						onClose={this.hideCartDrawer}
						visible={showCartDrawer}
						zIndex={99999}
					>
						<CartPageBody className="CartPageBody" {...this.props}/>
					</Drawer>
				</div>
			</div>
		)
	}
}

export default connect(({ accSupermarket }) => ({
	...accSupermarket,
}))(AccSupermarket);