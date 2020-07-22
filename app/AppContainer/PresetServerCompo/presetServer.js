import React from 'react';
import {Button,Tag,Select} from 'antd';

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

        <div className="conn-status">
          <Tag color={stausColor} >{statusText}</Tag>
          <Button type='primary' onClick={this.props.connectClient}>{btnValue}</Button>
        </div>

        <div className="server-opts">

          <Select defaultValue="Choose Server" style={{ width: 200 }}  onChange={this.props.serverSelector} disabled={this.props.socket? true : false}>
            {presetServers}
          </Select>

        </div>

      </section>
    );
  }
}

export default PresetServer;
