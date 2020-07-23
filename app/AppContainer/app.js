import React from 'react';

import Sender from './SenderCompo/sender.js'
import ChatLog from './ChatLogCompo/chat-log.js';
import PresetServer from './PresetServerCompo/presetServer.js';
import { Typography,message } from 'antd';
const { Title } = Typography;
import axios from 'axios';

import net from 'net';


class App extends React.Component {
  state = {
    chatHistory : [],//{author:' ', data : ' ', timeStamp : ''}
    message : '',
    socket : null,
    currServer : null,
    prevConnServer : null,
    servers : [],
    preMessages : [],
    chatLogWindow : React.createRef(),
    chatList : React.createRef()
  }
  componentDidMount(){
    axios.get('http://localhost:3000/db')
    .then((response)=>{
      this.setState({servers : response.data.servers,preMessages:response.data.preMessages});
      message.success("data received from API");
    }).catch((error)=>{
      message.error("data FAILURE from API");
    });

  }
  connectClientHandler(){
    if(this.state.currServer){

      if(!this.state.socket){// making connection with server

        let server = this.state.currServer;
        const socket = net.createConnection({port:server.port,host:server.ip,localPort:3001,localAddress: '127.0.0.1'},()=>{
          // connection event listener
          const prevConnServer = this.state.prevConnServer;
          const currServer = this.state.currServer;
          if( (this.state.prevConnServer) && ((prevConnServer.port != currServer.port) || (prevConnServer.ip != currServer.ip) )){
            const emptyChat = [];
            this.setState({socket : socket,chatHistory : emptyChat});
          }else{
            this.setState({socket : socket});
          }
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
          newChatHistory.push({author:'server',data : chunk.toString(),timeStamp : new Date().toLocaleString()});
          // console.log(newChatHistory,'After update');
          this.setState({chatHistory : newChatHistory});

        });
        socket.on('error',(err)=>{
          console.log('Error occured on  CLIENT SOCKET',err);
        });
        socket.on('close',(transmissionErr)=>{
          console.log('socket closed','via transmission error',transmissionErr);
          var prevConnServer = this.state.prevConnServer;
          if(transmissionErr) message.error("Server Not Available");
          else prevConnServer = this.state.currServer;
          this.setState({socket : null,prevConnServer:prevConnServer});
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
    newChatHistory.push({author:'client',data : this.state.message,timeStamp : new Date().toLocaleString()});
    this.setState({chatHistory : newChatHistory});


  }
  addServers(values){
    const userServers = values.servers; // array of user servers
    console.log('Received values of form:', values);
    const newServers = this.state.servers.slice();
    for(let userServer of userServers){
      let server = {};
      server.name = userServer.name;
      server.port = userServer.port;
      server.ip = userServer.ip;
      newServers.push(server);
    }
    this.setState({servers : newServers});
    message.success("SERVERS added");
  };
  addPreMessages(values){
    const userMessages = values.preMessages; // array of user preMessages
    console.log('Received values of form:', values);
    const newPreMessages = this.state.preMessages.slice();
    for(let userMessage of userMessages){
      let message = {};
      message.name = userMessage.name;
      message.data = userMessage.data;
      newPreMessages.push(message);
    }
    this.setState({preMessages : newPreMessages});
    message.success("Preset Messages added");
  }
  createCsvFile(event){
    event.preventDefault();
    var fs = require('fs');
    var os = require('os');
    var path = require('path');

    var fileName = "chatLog.csv";

    var filePath = path.join(os.homedir(),'Desktop',fileName);
    console.log('*******',filePath);

    fs.writeFileSync(filePath,'',(err)=>{
        if(err) console.log(err);
        else console.log('File Created');
    });
    const createCsvWriter = require('csv-writer').createArrayCsvWriter;
    const csvWriter = createCsvWriter({
        header: ['ID','AUTHOR','MESSAGE','TIME-STAMP'],
        path: filePath
    });

    const data = [];
    let id=1;
    for(let chat of this.state.chatHistory){
      let row = [];
      row.push(id++);
      row.push(chat.author);
      row.push(chat.data);
      row.push(chat.timeStamp);
      data.push(row);
    }

    csvWriter.writeRecords(data)       // returns a promise
    .then(() => {
        message.success('chat-log exported to DESKTOP via '+fileName);

    });

  }

  render(){
    return (
    <div>
      <Title level={4} style={{textAlign:'center',color:'blue'}}>Chat Application (ECHO SERVER BASED)</Title>

      <PresetServer connectClient={()=>{this.connectClientHandler()}}
      socket={this.state.socket}
      presetServers={this.state.servers}
      serverSelector={(serverId)=>{this.setState({currServer:(this.state.servers[serverId])})}}
      addServers={(values)=>{this.addServers(values)}}>

      </PresetServer>

      <Sender updateMsg={(event)=>{this.updateMsgHandler(event)}}
      sendMsg={()=>{this.sendMsgHandler()}} message={this.state.message} socket={this.state.socket}
      preMessages={this.state.preMessages}
      msgSelector={(message)=>{this.setState({message:message})}}
      addPreMessages={(values)=>{this.addPreMessages(values)}}
      currServer={this.state.currServer}
      socket={this.state.socket} createCsvFile={(event)=>{this.createCsvFile(event)}}>
      </Sender>

      <ChatLog chatHistory={this.state.chatHistory} receiveMsg={(data)=>{this.receiveMsg(data)}}
      chatLogWindow={this.state.chatLogWindow} chatList={this.state.chatList}></ChatLog>
    </div>
    );
  }

}

export default App;
