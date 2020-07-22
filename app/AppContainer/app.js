import React from 'react';

import Sender from './SenderCompo/sender.js'
import ChatLog from './ChatLogCompo/chat-log.js';
import PresetServer from './PresetServerCompo/presetServer.js';
import { Typography,message } from 'antd';
const { Title } = Typography;

import net from 'net';

const configData = require('../../config/config.json');

class App extends React.Component {
  state = {
    chatHistory : [],//{author:' ', data : ' '}
    message : '',
    socket : null,
    currServer : null,
    configData : configData
  }
  connectClientHandler(){
    if(this.state.currServer){

      if(!this.state.socket){// making connection with server

        let server = this.state.currServer;
        const socket = net.createConnection({port:server.port,host:server.ip,localPort:3000,localAddress: '127.0.0.1'},()=>{
          // connection event listener
          this.setState({socket : socket});
          console.log('connection established by SERVER',socket.remoteAddress,socket.remotePort);
          message.success("Connected Successfully");
        });

        socket.on('end',function(){
            console.log('connection ended by server [CLIENT]');
            message.warning("Connection Breaked");
        });
        socket.on('data',(chunk)=>{

          console.log('received data on client side [CLIENT]',chunk.toString());
          let newChatHistory = this.state.chatHistory.slice();
          newChatHistory.push({author:'server',data : chunk.toString() });
          // console.log(newChatHistory,'After update');
          this.setState({chatHistory : newChatHistory});

        });
        socket.on('error',(err)=>{
          console.log('Error occured on  CLIENT SOCKET',err);
        });
        socket.on('close',(transmissionErr)=>{
          console.log('socket closed','via transmission error',transmissionErr);
          if(transmissionErr) message.error("Server Not Available");
          this.setState({socket : null});
        });
      }else{
        // socket needs to end connection...
        this.state.socket.end();
      }

    }else{// currServer is not selected
      message.error("Select Server First");
    }

  }


  async receiveMsg(data){
    try {
      const socket = this.state.socket;
      await socket.write(data);
    } catch (error) {
      throw new Error(error);
    }
  }
  updateMsgHandler(event){
    this.setState({message : event.target.value});
  }
  sendMsgHandler(){

    let newChatHistory = this.state.chatHistory.slice();
    newChatHistory.push({author:'client',data : this.state.message});
    this.setState({chatHistory : newChatHistory});


  }

  render(){
    return (
    <div>
      <Title level={4} style={{textAlign:'center',color:'blue'}}>Chat Application (ECHO SERVER BASED)</Title>

      <PresetServer connectClient={()=>{this.connectClientHandler()}}
      socket={this.state.socket}
      presetServers={this.state.configData.servers}
      serverSelector={(serverId)=>{this.setState({currServer:(this.state.configData.servers[serverId])})}}>

      </PresetServer>

      <Sender updateMsg={(event)=>{this.updateMsgHandler(event)}}
      sendMsg={()=>{this.sendMsgHandler()}} message={this.state.message} socket={this.state.socket}
      preMessages={this.state.configData.preMessages}
      msgSelector={(message)=>{this.setState({message:message})}}>
      </Sender>

      <ChatLog chatHistory={this.state.chatHistory} receiveMsg={(data)=>{this.receiveMsg(data)}}></ChatLog>
    </div>
    );
  }

}

export default App;
