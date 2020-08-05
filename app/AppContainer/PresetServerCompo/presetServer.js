import React from 'react';
import {Button,Tag,Select,Modal,Form, Input, Space,InputNumber} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {withRouter} from 'react-router-dom';
class PresetServer extends React.Component{

  render(){
    var stausColor = (this.props.socket) ? 'green' : 'red'  ;
    var statusText = (this.props.socket) ? 'CONNECTED' : 'DISCONNECTED';
    var btnValue = (this.props.socket) ? 'DISCONNECT' : 'CONNECT' ;
    var presetServers = null;
    if(!this.props.socket){
      presetServers = this.props.presetServers.map((server,id)=>{
        return(<Select.Option value={id} key={id}>{server.name}</Select.Option>);
      });
    }

    return(
      <section className='preset-server'>

        <div>
          <Select defaultValue="Choose Server" style={{ width: 140 }}  onChange={this.props.serverSelector} disabled={this.props.socket? true : false}>
            {presetServers}
          </Select>
        </div>
        {/* users can add Preset Servers */}

        <div className="conn-status">
          <Tag color={stausColor} >{statusText}</Tag>
          <Button type='primary' onClick={this.props.connectClient}>{btnValue}</Button>
        </div>



      </section>
    );
  }
}

export default withRouter(PresetServer);
