import React from 'react'
import { Form , Select , DatePicker , Input, Button ,LocaleProvider   } from "antd";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { connect } from 'dva';
const Option = Select.Option;

const Search = Input.Search;
const FormItem = Form.Item;  
const { RangePicker } = DatePicker;

class PurForm extends React.Component {

  componentDidMount(){
    this.queryIngreType()
  }
  queryIngreType = (params = {}) =>{
    const { dispatch, } = this.props;
    dispatch({
      type:'purCatalog/queryIngreType',
      payload:{
       ...params,
      }
    })
  }
  handleIngreType = (value)=>{
    const { ingreType,queryParams } = this.props;
    this.queryIngreType({
      ingredientType:ingreType,
      catalogId:value
    })
    queryParams({catalogId:value})
  }
  //查询按钮
  handleSubmit = (e) => {
    const { queryPurCatalog,ingreType,current,pageSize } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const startDate = moment(values.orderTime[0]).format('YYYY-MM-DD');
        const endDate = moment(values.orderTime[1]).format('YYYY-MM-DD');
        queryPurCatalog({
            catalogId:values.catalogId,
            startDate:startDate,
            endDate:endDate,
            searchKey:values.searchKey,
            ingredientType:ingreType,
            current:current,
            pageSize:pageSize
          })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const {purCatalog,queryParams} = this.props;
    const ingreTypeList =purCatalog.ingreTypeList || [] ;
    const ingreOptions = ingreTypeList.map((item)=>{
      return(
        <Option value={item.id} key={item.id}>{item.catalogName}</Option>
      )
    })
    return(
      <LocaleProvider locale={zh_CN}>
      <div>
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem label='类别'>
          {
            getFieldDecorator('catalogId',{
                initialValue:'',
            })(
              <Select     
                style={{ width: 170 }}
                onChange={this.handleIngreType}
                placeholder="请选择食材类别"
              > 
               {ingreOptions}
              </Select>            
            )
          }
        </FormItem>

        <FormItem label='定价时间'>
          {
            getFieldDecorator('orderTime',{
                initialValue:'',
            })(
              <RangePicker style={{width:240}}
                onChange={(value)=>{
                  queryParams({orderTime:value})
                }}
              />
            )
          }
        </FormItem>

        <FormItem>
          {
            getFieldDecorator('keywords',{
                initialValue:'',
            })(
              <Input
                placeholder="请输入关键字进行搜索"
                onChange={e => {
                   queryParams({keywords:e.target.value})
                }}
                style={{ width:300,}}
            />
            )
          }
        </FormItem>
        <FormItem>
            <Button type="primary" htmlType="submit" style={{width:74,marginRight:10,marginLeft:39}}>查询</Button>
            <Button htmlType="submit" style={{width:74}}>重置</Button>
        </FormItem>
      </Form>
      </div>
      </LocaleProvider>
    )
  }
}

const WrappedPurForm = Form.create()(PurForm)

export default connect(({ purCatalog}) => ({
  purCatalog,    
}))(WrappedPurForm);

      