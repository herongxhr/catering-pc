import React from 'react'
import { Select,Input } from 'antd'
import './citySelect.less'

const Option = Select.Option;
const provinceData = ['浙江', '江苏'];
const cityData = {
  浙江: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  江苏: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

class CitySelect extends React.Component {
  state = {
    cities: cityData[provinceData[0]],
    secondCity: cityData[provinceData[0]][0],
  }

  handleProvinceChange = (value) => {
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0],
    });
  }

  onSecondCityChange = (value) => {
    this.setState({
      secondCity: value,
    });
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
          style={{ width: 120 }}
          value={this.state.secondCity}
          onChange={this.onSecondCityChange}
        >
          {cities.map(city => <Option key={city}>{city}</Option>)}
        </Select>
        
    </div>
    )
  }
}

export default CitySelect