import React, { Component } from 'react';
import './Accepting.less';
import { Table, } from 'antd';
import Axios from '../../axios'

const Columns = [{
    title: '配送单号',
    dataIndex: 'order',
    key: 'order',
  }, {
    title: '供应商',
    dataIndex: 'Supplier',
    key: 'Supplier',
  }, {
    title: '配送日期',
    dataIndex: 'Delivery',
    key: 'Delivery',
  }, {
      title: '摘要',
    dataIndex: 'abstract',
      key: 'abstract',
      render: abstract => (
      <span>
        {abstract.map((item,i) => item)}
      </span>
    ),
  }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render(status){
		return status == 1?'已接收': <span style={{color:'#FF9500'}}>未接收</span>
	}
  }];
  const data= [
      {
        "key": 1,
        "status": "1",
        "Supplier": "Anthony",
        "Delivery":'2018-12-02 周二',
        "abstract": [
          "胡萝卜",
          "山药",
          "带鱼",
          "土豆"
        ],
        "order": "25651621",
      },
      {
        "key": 2,
        "status": "0",
        "Supplier": "Jennifer",
        "Delivery":'2018-12-02 周二',
        "abstract": [
          "胡萝卜",
          "山药",
          "带鱼",
          "土豆"
        ],
        "order": "86472",
      },
      {
        "key": 3,
        "status": "1",
        "Supplier": "Daniel",
        "Delivery":'2018-12-02 周二',
        "abstract": [
          "胡萝卜",
          "山药",
          "带鱼",
          "土豆"
        ],
        "order": "665755134",
      },
      {
        "key": 4,
        "status": "1",
        "Supplier": "Jennifer",
        "Delivery":'2018-12-02 周二',
        "abstract": [
          "胡萝卜",
          "山药",
          "带鱼",
          "土豆"
        ],
        "order": "8461896864",
      },
      {
        "key": 5,
        "status": "0",
        "Supplier": "Ruth",
        "Delivery":'2018-12-02 周二',
        "abstract": [
          "胡萝卜",
          "山药",
          "带鱼",
          "土豆"
        ],
        "order": "8686411",
      },
      {
        "key": 6,
        "status": "1",
        "Supplier": "Jason",
        "Delivery":'2018-12-02 周二',
        "abstract": [
          "胡萝卜",
          "山药",
          "带鱼",
          "土豆"
        ],
        "order": "031821",
      },
      {
        "key": 7,
        "status": "1",
        "Supplier": "Linda",
        "Delivery":'2018-12-02 周二',
        "abstract": [
          "胡萝卜",
          "山药",
          "带鱼",
          "土豆"
        ],
        "order": "762022446",
      },
      {
        "key": 8,
        "status": "0",
        "Supplier": "Amy",
        "Delivery":'2018-12-02 周二',
        "abstract": [
          "胡萝卜",
          "山药",
          "带鱼",
          "土豆"
        ],
        "order": "36360",
      },
      {
        "key": 9,
        "status": "1",
        "Supplier": "John",
        "Delivery":'2018-12-02 周二',
        "abstract": [
          "胡萝卜",
          "山药",
          "带鱼",
          "土豆"
        ],
        "order": "657362",
      },
      {
        "key": 10,
        "status": "1",
        "Supplier": "Ruth",
        "Delivery":'2018-12-02 周二',
        "abstract": [
          "胡萝卜",
          "山药",
          "带鱼",
          "土豆"
        ],
        "order": "60813",
      },
      {
        "key": 11,
        "status": "0",
        "Supplier": "Donna",
        "Delivery":'2018-12-02 周二',
        "abstract": [
          "胡萝卜",
          "山药",
          "带鱼",
          "土豆"
        ],
        "order": "5616265",
      },
      {
        "key": 12,
        "status": "0",
        "Supplier": "Thomas",
        "Delivery":'2018-12-02 周二',
        "abstract": [
          "胡萝卜",
          "山药",
          "带鱼",
          "土豆"
        ],
        "order": "377645",
      },
      {
        "key": 13,
        "status": "0",
        "Supplier": "Barbara",
        "Delivery":'2018-12-02 周二',
        "abstract": [
          "胡萝卜",
          "山药",
          "带鱼",
          "土豆"
        ],
        "order": "716429552",
      },
      {
        "key": 14,
        "status": "1",
        "Supplier": "Charles",
        "Delivery":'2018-12-02 周二',
        "abstract": [
          "胡萝卜",
          "山药",
          "带鱼",
          "土豆"
        ],
        "order": "4746819",
      },
      {
        "key": 15,
        "status": "1",
        "Supplier": "Eric",
        "Delivery":'2018-12-02 周二',
        "abstract": [
          "胡萝卜",
          "山药",
          "带鱼",
          "土豆"
        ],
        "order": "861624",
      },
      {
        "key": 16,
        "status": "0",
        "Supplier": "Margaret",
        "abstract": [
          "胡萝卜",
          "山药",
          "带鱼",
          "土豆"
        ],
        "order": "8113665",
      },
      {
        "key": 17,
        "status": "1",
        "Supplier": "Laura",
        "Delivery":'2018-12-02 周二',
        "abstract": [
          "胡萝卜",
          "山药",
          "带鱼",
          "土豆"
        ],
        "order": "663642",
      },
      {
        "key": 18,
        "status": "1",
        "Supplier": "Dorothy",
        "Delivery":'2018-12-02 周二',
        "abstract": [
          "胡萝卜",
          "山药",
          "带鱼",
          "土豆"
        ],
        "order": "4585821",
      },
      {
        "key": 19,
        "status": "0",
        "Supplier": "James",
        "abstract": [
          "胡萝卜",
          "山药",
          "带鱼",
          "土豆"
        ],
        "order": "7177287",
      },
      {
        "key": 20,
        "status": "0",
        "Supplier": "Michael",
        "abstract": [
          "胡萝卜",
          "山药",
          "带鱼",
          "土豆"
        ],
        "order": "609546214",
      }
    ]

  
class Accepting extends Component {
    state={
        todayData:[],
        tomorrowData:[],
    }
    componentDidMount() {
        Axios.ajax({
          url:'/delivery'
        }).then((value) => {
          this.setState({
            todayData:value
          })
        })
      }
    render() {
        console.log(this.state.todayData)
        return ( 
        <div className="accepting">
           <Table columns={Columns} dataSource={data}/> 
        </div>
        );
    }
    }

export default Accepting;
