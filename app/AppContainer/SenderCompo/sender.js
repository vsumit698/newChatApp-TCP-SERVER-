import React from 'react';
import {Button,Input,Select} from 'antd';
import {SendOutlined} from '@ant-design/icons'
class Sender extends React.Component{

  render(){
    var preMessages = this.props.preMessages.map((message,id)=>{
      return(<Select.Option value={message} key={id}>{message}</Select.Option>);
    });
    return (
    <section>
      <div className="sender-section">
        <Select defaultValue="Choose PreMessages" style={{ width: 250 }}  onChange={this.props.msgSelector}>
          {preMessages}
        </Select>
        <Input placeholder="Type Message" style={{ width: 400 }} onChange={this.props.updateMsg} value={this.props.message}/>
        <Button type="primary"  onClick={this.props.sendMsg} icon={<SendOutlined />} disabled={(this.props.socket)? false : true}>SEND</Button>

      </div>

      <div className="author-color">
        <div className="client-color">CLIENT</div>
        <div className="server-color">SERVER</div>
      </div>

    </section>

    );
  }
}

export default Sender;
