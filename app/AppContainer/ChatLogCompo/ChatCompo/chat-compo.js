import React from 'react';
// client backgroundColor = lightyellow , server backgroundColor=bisque
// .chat-flex-client                      .chat-flex-server

class Chat extends React.Component {
  shouldComponentUpdate(){
    return false;
  }
  componentDidMount(){
   if(this.props.author==='client') this.props.recieveMsg(this.props.data);
  }
  render(){
    return (
        <section className={(this.props.author==='client')?"chat-flex-client" : "chat-flex-server"}>
            <div className="chat" style={(this.props.author==='client')? {backgroundColor : 'lightyellow'} : {backgroundColor : 'bisque'}}>
                {this.props.data}
            </div>
            <div className="msg-date-time">
                {new Date().toLocaleString()}
            </div>
        </section>
    );
  }

}

export default Chat;