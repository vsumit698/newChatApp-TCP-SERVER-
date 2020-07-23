import React from 'react';
import Chat from './ChatCompo/chat-compo.js'
import {List} from 'antd';
import { mount } from 'enzyme';
class ChatLog extends React.Component {
    shouldComponentUpdate(nextProps,nextState){
      return (this.props.chatHistory.length !== nextProps.chatHistory.length);
    }
    componentDidUpdate(){
      var chatLogWindow = this.props.chatLogWindow.current;
      var chatList = this.props.chatList.current;
      // console.log(chatLogWindow.clientHeight,chatList.clientHeight);
      chatLogWindow.scrollTo(0,chatList.clientHeight-chatLogWindow.clientHeight);
    }
    render(){
      return(
        <section className="chat-log-window" ref={this.props.chatLogWindow}>

          <div ref={this.props.chatList} >
            <List size="small" dataSource={this.props.chatHistory} className="chat-list"
              renderItem={(chat,index) =>{
                return(
                  <List.Item className="chat-list-item">
                    <Chat author={chat.author} data={chat.data} key={index} recieveMsg={this.props.receiveMsg}></Chat>
                  </List.Item>
                );
              }}
            />
          </div>

        </section>
      );
    }

}

export default ChatLog;
