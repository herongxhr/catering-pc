import React, { Component } from 'react';
import './index.less';
import SubHeader from '../../components/SubHeader';
import { List} from 'antd'
import { withRouter } from "react-router";

const data = [
    '豆瓣酱/海天/280g/瓶',
  ];
 const gooddata=[
     '豆瓣酱/海天/580g/瓶',
     '豆瓣酱/美味鲜/280g/瓶',
     '豆瓣酱/味事达/1kg/瓶'
 ] 
class ReportDetail extends Component{
    state={
        detail:'详情'
    }
    //未通过的详情页，封装一个函数
    noPass = ()=>{
        return(
            <div className='detailcontent'>
                    <div className='apply'>
                        <div className='applyTitle'>
                            入库申请
                        </div>
                        <ul>
                            <li>申请日期：<span>2019-01-28</span></li>
                            <li style={{marginLeft:100,marginRight:100}}>名称：<span>海天豆瓣酱</span></li>
                            <li>类型：<span>辅料</span></li>
                            <li>备注：<span>280g一瓶那种</span></li>
                        </ul>
                    </div>
                    <div className='review'>
                        <div className='reviewTitle'>
                            审核结果
                        </div>
                        <ul style={{height:70,borderBottom:'1px solid #E8E8E8'}}>
                            <li>申请日期：<span>2019-01-28</span></li>
                            <li style={{marginLeft:100}}>状态：<span>未通过</span></li>
                        </ul>
                        <div className='receiptinfo'>
                            回执信息
                        </div>
                        <div className='mess' onClick={()=>{console.log('11111')}}>
                            <List
                            bordered
                            dataSource={data}
                            renderItem={item => (
                                <List.Item actions={[<a style={{color:'#54C4CE'}}>查看详情</a>]}>
                                    {item}
                                </List.Item>)}
                            />
                        </div>
                    </div>
                </div>
        )
    }
    render(){
        return(
            <div className='reportdetail'>
                <div className='detailheader'>
                    <div className='breadwrapper'><SubHeader title='工作台' subTitle='缺样上报' cascade={this.state.detail}/></div>
                </div>
                <div className='detailcontent'>
                    <div className='apply'>
                        <div className='applyTitle'>
                            入库申请
                        </div>
                        <ul>
                            <li>申请日期：<span>2019-01-28</span></li>
                            <li style={{marginLeft:100,marginRight:100}}>名称：<span>海天豆瓣酱</span></li>
                            <li>类型：<span>辅料</span></li>
                            <li>备注：<span>280g一瓶那种</span></li>
                        </ul>
                    </div>
                    <div className='review'>
                        <div className='reviewTitle'>
                            审核结果
                        </div>
                        <ul style={{height:70,borderBottom:'1px solid #E8E8E8'}}>
                            <li>申请日期：<span>2019-01-28</span></li>
                            <li style={{marginLeft:100}}>状态：<span>已通过</span></li>
                        </ul>
                        <div className='receiptinfo'>
                            回执信息
                        </div>
                        <div className='mess' onClick={()=>{this.props.history.push('/excipientdetail')}}>
                            <List
                            bordered
                            dataSource={data}
                            renderItem={item => (
                                <List.Item actions={[<a style={{color:'#54C4CE'}}>查看详情</a>]}>
                                    {item}
                                </List.Item>)}
                            />
                        </div>
                    </div>
                    <div className='relategood'>
                        <div className='goodTitle'>
                            相关商品
                        </div>
                        <div className='goodlist'>
                            <List
                            bordered
                            dataSource={gooddata}
                            renderItem={item => (
                                <List.Item onClick={()=>{console.log('22222')}} actions={[<a style={{color:'#54C4CE'}}>查看详情</a>]}>
                                     {item}
                                </List.Item>)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const ShowReportDetailRouter = withRouter(ReportDetail);
export default ShowReportDetailRouter