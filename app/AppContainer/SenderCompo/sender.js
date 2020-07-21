import React from 'react';
import {Button,Input} from 'antd';
import {SendOutlined} from '@ant-design/icons'
class Sender extends React.Component {

  shouldComponentUpdate(){
    return false;
  }

  render(){
    return (
    <section>
      <div className="sender-section">

        <Input placeholder="Type Message"  onChange={this.props.updateMsg}/>

        <Button type="primary"  onClick={this.props.sendMsg} icon={<SendOutlined />}>SEND</Button>

      </div>
      
      <div className="author-color">
        <div className="client-color">CLIENT</div>
        <div className="server-color">SERVER</div>
      </div>

    </section>

  );}

}

export default Sender;
