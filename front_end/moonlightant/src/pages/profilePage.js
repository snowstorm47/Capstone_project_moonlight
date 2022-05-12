import React from "react";
import { Row, Col, Layout } from "antd";
import { Form, Input, Button } from 'antd';
import { Select } from 'antd';
import { DatePicker, Space } from 'antd';
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Divider } from "antd";
// import { Content } from "antd/lib/layout/layout";
// import Sider from "antd/lib/layout/Sider";
import moment from 'moment';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// import '/App.css';

const { Option } = Select;
const { RangePicker } = DatePicker;

// const formItemLayout = {
//     labelCol: {
//       xs: { span: 24 },
//       sm: { span: 4 },
//     },
//     wrapperCol: {
//       xs: { span: 24 },
//       sm: { span: 20 },
//     },
// };

// const formItemLayoutWithOutLabel = {
//     wrapperCol: {
//       xs: { span: 24, offset: 0 },
//       sm: { span: 20, offset: 4 },
//     },
// };
  
const onFinish = values => {
      console.log('Received values of form:', values);
};

function handleChange(value) {
    console.log(`selected ${value}`);
}

function onChange(dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
}

// function onChange1(value) {
//     console.log(`selected ${value}`);
// }

function onSearch(val) {
    console.log('search:', val);
}

function ProfilePage(){
    <Avatar icon={<UserOutlined />} />
    return (
        <Row className="row1">
            <Col className="row" span={5}>
                <Col>
                    <div className="image1">
                        <Image
                            width={200}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            // size={100} 
                        />
                    </div>
                </Col>

                <Col>
                    <Divider>Work</Divider>
                    <Divider>Work</Divider>
                    <Divider>Work</Divider>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                    <br />
                    <br />
                    <Button type="primary" htmlType="submit">
                        Cancel
                    </Button>
                </Col>
            </Col>
            
            
            <Col className="row3" span={9}>
                <Divider>Profile Page</Divider>
                <Col>
                    <Form.Item label="Full Name">
                        <Input />
                    </Form.Item>
                    
                    
                </Col>

                <Col> 
                    <Form.Item label="Email" rules={[
                        { 
                        type: 'email'
                        }
                        ]}>
                        <Input />
                    </Form.Item>
                </Col>

                <Col>    
                    <Form.Item label="Phone Number">
                        <Input />
                    </Form.Item>
                </Col>

                <Col> 
                    <label>Gender:<Select defaultValue="male" style={{ width: 120, padding: 10}} onChange={handleChange}>
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                    </Select></label>
                </Col>

                <Col>
                    <Divider>Academic</Divider>
                    <Select
                        showSearch
                        placeholder="Select an institution"
                        style={{padding: 10}}
                        optionFilterProp="campus"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="aastu">AASTU</Option>
                        <Option value="astu">ASTU</Option>
                        <Option value="aau">AAU</Option>
                    </Select>
                </Col>
                
                <Col> 
                    <Space direction="vertical" size={12} style={{padding: 10}}>
                        <RangePicker
                            ranges={{
                            Today: [moment(), moment()],
                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                            }}
                            onChange={onChange}
                        />
                    </Space>
                </Col>
            
            
                
            </Col>

            <Col className="row2" span={9}>
            <Divider>Skills</Divider>
                <Col>
                    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                        <Form.List name="users">
                            {(fields, { add, remove }) => ( <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'skill']}
                                            rules={[{ required: false }]}
                                        >
                                            <Input placeholder="Skill Type" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                    )
                                )}
                            
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add field
                                </Button>
                            </Form.Item>
                            </>
                            )}
                            </Form.List>
                                
                            <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            </Form.Item>
                    </Form>
                </Col>
                <Divider>Employment History</Divider>                    
                <Col >
                    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off" title="Employment History">
                        <Form.List name="users">
                            {(fields, { add, remove }) => ( <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                        {...restField}
                                        name={[name, 'compamy']}
                                        // rules={[{ required: true, message: 'Missing first name' }]}
                                        >
                                            <Input placeholder="Company" />
                                        </Form.Item>
                                        
                                        <Form.Item
                                        {...restField}
                                        name={[name, 'position']}
                                        >
                                            <Input placeholder="Position" />
                                        </Form.Item>
                                        
                                        <Form.Item
                                        {...restField}
                                        name={[DatePicker, 'date']}
                                        >
                                            <Space direction="vertical" size={12} style={{padding: 10}}>
                                                <RangePicker
                                                ranges={{
                                                Today: [moment(), moment()],
                                                'This Month': [moment().startOf('month'), moment().endOf('month')],
                                                }}
                                                onChange={onChange}
                                                />
                                            </Space>
                                        </Form.Item>
                                        
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                    )
                                )}
                                
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add Field
                                    </Button>
                                </Form.Item>
                                </>
                            )}
                            </Form.List>
                            
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                    </Form>
                </Col>
            </Col>
        </Row>
    );
}

export default ProfilePage;