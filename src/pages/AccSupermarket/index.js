import React from 'react';
import { queryCatalogF } from '../../services/api';
import { Layout, Breadcrumb, Input, Card, Row, Col, Button, List } from 'antd';
import './index.less';

const { Search } = Input;

class AccSupermarket extends React.Component {
	componentDidMount() {
		queryCatalogF();
	}
	render() {
		return (
			<div className="supermarket-root">
				<div className="header-container">
					<Breadcrumb style={{ marginLeft: 24 }}>
						<Breadcrumb.Item>辅料超市</Breadcrumb.Item>
					</Breadcrumb>
					<Search className="goodsSearch" placeholder="请输入关键字进行搜索" onSearch={() => ({})} />
				</div>
				<div className="section-wrapper">
					<div className="goods-filter">
						<div className="filter-row"><span className="filter-title">分类</span><a type="primary">全部</a></div>
						<div className="filter-row"><span className="filter-title">品牌</span><a type="primary">全部</a></div>
						<div className="filter-row"><span className="filter-title">收录</span><a type="primary">全部</a>
							<a>采购目录中商品</a>
							<a>采购目录外商品</a>
						</div>
					</div>
				</div>
				<div>
					<List>
						<List.Item >
							<Card
								hoverable
								style={{ width: 278, height: 375 }}
								cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
								actions={[<a>操作一</a>, <a>加入购物车</a>]}>
								<Card.Meta
									title="谷常多 稻米油 压榨 浓香 花生油 5L"
									description="浙江帝景生态农业开发有限公司"
								>
								</Card.Meta>
							</Card>
							<Card
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
							<Card
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
							<Card
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

export default AccSupermarket;