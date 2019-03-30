/*
 * @Author: suwei 
 * @Date: 2019-03-24 10:39:40 
 * @Last Modified by: suwei
 * @Last Modified time: 2019-03-30 10:04:36
 */
import React, { Fragment } from 'react'
import {
  Form, Icon, Button, InputNumber, Menu, Dropdown, Input, message
} from 'antd';
import { connect } from 'dva';
import DosingTable from './DosingTable';

import './Dosing.less'

const validatorPhone = (rule, value, callback) => {
  
  // const values = value.split('-');
  // if (!values[0]) {
  //   callback('Please input your area code!');
  // }
  // if (!values[1]) {
  //   callback('Please input your phone number!');
  // }
  // callback();
};

class Dose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      visible: false,
      selectData:[]
    };
  }

  handleModalVisble = (params) => {
    this.setState({
     visible:false,
    }) 
   }
 
   handleModalHidden = () => {
     this.setState({
       visible:false
     })
   }

   //点击添加按钮进行操作
  add = (params) => {
    this.props.dispatch({
      type: 'meal/addMeal',
      payload: params,
    })
    this.props.dispatch({
      type:'setting/addDosingTable',
      payload:params
    })
  }
  
  //店家删除按钮进行操作
  remove = (k) => {
    const { skuId } = k
    const { props } = this
    props.dispatch({
      type:'setting/delelteDosingTable',
      payload:skuId
    })
    props.dispatch({
      type: 'meal/removeMeal',
      payload:skuId ,
    })
  }

  //请求常用配料列表
  queryDosingTable = () => {
    const { props } = this
    props.dispatch({
      type:'setting/queryDosingTable'
    })
  }

  //请求食材选择器列表
  queryNewOrderSelectf = (e,type) => {
    //级联框数据
    this.queryIngreType()
    const { props } = this
    props.dispatch({
      type:'purOrder/queryOrderSelectf',
      payload:{
        cateringId:'f970fb8a4e99402da175dba8ca87ef1c',
        superiorId:'1',
        notInclude:true,
        type
      },       
      callback: (value) => {
        this.setState({
          visible: true,
          value:value,
        });
      },
    }) 
  }

  queryIngreType = (params = {}) => {
    const { dispatch, } = this.props;
    dispatch({
      type: 'purCatalog/queryIngreType',
      payload: {
        ...params,
      }
    })
	}

  getRowByKey(key, newData) {
    return newData.filter(item => item.skuId === key)[0];
  }

  //Input框改变的时候文本值改变
  handleFieldChange = (e, fieldName, key) => {
    const { props } = this
    const { dosingTable } = props
    const newData = dosingTable.map(item => ({ ...item }));
    const target = this.getRowByKey(key,newData)
    // debugger;
    if(target) {
      target[fieldName] = e.target.value;
      props.dispatch({
        type:'setting/inputChangeDosingTable',
        payload:newData
      })
    }
  }

  handleSubmit = () => {
    const { props } = this
    const { dosingTable } = props
    for(let i = 0; i < dosingTable.length;i++) {
      if(dosingTable[i].quantity) {
        if(dosingTable[i].quantity == '0') {
          message.warning('数量不能为0')  
          return 
        }
      } else {
        message.warning('请完善所有信息')       
        return
      }
    }
    props.dispatch({
      type:'setting/querySaveSettingData',
      payload:dosingTable
    })
  }

  componentDidMount() {
    this.queryDosingTable()
  }

  //挂载的时候清除数据
  componentWillMount() {
    this.props.dispatch({
      type: 'meal/clearMeal',
    })
   }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { dosingTable , modalSelect, purCatalog } = this.props
    const ingreTypeList = purCatalog.ingreTypeList || []
    getFieldDecorator('keys', { initialValue: dosingTable });  // 给keys一个初始值
    const keys = getFieldValue('keys'); //获取输入控件的值
    const formItems = keys.map((k, index) => (
      <Form.Item
        key={k.skuId}
      >
        <span style={{width:'100px',textAlign:'center',display:'inline-block'}}>{k.goodsName}</span>
        <div className='inputNumber'>
          <span className='interval'>/</span>
            <Input 
              defaultValue={k.quantity} 
              style={{width:'70px'}}
              onChange={e => this.handleFieldChange(e, 'quantity', k.skuId)} 
            />
          <span className='interval'>{k.unit}</span>
        </div>
        <Icon
          className="dynamic-delete-button"
          type="minus-circle-o"
          onClick={() => this.remove(k)}
        />
      </Form.Item>
    ));

    // 点击新建时会下拉的按钮
		const dropdownBtn = () => {
			const menu = (
				<Menu>
					<Menu.Item key="FOrder" onClick={(e) => this.queryNewOrderSelectf(e,'S')}>
            食材订单
          </Menu.Item>
					<Menu.Item key="SOrder" onClick={(e) => this.queryNewOrderSelectf(e,'F')}>
            辅料订单
          </Menu.Item>
				</Menu>
			)
			return (
				<span>
					<Dropdown overlay={menu}>
						<Button style={{ width: '330px',height: '32px' }}>
							<Icon type="plus" />新建
						</Button>
					</Dropdown>
				</span>
			)
    }

    //解数据
    const { value , visible } = this.state
    const { records } = value

    return (
      <Fragment>
        <div className='Dosing'>
          <div className='setting-title'>
            <div className='setting-main-title'>
              常用配料
            </div>
            <div className='setting-sub-title'>
              - 可设置日常使用较为频繁食材,将在您生成食材采购订单时自动加入
            </div>
            <div style={{marginTop:'40px',color:'#000000',fontSize:'14px'}}>
              食材/数量
            </div>
          </div>
          <Form onSubmit={this.handleSubmit}>
            {formItems}
            <Form.Item >
              {dropdownBtn()}             
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={this.handleSubmit}>更新配料数据</Button>      
            </Form.Item>
          </Form>
        </div>
        {
          visible ? <DosingTable 
          dataSource={records} 
          handleModalVisble={this.handleModalVisble} 
          handleModalHidden={this.handleModalHidden}
          addMeal={this.add}
          deleteMeal={this.remove}
          mealArray={this.props.mealArray}
          visible={this.state.visible}
          modelSelect={modalSelect}
          ingreTypeList={ingreTypeList}
        /> : null
        }
      </Fragment>
    );
  }
}

const Dosing =  Form.create()(Dose)

export default connect(({setting,purOrder,meal,purCatalog})=>({
  purCatalog:purCatalog,
  modalSelect:purOrder.modalSelect,
  mealArray: meal.mealArray,
  supplier:setting.supplier,
  dosingTable:setting.dosingTable
}))
(Dosing);