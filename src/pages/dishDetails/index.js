import React, { Component } from 'react';
import './index.less';
import TwoBread from '../../components/TwoBread';
import { Divider, Table } from 'antd';
import Img from "./pic.jpg"

class IngreDetail extends Component {
    render() {
        const { location } = this.props;
        const columns = [{
            title: '食材',
            dataIndex: 'ingredient',
            key: 'ingredient',
          }, {
            title: '数量',
            dataIndex: 'count',
            key: 'count',
          }, {
            title: '计量单位',
            dataIndex: 'unit',
            key: 'unit',
          }];
        return (
            <div className='ingreDetail'>
                <div className='wrapper'>
                    <TwoBread title='一级目录' subTitle='详情' />
                </div>
                <div className='dishdetailwrapper'>
                    <div className='dishdetailcontent'>
                        <div className='baseMess'>
                            <div className='baseMessTitle'>
                                基本信息
                            </div>
                            <ul className='baseMess'>
                                <li>名称：<span>番茄烧蛋</span></li>
                                <li style={{ marginLeft: 100, marginRight: 100 }}>类别：<span>素菜</span></li>
                                <li>别名：<span>西红柿炒鸡蛋</span></li>
                            </ul>
                        </div>
                        <Divider />
                        <div className='ingreTable'>
                            <div className='ingreTableTitle'>
                                食材明细
                            </div>
                            <Table columns={columns} />
                        </div>
                        <Divider />
                        <div className='picture'>
                            <div className='pictureTitle'>
                                图片
                            </div>
                            <div className='piclist'>
                                <img src={Img} alt=""></img>
                                <img src={Img} alt="" style={{ marginLeft: 30, marginRight: 30 }}></img>
                                <img src={Img} alt="" style={{ marginRight: 30 }}></img>
                                <img src={Img} alt=""></img>
                            </div>
                        </div>
                        <Divider />
                        <div className='fireMethod'>
                            <div className='fireMethodTitle'>
                                烧制方法
                            </div>
                            <div className='fireMethodContent'>
                                <div className='describ'>
                                    <p>1.文字描述文字描述文字描述文字描述文字描述</p>
                                    <p className='item'>2.文字描述文字描述文字描述文字描述文字描述</p>
                                    <p className='item'>3.文字描述文字描述文字描述文字描述文字描述文字描述</p>
                                    <p className='item'>4.文字描述文字描述文字描述文字描述文字描述</p>
                                    <p className='item'>5.文字描述文字描述文字描述</p>
                                </div>
                                <div className='fireMethodPic'>
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
export default IngreDetail;