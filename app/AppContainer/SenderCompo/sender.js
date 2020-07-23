import React from 'react';
import {Button,Input,Select,Tag,Modal,Form, Space} from 'antd';
import {SendOutlined,MinusCircleOutlined, PlusOutlined} from '@ant-design/icons'

class Sender extends React.Component{
  state = { visible: false };

  showModal = () => {this.setVisibility(true)};

  handleOk = (e) => {this.setVisibility(false)};

  handleCancel = (e) => {this.setVisibility(false)};

  setVisibility(con){this.setState({visible: con});}

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

{         /* users can add Preset Messages */}
          <Button type="primary" onClick={this.showModal}>
            Add PreMessages
          </Button>
          <Modal
            title="Add PreSet Messages"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}>

            <Form name="dynamic_form_nest_item" onFinish={this.props.addPreMessages} autoComplete="off">

              <Form.List name="preMessages">

                {(fields, { add, remove }) => {
                  return (
                    <div>
                      {fields.map(field => (
                        // each row of server details
                        <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">

                          <Form.Item
                            {...field}
                            name={[field.name, 'name']}
                            fieldKey={[field.fieldKey, 'name']}
                            rules={[{ required: true, message: 'Missing message name' }]}
                          >
                            <Input placeholder="Message Name" type="text" />
                          </Form.Item>

                          <Form.Item
                            {...field}
                            name={[field.name, 'data']}
                            fieldKey={[field.fieldKey, 'data']}
                            rules={[{ required: true, message: 'Missing message data' }]}
                          >
                            <Input placeholder="Message Data" />
                          </Form.Item>

                          <MinusCircleOutlined
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        </Space>
                      ))}

                      <Form.Item>
                        <Button type="dashed" onClick={add} block>
                          <PlusOutlined /> Add Message
                        </Button>
                      </Form.Item>

                    </div>
                  );

                }}
              </Form.List>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>

            </Form>

          </Modal>
        </div>


        {/* users can add Preset Messages */}

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

export default Sender;
