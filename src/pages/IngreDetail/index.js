import React, { Component } from 'react';
import './index.less';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import { Divider, } from 'antd';
import { connect } from 'dva';
import Img from "./pic.jpg"


class IngreDetail extends Component {
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
    render() {
        const { location, purCatalog } = this.props;
        const detailData = purCatalog.detailData;
        //console.log(detailData,'1111')
        //const property = purCatalog.detailData.property;
        const property =  '产地:新西兰|品种:乳牛|类型:块状';
        let regularObj = []
        let regArr = property.split('|');
        for(var i in regArr){
            var regData = regArr[i].toString().split(':');
            var obj = {
                regKey:regData[0],
                regName:regData[1]
            }
            regularObj.push(obj);
        }
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
                            <div className='ingreBrand'>
                                <div>品牌：<span>{detailData.brand}</span></div>
                                {regularObj.map((item,index) =>{
                                    return(
                                        <div key={index}>{item.regKey}：<span>{item.regName}</span></div>
                                    )
                                })}
                            </div>
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