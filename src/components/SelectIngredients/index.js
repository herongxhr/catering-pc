import React from 'react';
import classNames from 'classnames';
import { Modal, Select, Input, Table } from 'antd';
import './index.less';

const { Search } = Input;
const { Option } = Select;

const tableColumns = [
    {
        title: '名称',
        key: 'name',
        dataIndex: 'name'
    },
    {
        title: '类别',
        key: 'catalog',
        dataIndex: 'catalog'
    },
    {
        title: '食材明细',
        key: 'detail',
        dataIndex: 'detail'
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
        render: () => <a>添加</a>
    },
];

class SelectIngredients extends React.Component {

    render() {
        const {
            handleModalVisble,
            visible
        } = this.props;

        const tableData = [
            {
                id: 1,
                name: "番茄炒蛋",
                catalog: "素菜",
                detail: "番茄20g/鸡蛋30g/番茄...",
            },
            {
                id: 2,
                name: "番茄炒蛋",
                catalog: "素菜",
                detail: "番茄20g/鸡蛋30g/番茄...",
            },
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
            },
            {
                id: 8,
                name: "番茄炒蛋",
                catalog: "素菜",
                detail: "番茄20g/鸡蛋30g/番茄...",
            },
            {
                id: 9,
                name: "番茄炒蛋",
                catalog: "素菜",
                detail: "番茄20g/鸡蛋30g/番茄...",
            },
            {
                id: 10,
                name: "番茄炒蛋",
                catalog: "素菜",
                detail: "番茄20g/鸡蛋30g/番茄...",
            },
        ]
        return (
            <Modal
                wrapClassName="selectIngredients"
                width={1100}
                closable={false}
                bodyStyle={{
                    height: "100%",
                    display: "table-cell",
                    verticalAlign: "middle",
                    overflow: "hidden",
                    padding: "0 10px"
                }}
                title="选菜"
                visible={visible}
                okText="保存"
                onOk={handleModalVisble}
                onCancel={handleModalVisble}
            >
                <div className={"leftContent"}>
                    <div className={"filterWrap"}>
                        <label style={{ width: 42 }}>类别：
                                <Select
                                style={{ width: 170 }}
                                defaultValue=""
                            // onChange={(value) => handleFilter({ dateRange: value })}
                            >
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
                            style={{ width: 190, marginLeft: 10 }}
                        />
                    </div>
                    <Table
                        style={{ height: 594 }}
                        columns={tableColumns}
                        dataSource={tableData}
                        onRow={
                            record => {
                                return {

                                }
                            }
                        }
                        rowKey="id"
                    />
                </div>
                <div className={"rightResult"}>111</div>
            </Modal>
        )
    }
}

export default SelectIngredients;
