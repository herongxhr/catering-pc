/*
 * @Author: suwei 
 * @Date: 2019-03-20 15:07:45 
 * @Last Modified by: suwei
 * @Last Modified time: 2019-03-21 17:58:16
 */
import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, Popconfirm, DatePicker, Select, Tag  } from 'antd';
import isEqual from 'lodash/isEqual';

const Option = Select.Option;


class PurOrderTable extends PureComponent {
  index = 0;

  cacheOriginData = {};

  constructor(props) {
    super(props);
    if(props.value.isNew) {
        props.value.records.push({
          id: `NEW_TEMP_ID_${this.index}`,
          commodity: '',
          unit: '',
          price: '',
          number:'',
          supply:'',
          date:'',
          editable: true,
        }
      )
    }
    this.state = {
      data: props.value.records,
      loading: false,
      /* eslint-disable-next-line react/no-unused-state */
      value: props.value.records,
    };
  }

  // static getDerivedStateFromProps(nextProps, preState) {
  //   if (isEqual(nextProps.value, preState.value)) {
  //     return null;
  //   }
  //   return {
  //     data: nextProps.value,
  //     value: nextProps.value,
  //   };
  // }

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => item.id === key)[0];
  }

  toggleEditable = (e, key) => {
    e.preventDefault();
    const { data } = this.state; 
    const newData = data.map(item => ({ ...item })); //赋值editable
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: newData });
    }
  };

  newMember = () => {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    newData.push({
      id: `NEW_TEMP_ID_${this.index}`,
      commodity: '',
      unit: '',
      price: '',
      number:'',
      supply:'',
      date:'',
      editable: true,
    });
    const { onChange } = this.props;
    onChange(newData);
    this.index += 1;
    this.setState({ data: newData });
  };
                                                                                                                                                                                                                                                                                                                                                                                                                    
  remove(id) {
    const { data } = this.state;
    const { onChange } = this.props;
    // debugger;
    const newData = data.filter(item => item.id !== id);
    this.setState({ data: newData });
    onChange(newData);
  }

  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }

  handleFieldChange(e, fieldName, key) {
    const { data } = this.state;
    const { onChange } = this.props;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      onChange(newData);
      this.setState({ data: newData });
    }
  }

  handleDateChange(fieldName,key,date,dateString) {
    const { data } = this.state;
    const { onChange } = this.props
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = dateString;
      onChange(newData);
      this.setState({ data: newData });
    }
  }

  handleSelectChange(value) {
    console.log(value)
  }

  // saveRow = (e, key) => {
  //   // e.persist();
  //   // this.setState({
  //   //   loading: true,
  //   // });
  //   // setTimeout(() => {
  //   //   const { data } = this.state;
  //   //   const { onChange } = this.props;
  //   //   onChange(data);
  //   //   this.setState({
  //   //     loading: false,
  //   //   });
  //   // }, 500);
  //   const { data } = this.state;
  //   const { onChange } = this.props;
  //   onChange(data);
  // }


  render() {
     const tabColumns = [
      {
        title: '商品',
        key: 'commodity',
        dataIndex: 'commodity',
        width: '25%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                style={{width:'190px'}}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'commodity', record.id)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="商品"
              />
            );
          }
          return text;
        },
      },
      {
        title: '单位',
        key: 'unit',
        dataIndex: 'unit',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                style={{width:'60px'}}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'unit', record.id)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="单位"
                disabled
              />
            );
          }
          return text;
        },
      },
      {
        title: '单价',
        key: 'price',
        dataIndex: 'price',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                style={{width:'70px'}}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'price', record.id)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="单价"
              />
            );
          }
          return text;
        },
      },
      {
        title: '数量',
        key: 'number',
        dataIndex: 'number',
        render: (text, record) => {  //render里面三个参数的意思 text , record ,index  当前行的值，当前行数据，行索引
          return (
            <Input
              onChange={e => this.handleFieldChange(e, 'number', record.id)}
              onKeyPress={e => this.handleKeyPress(e, record.id)}
              placeholder="0"
              style={{width:'70px'}}
            />
          );
        },
      },
      {
        title: '供应商',
        key: 'supply',
        dataIndex: 'supply',
        render: (text, record) => {
          return (
            <Select onChange={this.handleSelectChange} style={{width:'218px'}} placeholder='请选择'>
              <Option value="1">Jack</Option>
              <Option value="2">Lucy</Option>
              <Option value="3">Disabled</Option>
              <Option value="4">yiminghe</Option>
            </Select>
          );
        },
      },
      {
        title: '配送日期',
        key: 'date',
        dataIndex: 'date',
        render: (text, record) => {
          return (
            <DatePicker onChange={this.handleDateChange.bind(this,'date',record.id)} style={{width:'130px'}} />
          );
        },
      },
      {
        title: '操作',
        key:'operation',
        render: (text,record) => {
          return (
            <span>
              <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.id)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          )
        }
      }
    ];

    const { loading, data } = this.state;
    let totalLength = null
    if(data) {
      totalLength = data.length
    }
    const CardTitle = () => {
      return (
        <div style={{marginBottom:'20px'}}>
          <span style={{marginRight:'10px'}}>商品明细</span>
          <Tag color="cyan">共{totalLength}条</Tag>        
        </div>
      )
    }
    return (
      <Fragment>
        {CardTitle()}
        <Table
          loading={loading}  //通过loading这个变量的值判断页面是否在加载中
          columns={tabColumns}
          dataSource={data}
          pagination={false}
          rowKey='id'
          // rowClassName={record => (record.editable ? 'editable' : '')} //点击编辑的话样式变化
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
        >
          新增成员
        </Button>
        {/* <Button onClick={this.saveRow}>
          保存
        </Button> */}
      </Fragment>
    );
  }
}

export default PurOrderTable;