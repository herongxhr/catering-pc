import React from 'react';
import { Modal, Select, Input, Table } from 'antd';
// import './index.less';

const { Search } = Input;
const { Option } = Select;
class SelectIngredients extends React.Component {
    state = {
        currId: ''
    }
    handleAdd = record => {
        this.setState({
            currId: record.id
        })
    }
    render() {
        const tableColumns = [
            {
                title: '食材名称',
                key: 'name',
                dataIndex: 'name'
            },
            {
                title: '计量单位',
                key: 'catalog',
                dataIndex: 'catalog'
            },
            {
                title: '规格',
                key: 'detail',
                dataIndex: 'detail'
            },
            {
                title: '价格',
                key: 'price',
                dataIndex: 'price'
            },
            {
                title: '供应商',
                key: 'su',
                dataIndex: 'su'
            },
            {
                title: '图片',
                key: 'img',
                dataIndex: 'img',
                render: () => <a>查看</a>
            },
            {
                title: '操作',
                key: 'add',
                dataIndex: 'add',
								render: (_, record) =>
									{		
										   return(
												 record.id !== this.state.currId
                        ? <a onClick={() => this.handleAdd(record)}>选择</a>
                        : <span>已选</span>
											 ) 
									}
            },
        ];

        const {
            handleModalVisble,
            handleFilter,
            visible
        } = this.props;

        const tableData = [
            {
                id: 3,
                name: "番茄炒蛋",
                catalog: "素菜",
                detail: "番茄20g/鸡蛋30g/番茄...",
            },
            {
                id: 4,
                name: "番茄炒蛋",
                catalog: "素菜",
                detail: "番茄20g/鸡蛋30g/番茄...",
            },
            {
                id: 5,
                name: "番茄炒蛋",
                catalog: "素菜",
                detail: "番茄20g/鸡蛋30g/番茄...",
            },
            {
                id: 6,
                name: "番茄炒蛋",
                catalog: "素菜",
                detail: "番茄20g/鸡蛋30g/番茄...",
            },
            {
                id: 7,
                name: "番茄炒蛋",
                catalog: "素菜",
                detail: "番茄20g/鸡蛋30g/番茄...",
            }
        ]
        return (
            <Modal
                wrapClassName="selectDish"
                width={1100}
                closable={false}
                bodyStyle={{
                    height: "650px",
                }}
                title="选择辅料"
                visible={visible}
                okText="保存"
                onOk={handleModalVisble}
                onCancel={handleModalVisble}
            >
                <div>
                    <div>
                        <label style={{ width: 42 }}>辅料类别：
                                <Select
																	style={{width:'170px'}}
                                onChange={(value) => handleFilter({ ingreType: value })}>
                                <Option value="">全部</Option>
                                <Option value="meatDish">荤菜</Option>
                                <Option value="vegetable">素菜</Option>
                                <Option value="halfAMeat">半荤</Option>
                                <Option value="dessert">汤羹</Option>
                                <Option value="others">其它</Option>
                            </Select>
                        </label>
                        <Search
                            placeholder="请输入关键字进行搜索"
														onSearch={() => { }}
														style={{width:'190px',marginLeft:'20px'}}
                        />
                    </div>
                    <Table
												pagination={
													{
														pageSize:10
													}
												}
                        columns={tableColumns}
                        dataSource={tableData}
                    />
                </div>
            </Modal>
        )
    }
}

export default SelectIngredients;
