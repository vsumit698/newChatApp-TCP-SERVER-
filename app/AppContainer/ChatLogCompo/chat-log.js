import React from 'react';
import Chat from './ChatCompo/chat-compo.js'
import {List} from 'antd';
class ChatLog extends React.Component {
    shouldComponentUpdate(nextProps,nextState){
      return (this.props.chatHistory.length !== nextProps.chatHistory.length);
    }
    render(){
      return(
        <section className="chat-log-window">

          <List size="small" dataSource={this.props.chatHistory} className="chat-list"
            renderItem={(chat,index) =>{
              return(
                <List.Item className="chat-list-item">
                  <Chat author={chat.author} data={chat.data} key={index} recieveMsg={this.props.receiveMsg}></Chat>
                </List.Item>
              );
            }}
          />

        </section>
      );
    }

}

export default ChatLog;
