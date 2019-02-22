import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Breadcrumb, Input, Card, List, InputNumber } from 'antd';
import GoodsFilter from '../../components/GoodsFilter';
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
	componentDidMount() {
		this.filterGoods();
	}

	render() {
		const cardData = [
			{
				title: '谷常多 稻米油 压榨 浓香 花生油 5L',
				price: 45,
				priceType: "元/箱",
				description: "浙江帝景生态农业开发有限公司",
			},
			{
				title: '谷常多 稻米油 压榨 浓香 花生油 5L',
				price: 45,
				priceType: "元/箱",
				description: "浙江帝景生态农业开发有限公司",
			},
			{
				title: '谷常多 稻米油 压榨 浓香 花生油 5L',
				price: 45,
				priceType: "元/箱",
				description: "浙江帝景生态农业开发有限公司",
			},
			{
				title: '谷常多 稻米油 压榨 浓香 花生油 5L',
				price: 45,
				priceType: "元/箱",
				description: "浙江帝景生态农业开发有限公司",
			},
			{
				title: '谷常多 稻米油 压榨 浓香 花生油 5L',
				price: 45,
				priceType: "元/箱",
				description: "浙江帝景生态农业开发有限公司",
			},
			{
				title: '谷常多 稻米油 压榨 浓香 花生油 5L',
				price: 45,
				priceType: "元/箱",
				description: "浙江帝景生态农业开发有限公司",
			},
			{
				title: '谷常多 稻米油 压榨 浓香 花生油 5L',
				price: 45,
				priceType: "元/箱",
				description: "浙江帝景生态农业开发有限公司",
			},
			{
				title: '谷常多 稻米油 压榨 浓香 花生油 5L',
				price: 45,
				priceType: "元/箱",
				description: "浙江帝景生态农业开发有限公司",
			},
		];

		const goodsList = (
			<List className="goodsList"
				dataSource={cardData}
				renderItem={item => {
					const goodsTitle = (
						<div className="goodsTitle">{item.title}</div>
					)
					const goodsDescription = (
						<div>
							<h4>￥ {item.price} {item.priceType}</h4>
							<div className="goodsProvider">{item.description}</div>
						</div>
					)
					return (
						<List.Item
							className="listItem"
						>
							<Card
								className="goodsCard"
								bordered={false}
								actions={[<InputNumber
									defaultValue={1}
									min={1}
									size="small"
									onChange={this.handChangeValue}
								/>, <a>加入购物车</a>]}
								hoverable
								cover={<img alt="example" src={goodsWine} />}
							>
								<Card.Meta
									className="cardMeta"
									title={goodsTitle}
									description={goodsDescription}
								/>
							</Card>
						</List.Item>
					)
				}
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
					<GoodsFilter clickToFilter={this.filterGoods} {...this.props.accSupermarket} />
				</div>
				<div className="searchResultWrapper">
					{goodsList}
				</div>
			</div>
		)
	}
}

// AccSupermarket;
export default connect(({ accSupermarket }) => ({
	accSupermarket,
}))(AccSupermarket);