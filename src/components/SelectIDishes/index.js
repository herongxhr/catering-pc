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
            handleHideModal,
            handlFetchDishes,
            changeArrangedDishes,
            modalTableData: {
                records,
                pages,
                page,
                current,
                total,
            },
            currMeals,
        } = this.props;

        // currMeals初始为空数组
        const tagListDom = currMeals.map(item => (
            // 自己新增的绿色显示
            <Tag color={ item.isAdd ? 'green' : ''}
                style={{
                    height: 32,
                    lineHeight: "32px",
                    fontSize: "14px",
                    marginBottom: 10
                }}
                key={item.foodId}
                // 判断是不是自己加的菜
                closable={item.isAdd}
                onClose={() => {
                    changeArrangedDishes(item, -1)
                }} >
                {item.foodName}{item.properties}
            </Tag>));
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
                onOk={handleHideModal}
                onCancel={handleHideModal}
            >
                <div className={"leftContent"}>
                    <div className={"filterWrap"}>
                        <label style={{ width: 42 }}>类别：
                                <Select
                                style={{ width: 170 }}
                                defaultValue="all"
                                onChange={value => handlFetchDishes(value)}
                            >
                                <Option value="all">全部</Option>
                                <Option value="meatDish">荤菜</Option>
                                <Option value="vegetable">素菜</Option>
                                <Option value="halfAMeat">半荤</Option>
                                <Option value="dessert">点心</Option>
                                <Option value="others">其它</Option>
                            </Select>
                        </label>
                        <Search
                            placeholder="请输入关键字进行搜索"
                            onSearch={value => handlFetchDishes(value)}
                            style={{ width: 190, marginLeft: 10 }}
                        />
                    </div>
                    <Table
                        style={{ height: 594 }}
                        columns={tableColumns}
                        dataSource={records}
                        rowKey="foodId"
                        onRow={(record) => {
                            return {
                                onClick: (event) => { },
                            };
                        }}
                    />
                </div>
                <div className={"rightResult"}>
                    <ul className={"tagList"}>
                        {tagListDom}
                    </ul>
                </div>
            </Modal>
        )
    }
}

export default SelectDishes;

