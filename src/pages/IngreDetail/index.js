import React, { Component } from 'react';
import './index.less';
import TwoBread from '../../components/TwoBread';
import { Divider,Row, Col } from 'antd';
import Img from "./pic.jpg"

class IngreDetail extends Component{
    render(){
        return(
            <div className='ingreDetail'>
                <div className='wrapper'>
                    <TwoBread title='一级目录' subTitle='详情'/>
                </div>
                <div className='ingredetailwrapper'>
                    <div className='ingredetailcontent'>
                        <div className='goodmess'>
                            <div className='goodmessTitle'>
                                商品信息
                            </div>
                            <ul className='ingreMess'>
                                <li>名称：<span>豆瓣酱</span></li>
                                <li style={{marginLeft:100,marginRight:100}}>分类：<span>厨房调味</span></li>
                                <li>别名：<span>油鸡，土鸡</span></li> 
                                <li>上市季节：<span>全年</span></li>
                                <li style={{marginLeft:100}}>计量单位：<span>斤</span></li> 
                            </ul>
                        </div>
                        <Divider />
                        <div className='regmess'>
                            <div className='regmessTitle'>
                                规格信息
                            </div>
                            <ul className='ingreBrand'>
                                <li>品牌：<span>海天</span></li>
                                <li style={{marginLeft:100,marginRight:100}}>品种：<span>油鸡</span></li>
                                <li>饲养方式：<span>散养</span></li>
                                <li>分类：<span>大公鸡</span></li>
                                <li style={{marginLeft:100,}}>商品毛重：<span>1.25</span></li>
                            </ul>
                        </div>
                        <Divider />
                        <div className='picture'>
                            <div className='pictureTitle'>
                                图片
                            </div>
                            <div className='piclist'>
                                <img src={Img} alt=""></img>
                                <img src={Img} alt="" style={{marginLeft:30,marginRight:30}}></img>
                                <img src={Img} alt=""  style={{marginRight:30}}></img>
                                <img src={Img} alt=""></img>
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
                                        <li>蛋白质(g)：<span>6</span></li>
                                        <li>脂肪(g)：<span>6</span></li>
                                        <li>碳水化合物(g)：<span>6</span></li>
                                    </ul>
                                </div>
                                <Divider />
                                <div className='element'>
                                    <div>微量元素</div>
                                    <ul>
                                        <li>维生素B1(mg)：<span>6</span></li>
                                        <li style={{marginLeft:350,marginRight:348}}>维生素B2(mg)：<span>6</span></li>
                                        <li>钙(mg)：<span>6</span></li>
                                    </ul>
                                    <ul>
                                        <li>铁(Fe)：<span>5</span></li>
                                       <li style={{marginLeft:402,marginRight:360}}>膳食纤维(g)：<span>2</span></li>
                                        <li>维生素A(ugRAE)：<span>6</span></li>
                                    </ul>
                                    <ul>
                                       <li>维生素A(ugRAE)：<span>6</span></li>
                                       <li style={{marginLeft:334}}>锌(mg)：<span>6</span></li>
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
                                <img className='standardPic' src={Img} alt=''> 
                                </img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default IngreDetail;