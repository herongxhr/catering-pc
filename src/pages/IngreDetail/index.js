import React, { Component } from 'react';
import './index.less';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import { Divider, } from 'antd';
import { connect } from 'dva';
import Img from "./pic.jpg"


class IngreDetail extends Component {
    queryIngreDetail = (params = {}) => {
        const { dispatch, location } = this.props;
        // const id=location.state.id;
        dispatch({
            type: 'purCatalog/queryIngreDetail',
            payload: {
                //    ...params,
                id: 1
            }
        })
    }
    componentDidMount() {
        this.queryIngreDetail()
    }
    render() {
        const { location, purCatalog } = this.props;
        const detailData = purCatalog.detailData;
        const property = purCatalog.detailData.property;
        return (
            <div className='ingreDetail'>
                <BreadcrumbComponent {...location} />
                <div className='ingredetailwrapper'>
                    <div className='ingredetailcontent'>
                        <div className='goodmess'>
                            <div className='goodmessTitle'>
                                商品信息
                            </div>
                            <ul className='ingreMess'>
                                <li>名称：<span>{detailData.goodsName}</span></li>
                                <li style={{ marginLeft: 100, marginRight: 100 }}>分类：<span>{detailData.subcatalogName}</span></li>
                                <li>别名：<span>{detailData.otherName}</span></li>
                                <li>上市季节：<span>全年</span></li>
                                <li style={{ marginLeft: 100 }}>计量单位：<span>{detailData.unit}</span></li>
                            </ul>
                        </div>
                        <Divider />
                        <div className='regmess'>
                            <div className='regmessTitle'>
                                规格信息
                            </div>
                            <ul className='ingreBrand'>
                                <li>品牌：<span>{detailData.brand}</span></li>
                                <li style={{ marginLeft: 100, marginRight: 100 }}>品种：<span>{detailData.unit}</span></li>
                                <li>饲养方式：<span>{detailData.unit}</span></li>
                                <li>分类：<span>{detailData.unit}</span></li>
                                <li style={{ marginLeft: 100, }}>商品毛重：<span>{detailData.unit}</span></li>
                            </ul>
                        </div>
                        <Divider />
                        <div className='picture'>
                            <div className='pictureTitle'>
                                图片
                            </div>
                            <div className='piclist'>
                                <img src={detailData.img0} alt=""></img>
                                <img src={detailData.img1} alt="" style={{ marginLeft: 30, marginRight: 30 }}></img>
                                <img src={detailData.img2} alt="" style={{ marginRight: 30 }}></img>
                                <img src={detailData.img3} alt=""></img>
                            </div>
                        </div>
                        <Divider />
                        <div className='nutrition'>
                            <div className='nutTitle'>
                                营养成分
                            </div>
                            <div className='nutcontent'>
                                <div>能量</div>
                                <div style={{ marginTop: 20, marginBottom: 30 }}>热能(MJ)：<span>{detailData.rl}</span></div>
                                <Divider />
                                <div className='yycf'>
                                    <div>营养成分</div>
                                    <ul>
                                        <li>蛋白质(g)：<span>{detailData.dbz}</span></li>
                                        <li>脂肪(g)：<span>{detailData.zf}</span></li>
                                        <li>碳水化合物(g)：<span>{detailData.tshhw}</span></li>
                                    </ul>
                                </div>
                                <Divider />
                                <div className='element'>
                                    <div>微量元素</div>
                                    <ul>
                                        <li>钙(mg)：<span>{detailData.gai}</span></li>
                                        <li>铁(Fe)：<span>{detailData.tie}</span></li>
                                        <li>
                                            膳食纤维(g)：
                                            <span>{detailData.ssxw}</span>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>维生素A(ugRAE)：<span>{detailData.wssa}</span></li>
                                        <li >锌(mg)：<span>{detailData.xin}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <Divider />
                        <div className='standard'>
                            <div className='standardTitle'>
                                验收标准
                            </div>
                            <div className='standardcontent'>
                                <div className='describ'>
                                    <p>1.文字描述文字描述文字描述文字描述文字描述</p>
                                    <p className='item'>2.文字描述文字描述文字描述文字描述文字描述</p>
                                    <p className='item'>3.文字描述文字描述文字描述文字描述文字描述文字描述</p>
                                    <p className='item'>4.文字描述文字描述文字描述文字描述文字描述</p>
                                    <p className='item'>5.文字描述文字描述文字描述</p>
                                </div>
                                <div className='standlist'>
                                    <img src={Img} alt=""></img>
                                    <img src={Img} alt="" style={{ marginLeft: 30, marginRight: 30 }}></img>
                                    <img src={Img} alt="" style={{ marginRight: 30 }}></img>
                                    <img src={Img} alt=""></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(({ purCatalog }) => ({
    purCatalog,
}))(IngreDetail)