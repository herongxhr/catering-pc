import React from 'react'
import { Select, DatePicker, Row, Col, Button, Radio, Menu, Dropdown } from 'antd';

const Option = Select.Option;
const { RangePicker } = DatePicker;

export default class OrderFilter extends React.Component {
  render() {
    const {
      className,
      handleFilterChange,
      filterData,
      handleMenuClick,
    } = this.props;

    const {
      datePicker1 = false,
      select1 = '',
      select2 = '',
      dropDownBtn = [],
      statusGroup = ''
    } = filterData;

    // 点击新建时会下拉的按钮
    const menu = (
      <Menu onClick={handleMenuClick} >
        {dropDownBtn.map(item => (
          <Menu.Item key={item.key}>
            {item.text}
          </Menu.Item>))}
      </Menu>
    )

    const button1 = (
      <Dropdown overlay={menu}>
        <Button icon="plus" type='primary' >
          新建
        </Button>
      </Dropdown>)

    return (
      <div className={className}>
        {/* 首行 */}
        <Row gutter={20} style={{ marginBottom: 20 }}>
          {datePicker1
            && <Col span={8}>
              <label >日期选择：
               <RangePicker
                  style={{ width: 240 }}
                  onChange={(_, dateStrings) => {
                    let [startDate, endDate] = dateStrings;
                    handleFilterChange({
                      startDate: `${startDate} 00:00:00`,
                      endDate: `${endDate} 23:59:59`
                    })
                  }}
                />
              </label>
            </Col>}
          {/* 下拉框1 */}
          {select1 &&
            (<Col span={8}>
              <label>{select1.label}
                <Select
                  onChange={(value) => handleFilterChange({ dateRange: value })}
                >{select1.options
                  .map(item => <Option value={item[0]}>{item[1]}</Option>)}
                </Select>
              </label>
            </Col>)}
          {/* 下拉框2 */}
          {select2 &&
            (<Col span={8}>
              <label>{select2.label}
                <Select
                  onChange={(value) => handleFilterChange({ dateRange: value })}
                >{select2.options
                  .map(item => <Option value={item[0]}>{item[1]}</Option>)}
                </Select>
              </label>
            </Col>)}
        </Row>
        {/* 第二行 */}
        <Row
          gutter={12}
          style={{ marginBottom: 20 }}
        >
          <Col span={12}>{button1}</Col>
          {statusGroup &&
            (<Col span={12} style={{ textAlign: 'right' }}>
              <Radio.Group
                defaultValue={statusGroup[0][0]}
                onChange={e => handleFilterChange({ status: e.target.value })}
              >
                {statusGroup.map(item =>
                  <Radio.Button value={item[0]}>{item[1]}</Radio.Button>)}
              </Radio.Group>
            </Col>)}
        </Row>
      </div >
    )
  }
}

