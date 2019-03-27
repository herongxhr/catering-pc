import React, { Component } from 'react';
import './index.less';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import { Divider, } from 'antd';
import { connect } from 'dva';
import Img from "./pic.jpg"

class ExcipientDetail extends Component{
    queryIngreDetail = (params = {}) => {
        const { dispatch, location } = this.props;
         const id=location.state.skuId;
        dispatch({
            type: 'purCatalog/queryIngreDetail',
            payload: {
               ...params,
                id: id
            }
        })
    }
    componentDidMount() {
        this.queryIngreDetail()
    }
    render(){
        const { location, purCatalog } = this.props;
        const detailData = purCatalog.detailData;
        return(
            <div className='excipientDetail'>
                <div className='wrapper'>
                <BreadcrumbComponent {...location}/>
                </div>
                <div className='excidetailwrapper'>
                    <div className='excidetailcontent'>
                        <div className='goodmess'>
                            <div className='goodmessTitle'>
                                商品信息
                            </div>
                            <ul className='exciMess'>
                                <li>名称：<span>{detailData.goodsName}</span></li>
                                <li style={{marginLeft:100,marginRight:100}}>分类：<span>{detailData.catalogName}</span></li>
                                <li>储存方法：<span>{detailData.storage}</span></li>
                            </ul>
                        </div>
                        <Divider />
                        <div className='regmess'>
                            <div className='regmessTitle'>
                                规格信息
                            </div>
                            <ul className='exciBrand'>
                                <li>品牌：<span>{detailData.brand}</span></li>
                                <li style={{marginLeft:100,marginRight:100}}>规格描述：<span>{detailData.spec}</span></li>
                                <li>备注：<span>{detailData.description}</span></li>
                            </ul>
                        </div>
                        <Divider />
                        <div className='picture'>
                            <div className='pictureTitle'>
                                图片
                            </div>
                            <div className='piclist'>
                                <img src={detailData.img0} alt=""></img>
                                <img src={detailData.img1} alt="" style={{marginLeft:30,marginRight:30}}></img>
                                <img src={detailData.img2} alt=""  style={{marginRight:30}}></img>
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
                                <div style={{marginTop:20,marginBottom:30}}>热能(MJ)：<span>6</span></div>
                                <Divider />
                                <div className='yycf'>
                                    <div>营养成分</div>
                                    <ul>
                                        <li>蛋白质(g)：<span>{detailData.dbz}</span></li>
                                        <li>脂肪(g)：<span>{detailData.zf}</span></li>
                                        <li>胆固醇(g)：<span>{detailData.dgc}</span></li>
                                    </ul>
                                    <ul>
                                        <li>碳水化合物(g)：<span>{detailData.tshhw}</span></li>
                                    </ul>
                                </div>
                                <Divider />
                                <div className='element'>
                                    <div>微量元素</div>
                                    <ul>
                                        <li>
                                            膳食纤维(g)：
                                            <span>{detailData.ssxw}</span>
                                        </li>
                                        <li>维生素A(ugRAE)：<span>{detailData.wssa}</span></li>
                                        <li>维生素C(ugRAE)：<span>{detailData.wssc}</span></li>
                                    </ul>
                                    <ul>
                                        <li>维生素e(ugRAE)：<span>{detailData.wsse}</span></li>
                                        <li>胡萝卜素(mg)：<span>{detailData.hlbs}</span></li>
                                        <li>烟酸(mg)：<span>{detailData.ys}</span></li>
                                    </ul>
                                    <ul>
                                        <li>核黄素(mg)：<span>{detailData.hhs}</span></li>
                                        <li>硫胺素(mg)：<span>{detailData.las}</span></li>
                                        <li>视黄醇当量(ug)：<span>{detailData.shcdl}</span></li>
                                    </ul>
                                    <ul> 
                                        <li>钾(mg)：<span>{detailData.jia}</span></li>
                                        <li>钠(mg)：<span>{detailData.na}</span></li>
                                        <li>钙(mg)：<span>{detailData.gai}</span></li>
                                    </ul>
                                    <ul>
                                        <li>镁(mg)：<span>{detailData.mei}</span></li>
                                        <li>铁(mg)：<span>{detailData.tie}</span></li>
                                        <li>锰(mg)：<span>{detailData.meng}</span></li>
                                    </ul>
                                    <ul>
                                        <li>锌(mg)：<span>{detailData.xin}</span></li>
                                        <li>铜(mg)：<span>{detailData.tong}</span></li>
                                        <li>磷(mg)：<span>{detailData.lin}</span></li>
                                    </ul>
                                    <ul>
                                        <li>硒(mg)：<span>{detailData.xi}</span></li>
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
                                    <p >1.文字描述文字描述文字描述文字描述文字描述</p>
                                    <p >2.文字描述文字描述文字描述文字描述文字描述</p>
                                    <p >3.文字描述文字描述文字描述文字描述文字描述文字描述</p>
                                    <p >4.文字描述文字描述文字描述文字描述文字描述</p>
                                    <p >5.文字描述文字描述文字描述</p>
                                </div>
                                <div className='standList'>
                                <img src={Img} alt=""></img>
                                <img src={Img} alt="" style={{marginLeft:30,marginRight:30}}></img>
                                <img src={Img} alt=""  style={{marginRight:30}}></img>
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
}))(ExcipientDetail)