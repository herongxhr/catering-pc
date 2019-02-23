import React from 'react'
import {Button,Modal, Radio, Form, Input,} from 'antd'
import './index.less';

class ReportButton extends React.Component {
    state = { visible: false,
        checked: true
    }

    showModal = () => {
      this.setState({
        visible: true,
      });
    }
  
    handleOk = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }
  
    handleCancel = (e) => {
      this.setState({
        visible: false,
      });
    }
	render() {
        const {getFieldDecorator} = this.props.form;
		return(
			<div>
              <Button type='primary' onClick={this.showModal}>上报商品</Button>
              <Modal 
                className="reportBtn"
                title="上报商品"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="提交"
                cancelText="取消"
                width={780}
                closable={false}
                >
                <Form layout='vertical'>
                    <Form.Item
                    label="请选择商品类型"
                    >
                    {getFieldDecorator('type', {
                            initialValue:'ingredients',
                    })(
                        <Radio.Group buttonStyle="solid">
                            <Radio.Button value="ingredients" className='checkBtn'>食材</Radio.Button>
                            <Radio.Button value="excipient" className='checkBtn btn'>辅料</Radio.Button>
                        </Radio.Group>
                    )}
                    </Form.Item>
                    <Form.Item
                    label="商品名称"
                    >
                    {getFieldDecorator('name', {
                            initialValue:'',
                    })(
                       <Input placeholder='请输入' style={{width:260}}/>
                    )}
                    </Form.Item>
                </Form>
                </Modal>
            </div>
		)
	}
}
const WrappedReportButton = Form.create()(ReportButton)
export default WrappedReportButton