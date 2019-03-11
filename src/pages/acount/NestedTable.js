import React from 'react'
import {
  Table, Select,Modal,Icon
} from 'antd';

import './NestedTable.less'

const Option = Select.Option;

function CustomExpandIcon(props) {
  let text;
  if (props.expanded) {
    text = '&#x25BC';
  } else {
    text = '&#x25BA';
  }
  return (
    <a
      className="expand-row-icon"
      onClick={e => props.onExpand(props.record, e)}
      dangerouslySetInnerHTML={{ __html: text }}
      style={{ color: 'gray', cursor: 'pointer' }}
    />
  );
}

class NestedTable extends React.Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  expandedRowRender = () => {
    const columns = [
      { dataIndex: 'category', key: 'category' },
      { dataIndex: 'Supplier', key: 'Supplier' },
      {
        key: 'operation',
        render: () => (
          <a onClick={this.showModal}>
            设置
          </a>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        category: '米类',
        Supplier: '宁波方兴食品有限公司',
      });
    }
    return (
      <Table
        showHeader={false}
        columns={columns}
        dataSource={data}
        pagination={false}
        expandedRowRender={this.expandedThirdRowRender}
        expandIcon={CustomExpandIcon}
      />
    );
  };

  expandedThirdRowRender = () => {
    const columns = [
      { dataIndex: 'category', key: 'category' },
      { dataIndex: 'Supplier', key: 'Supplier' },
      {
        key: 'operation',
        render: () => (
          <a onClick={this.showModal}>
            设置
          </a>
        ),
      },
    ];
    
    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        category: '黄豆',
        Supplier: '东阳市康有食品有限公司',
      });
    }
    return(
      <Table
        className='thirdTable'
        showHeader={false}
        columns={columns}
        dataSource={data}
        pagination={false}
      ></Table>
    )
  }



  render() {
    const columns = [
      { title: '食材类别', dataIndex: 'name', key: 'name' },
      { title: '供应商', dataIndex: 'supply', key: 'supply' },
      { 
        title: '操作',
        key: 'setting',
        render: () => (
          <a onClick={this.showModal}>
            设置
          </a>
        ),
      },
    ];

    const data = [];

    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        name: '粮油米面',
        supply: '东阳市康有食品有限公司'
      });
    }
    const modalObject = {
      height:'273px'
    }
    return (
      <div>
        <Table
          className="components-table-demo-nested"
          columns={columns}
          expandedRowRender={this.expandedRowRender}
          dataSource={data}
          expandIcon={CustomExpandIcon}
        />
        <Modal
          title="设置供货商"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width='370px'
          bodyStyle={modalObject}
        >
          <Select defaultValue="1" style={{ width: 300 }} onChange={this.handleChange}>
            <Option value="1">东阳市康有食品有限公司</Option>
            <Option value="2">浙江方兴食品有限公司</Option>
          </Select>
        </Modal>
      </div>

    );
  }

}

export default NestedTable