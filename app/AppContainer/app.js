import React from 'react';

import Sender from './SenderCompo/sender.js'
import ChatLog from './ChatLogCompo/chat-log.js';
import { Typography } from 'antd';
const { Title } = Typography;

import net from 'net';

const port = 8000;

class App extends React.Component {
  state = {
    chatHistory : [],//{author:' ', data : ' '}
    message : '',
    socket : null
  }
  componentDidMount(){
    const socket = net.createConnection({port:port,localPort:3000,localAddress: '127.0.0.1'});

    socket.on('end',function(){
        console.log('connection ended by server [CLIENT]');
    });
    socket.on('data',(chunk)=>{

      console.log('received data on client side [CLIENT]',chunk.toString());
      let newChatHistory = this.state.chatHistory.slice();
      newChatHistory.push({author:'server',data : chunk.toString() });
      // console.log(newChatHistory,'After update');
      this.setState({chatHistory : newChatHistory});

    });
    this.setState({socket : socket});
  }


  async receiveMsg(data){
    try {
      const socket = this.state.socket;
      await socket.write(data);
    } catch (error) {
      console.log(error);
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

      <Sender updateMsg={(event)=>{this.updateMsgHandler(event)}}
      sendMsg={()=>{this.sendMsgHandler()}}>
      </Sender>

      <ChatLog chatHistory={this.state.chatHistory} receiveMsg={(data)=>{this.receiveMsg(data)}}></ChatLog>
    </div>
    );
  }

}

export default App;
