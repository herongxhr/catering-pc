import React from 'react';
import MarketCommodity from '../../components/SuperMarket';
import { Breadcrumb, Input, Card, Row, Col, Button, List } from 'antd';
import styles from './index.less';

const { Search } = Input;

class C extends React.Component {
	render() {
		return (
			<div className={styles.standardList}>
				<div>
					<Breadcrumb>
						<Breadcrumb.Item>辅料超市</Breadcrumb.Item>
					</Breadcrumb>
					<Search className={styles.goodsSearch} placeholder="请输入关键字进行搜索" onSearch={() => ({})} />
				</div>
				<Card bordered={false}>
					<Row>
						<Col>123</Col>
					</Row>
					<Row>
						<Col>123</Col>
					</Row>
					<Row>
						<Col>123</Col>
					</Row>
				</Card>
				<div>
					<List>
						<List.Item >
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

export default C