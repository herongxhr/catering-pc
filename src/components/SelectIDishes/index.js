import React from 'react';
import { Modal, Select, Input, Table, Tag } from 'antd';
import './index.less';

const { Search } = Input;
const { Option } = Select;

class SelectDishes extends React.Component {

    render() {
        const {
            title,
            tableColumns,
            visible,
            handleModalVisble,
            changeItemList,
            tableData: {
                records,
                pages,
                page,
                current,
                total,
            },
            dishesInMenu,
        } = this.props;

        const tagList = (
            dishesInMenu.map(item => (<Tag
                color="green"
                style={{
                    height: 32,
                    lineHeight: "32px",
                    fontSize: "14px",
                    marginBottom: 10
                }}
                key={item.id}
                closable
                onClose={() => { changeItemList(item, -1) }}
            >
                {item.foodName}{item.properties}
            </Tag>))
        )

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
                title={title}
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
                                <Option value="dessert">点心</Option>
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
                        dataSource={records}
                        rowKey="id"
                        onRow={(record) => {
                            return {
                                onClick: (event) => { },
                            };
                        }}
                    />
                </div>
                <div className={"rightResult"}>
                    <ul className={"tagList"}>
                        {tagList}
                    </ul>
                </div>
            </Modal>
        )
    }
}

export default SelectDishes;

