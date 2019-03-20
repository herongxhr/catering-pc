import React from 'react'
import { Tag, Input, Tooltip, Button } from 'antd';
class EditableTagGroup extends React.Component {
  state = {
    tags: ['幼儿园', '高蛋白', '高营养', '三餐五日'],
    inputVisible: false,
    inputValue: '',
  };

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  }

  render() {
    const { tags = [] } = this.props;
    const { inputVisible, inputValue } = this.state;
    return (
      <div>
        {tags.split(',').map((tag, index) => {
          const colors = ['cyan', 'orange', 'green', 'magenta', 'lime', 'pruple', 'red', 'blue'];
          const isLongTag = tag.length > 10;
          const tagElem = (<Tag
            style={{ height: 30, lineHeight: '30px' }}
            key={index}
            color={colors[index]}
            closable
            afterClose={() => this.handleClose(tag)}>
            {isLongTag ? `${tag.slice(0, 10)}...` : tag}
          </Tag>);
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <Input
            ref={input => this.input = input}
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Button onClick={this.showInput} type='dashed' >
            +添加</Button>
        )}
      </div>
    );
  }
}

export default EditableTagGroup;