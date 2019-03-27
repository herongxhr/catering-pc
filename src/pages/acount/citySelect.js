/*
 * @Author: suwei 
 * @Date: 2019-03-22 14:24:53 
 * @Last Modified by: suwei
 * @Last Modified time: 2019-03-23 16:21:25
 */
import React from 'react'
import { Select,Input } from 'antd'
import './citySelect.less'
import { city } from '../../utils/utils'

const Option = Select.Option;
let cityArray = city()
const provinceData = cityArray[0];
const cityData = cityArray[1]

class CitySelect extends React.Component {
  geography = {
    porvince:'北京',
    city:'东城',
    address:""
  }
  constructor(props) {
    super(props)
    this.state = {
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],
    }
    // const { onChange } = this.props
    // onChange(this.state.geography)
  }

  handleProvinceChange = (value) => {
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0],
    });
    const { onChange } = this.props
    this.geography.porvince = value
    let dataString = this.geography.porvince + this.geography.city + this.geography.address 
    onChange(dataString)  
  }

  onSecondCityChange = (value) => {
    this.setState({
      secondCity: value,
    });
    const { onChange } = this.props
    this.geography.city = value
    let dataString = this.geography.porvince + this.geography.city + this.geography.address 
    onChange(dataString)  
  }

  inputChange = (e) => {
    const { onChange } = this.props
    const value = e.target.value
    this.geography.address = value
    let dataString = this.geography.porvince + this.geography.city + this.geography.address 
    onChange(dataString)  
  }

  render() {
    const { cities } = this.state;
    return(
      <div>
        <Select
          defaultValue={provinceData[0]}
          style={{ width: 120 }}
          onChange={this.handleProvinceChange}
        >
          {provinceData.map(province => <Option key={province}>{province}</Option>)}
        </Select>
        <Select
          style={{ width: 120, marginLeft:'10px' }}
          value={this.state.secondCity}
          onChange={this.onSecondCityChange}
        >
          {cities.map(city => <Option key={city}>{city}</Option>)}
        </Select>
        <Input placeholder='具体地址，如街道门牌号等' style={{marginTop:'10px'}} onChange={(e) =>this.inputChange(e)} />        
    </div>
    )
  }
}

export default CitySelect