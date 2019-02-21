import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Breadcrumb, Input, Card, List } from 'antd';
import TabLinks from '../../components/TabLinks';
import './index.less';

const { Search } = Input;

class AccSupermarket extends PureComponent {
	componentDidMount() {
		const { dispatch } = this.props;
		//请求辅料分类
		dispatch({
			type: 'accSupermarket/fetchCatalog',
		});

		//获取热销产品，每个分类1-2个
		// dispatch({
		// 	type: 'accSupermarket/fetchHotGoods',
		// });
	}

	render() {
		console.log(this.props);
		const {
			accSupermarket: {
				catalogList,
				currCatalog,
				brandList,
				currBrand,
				collectStatusList,
				currCollectStatus,
			}
		} = this.props;
		console.log(catalogList, brandList);
		const allCatalogStyle = !currCatalog ? 'filterLink active' : "filterLink";
		const allBrandStyle = !currBrand ? 'filterLink active' : "filterLink";
		const allCollectStyle = !currCollectStatus ? 'filterLink active' : "filterLink";
		return (
			<div className="supermarket-root">
				<div className="header-container">
					<Breadcrumb style={{ marginLeft: 24 }}>
						<Breadcrumb.Item>辅料超市</Breadcrumb.Item>
					</Breadcrumb>
					<Search className="goodsSearch" placeholder="请输入关键字进行搜索" onSearch={() => ({})} />
				</div>
				<div className="section-wrapper">
					<p>
						<span className="filter-title">分类</span>
						<a className={allCatalogStyle}>全部</a>
						<TabLinks
							linksData={catalogList}
							currSelect={currCatalog}
							{...this.props}
						/>
					</p>
					<p>
						<span className="filter-title">品牌</span>
						<a className={allBrandStyle}>全部</a>
						<TabLinks
							linksData={brandList}
							currSelect={currBrand}
							{...this.props}
						/>
					</p>
					<p>
						<span className="filter-title">收录</span>
						<a className={allCollectStyle}>全部</a>
						<TabLinks
							linksData={collectStatusList}
							currSelect={currCollectStatus}
							{...this.props}
						/>
					</p>
				</div>
				<div>
					<List
					>
						<List.Item
							style={{
								background: "#fff"
								, padding: 10
							}}
						>
							<Card
								bodyStyle={{ padding: "10px" }}
								bordered={false}
								hoverable
								style={{ width: 278 }}
								cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
								actions={[<a>操作一</a>, <a>加入购物车</a>]}>
								<Card.Meta
									title="谷常多 稻米油 压榨 浓香 花生油 5L"
									description="浙江帝景生态农业开发有限公司"
								>
								</Card.Meta>
							</Card>
						</List.Item>
						<List.Item
							style={{
								background: "#fff"
								, padding: 10
							}}
						>
							<Card
								bodyStyle={{ padding: "10px" }}
								bordered={false}
								hoverable
								style={{ width: 278 }}
								cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
								actions={[<a>操作一</a>, <a>加入购物车</a>]}>
								<Card.Meta
									title="谷常多 稻米油 压榨 浓香 花生油 5L"
									description="浙江帝景生态农业开发有限公司"
								>
								</Card.Meta>
							</Card>
						</List.Item>
						<List.Item
							style={{
								background: "#fff"
								, padding: 10
							}}
						>
							<Card
								bodyStyle={{ padding: "10px" }}
								bordered={false}
								hoverable
								style={{ width: 278 }}
								cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
								actions={[<a>操作一</a>, <a>加入购物车</a>]}>
								<Card.Meta
									title="谷常多 稻米油 压榨 浓香 花生油 5L"
									description="浙江帝景生态农业开发有限公司"
								>
								</Card.Meta>
							</Card>
						</List.Item>
						<List.Item
							style={{
								background: "#fff"
								, padding: 10
							}}
						>
							<Card
								bodyStyle={{ padding: "10px" }}
								bordered={false}
								hoverable
								style={{ width: 278 }}
								cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
								actions={[<a>操作一</a>, <a>加入购物车</a>]}>
								<Card.Meta
									title="谷常多 稻米油 压榨 浓香 花生油 5L"
									description="浙江帝景生态农业开发有限公司"
								>
								</Card.Meta>
							</Card>
						</List.Item>
					</List>
				</div>
				{/* <MarketCommodity /> */}
			</div>
		)
	}
}

// AccSupermarket;
export default connect(({ accSupermarket }) => ({
	accSupermarket,
}))(AccSupermarket);