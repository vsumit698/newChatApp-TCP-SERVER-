import React from 'react';
import {Button,Tag,Select,Modal,Form, Input, Space,InputNumber} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

class PresetServer extends React.Component{
  state = { visible: false };

  showModal = () => {this.setVisibility(true)};

  handleOk = (e) => {this.setVisibility(false)};

  handleCancel = (e) => {this.setVisibility(false)};

  setVisibility(con){this.setState({visible: con});}



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

          {/* users can add Preset Servers */}
          <Button type="primary" onClick={this.showModal}>
            Add Servers
          </Button>
          <Modal
            title="Add Servers"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}>

            <Form name="dynamic_form_nest_item" onFinish={this.props.addServers} autoComplete="off">

              <Form.List name="servers">

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
                            rules={[{ required: true, message: 'Missing server name' }]}
                          >
                            <Input placeholder="First Name" type="text" />
                          </Form.Item>

                          <Form.Item
                            {...field}
                            name={[field.name, 'port']}
                            fieldKey={[field.fieldKey, 'port']}
                            rules={[{type:'number',min:1000,max:9999,message:'enter valid port'},{ required: true, message: 'Missing port numbar' }]}
                          >
                            <InputNumber placeholder="Port No."/>
                          </Form.Item>

                          <Form.Item
                            {...field}
                            name={[field.name, 'ip']}
                            fieldKey={[field.fieldKey, 'ip']}
                            rules={[{ required: true, message: 'Missing ip address' }]}
                          >
                            <Input placeholder="IP Address" />
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
                          <PlusOutlined /> Add Server Details
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
        {/* users can add Preset Servers */}

        <div className="conn-status">
          <Tag color={stausColor} >{statusText}</Tag>
          <Button type='primary' onClick={this.props.connectClient}>{btnValue}</Button>
        </div>



      </section>
    );
  }
}

export default PresetServer;
