import React, { Fragment, PureComponent } from 'react';
import { Input } from 'antd';
import './PhoneView.less';

class PhoneView extends PureComponent {
  render() {
    const {  value , onChange } = this.props;
    // const value = '0752-268888888'
    let values = ['', ''];
    if (value) {
      values = value.split('-');
    }
    return (
      <Fragment>
        <Input
          className='area_code'
          value={values[0]}
          onChange={e => {
            onChange(`${e.target.value}-${values[1]}`);
          }}
          placeholder='0752'
        />
        <Input
          style={{width:'180px'}}
          className='phone_number'
          onChange={e => {
            onChange(`${values[0]}-${e.target.value}`);
          }}
          value={values[1]}
          placeholder='268888888'
        />
      </Fragment>
    );
  }
}

export default PhoneView;
