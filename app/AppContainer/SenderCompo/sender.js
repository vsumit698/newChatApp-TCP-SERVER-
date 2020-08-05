import React from 'react';
import {Button,Input,Select,Tag,Modal,Form, Space} from 'antd';
import {SendOutlined,MinusCircleOutlined, PlusOutlined} from '@ant-design/icons'
import {withRouter} from 'react-router-dom';

class Sender extends React.Component{

  isvalidJson(data){
    try{
      JSON.parse(data);
      return true;
    }catch(err){
      return false;
    }
  }

  render(){
    var preMessages = this.props.preMessages.map((message,id)=>{
      return(<Select.Option value={message.data} key={id}>{message.name}</Select.Option>);
    });
    var isvalidJsonMsg = this.isvalidJson(this.props.message);
    var currServerDisplay = null;
    var currServer = this.props.currServer;
    if(this.props.socket){
      currServerDisplay = <Tag color="cyan">{`connected to server at PORT : ${currServer.port} , IP : ${currServer.ip}`}</Tag>
    }
    return (
    <section className="sender-component">
      <div className="sender-section">

        <div>
          <Select defaultValue="PreMessages" style={{ width: 150 }}  onChange={this.props.msgSelector}>
            {preMessages}
          </Select>
        </div>

        <div>
          <Input.TextArea placeholder="Type Message" style={{ width: 300 }} rows="1" onChange={this.props.updateMsg} value={this.props.message}/>
          <Button type="primary"  onClick={this.props.sendMsg} icon={<SendOutlined />} disabled={(this.props.socket)? false : true}>SEND</Button>
          <div>
            <Tag color={isvalidJsonMsg? 'green' : 'red'}>
              {isvalidJsonMsg ? 'VALID JSON' : 'INVALID JSON'}
            </Tag>
          </div>
        </div>



      </div>

      <div className="author-color">
        <div className="client-color">CLIENT</div>
        <div className="server-color">SERVER</div>
        <div>
          <a onClick={this.props.createCsvFile}>DOWNLOAD CHAT-LOG</a>
        </div>
        <div>
          {/* about connected server port and ip */}
          {currServerDisplay}
        </div>
      </div>

    </section>

    );
  }
}

export default withRouter(Sender);
