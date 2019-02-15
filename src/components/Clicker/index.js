import React from 'react'
import {
  Button,Icon
} from 'antd';
import './index.less'

const ButtonGroup = Button.Group;


class Clicker extends React.Component {
  state = {
    count:1
  }

  increase = () => {
    const count = this.state.count + 1;
    this.setState({ count });
  }

  decline = () => {
    let count = this.state.count - 1;
    if (count < 0) {
      count = 0;
    }
    this.setState({ count });
  }

  render() {
    return(
      <div className='clicker'>
        <ButtonGroup>
          <Button onClick={this.decline} >
            <Icon type="minus" />
          </Button>
          <div className='count'>
            {this.state.count}
          </div>
          <Button onClick={this.increase}>
            <Icon type="plus" />
          </Button>
        </ButtonGroup>
      </div>
    )
  }
}

export default Clicker