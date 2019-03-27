import React, { Fragment, PureComponent } from 'react'
import { Input } from 'antd'

import './PhoneNumber.less'

class PhoneNumber extends React.Component {
  render() {
    const {  value , onChange } = this.props;
    // const value = '0752-268888888'
    let values = ['', ''];
    if (value) {
      values = value.split('-');
    }
    return(
      <Fragment>
        <Input
          placeholder='陈超洋'
          className='phone-code'
          value={values[0]}
          onChange={e => {
            onChange(`${e.target.value}-${values[1]}`);
          }}
        />
        <Input
          style={{ width:180 }}
          placeholder='15858134718'
          className='phone-area'
          onChange={e => {
            onChange(`${values[0]}-${e.target.value}`);
          }}
          value={values[1]}
        />
      </Fragment>
    )
  }
}

export default PhoneNumber