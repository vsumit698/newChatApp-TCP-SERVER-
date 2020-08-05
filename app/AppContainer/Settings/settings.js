import React from 'react';
import {withRouter} from 'react-router-dom';
import {SettingOutlined,MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button,Tag,Select,Modal,Form, Input, Space,InputNumber,Checkbox} from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} is required!'
};

class Settings extends React.Component {

  render(){
    var serverOptions = [];
    var preMessagesOptions = [];
    let id = 0;
    for(let server of this.props.servers){
      let obj = {};
      obj.label = server.name;
      obj.value = id++;
      serverOptions.push(obj);
    }
    id=0;
    for(let message of this.props.preMessages){
      let obj = {};
      obj.label = message.name;
      obj.value = id++;
      preMessagesOptions.push(obj);
    }
    return (
        <div className="setting-page">
          <div style={{textAlign:'center'}}>
            <SettingOutlined />
            <span style={{fontSize:'25px'}}> SETTINGS PAGE</span>
          </div>



          {/* users can add Preset Servers */}
          <div>
            <h3 style={{color:'green'}}>ADD SERVERS</h3>
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

          </div>
          {/* users can delete Preset Servers */}
          <div>
              <h3 style={{color:'green'}}>DELETE SERVERS</h3>
              <Form {...layout} name="nest-messages" onFinish={this.props.deleteServers} validateMessages={validateMessages}>

                <Form.Item name={['user', 'servers']} label="Select Servers" rules={[{required:true}]}>
                    <Checkbox.Group options={serverOptions}  />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} >
                  <Button type="primary" htmlType="submit">
                    DELETE
                  </Button>
                </Form.Item>

              </Form>
          </div>

          {/* users can add Preset Messages */}
          <div>
            <h3 style={{color:'green'}}>ADD PRE-SET MESSAGES</h3>

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
          </div>

          {/* users can delete Preset messages */}
          <div>
              <h3 style={{color:'green'}}>DELETE PRE-SET MESSAGES</h3>
              <Form {...layout} name="nest-messages" onFinish={this.props.deletePreMessages} validateMessages={validateMessages}>

                <Form.Item name={['user', 'preMessages']} label="Select Messages" rules={[{required:true}]}>
                    <Checkbox.Group options={preMessagesOptions}  />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} >
                  <Button type="primary" htmlType="submit">
                    DELETE
                  </Button>
                </Form.Item>

              </Form>
          </div>


        </div>
    );
  }

}

export default withRouter(Settings) ;
