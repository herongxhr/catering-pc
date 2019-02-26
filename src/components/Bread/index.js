import React from 'react'
import './index.less'
import { Breadcrumb } from 'antd';

class Bread extends React.Component {
  render() {
    return(
      <div className='Bread'>
       <Breadcrumb>
          {
            this.props.bread.map((item,index,array) => {
              if(index === array.length - 1) {
                return <Breadcrumb.Item key={index}>{item.breadContent}</Breadcrumb.Item>
              }
              return <Breadcrumb.Item key={index}><a href={item.href}>{item.breadContent}</a></Breadcrumb.Item>    
            })
          }
        </Breadcrumb>
      </div>
    )
  }
}

export default Bread