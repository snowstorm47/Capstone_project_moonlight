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
import { useState } from 'react';
import { Typography } from 'antd';

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
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

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

function ProfilePageP(){

    const [items, setItems] = useState(['Laravel', 'ReactJS']);
    const [name, setName] = useState('');

    let index = 0;
    const addItem = e => {
        e.preventDefault();
        setItems([...items, name || `New item ${index++}`]);
        setName('');
    };

    const onNameChange = event => {
        setName(event.target.value);
    };

    <Avatar icon={<UserOutlined />} />
    return (
        <Row className="row1" style={{margin:'3em', marginLeft: '0em'}}>
            <Col className="row" span={5} style={{
                margin: '0.5em',
                paddingRight: '1.5em',
                paddingTop: '8em'
            }}>
                <Col>
                    <div className="image1">
                        <Image
                            width={190}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            // size={100} 
                            style={{borderRadius: '100px', alignContent: 'left'}}
                            
                        />
                    </div>
                </Col>

                {/* <Col>
                    <Divider>Work</Divider>
                    <Divider>Work</Divider>
                    <Divider>Work</Divider>
                    <Select
                        mode="multiple"
                        placeholder="Skills"
                        dropdownRender={menu => (
                            <>
                            {menu}
                            <Divider style={{ margin: '8px 0' }} />
                            <Space align="center" style={{ padding: '0 8px 4px' }}>
                                <Input placeholder="Please enter item" value={name} onChange={onNameChange} />
                                <Typography.Link onClick={addItem} style={{ whiteSpace: 'nowrap' }}>
                                <PlusOutlined /> Add Skill
                                </Typography.Link>
                            </Space>
                            </>
                        )}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                    >
                        {items.map(item => (
                            <Option key={item}>{item}</Option>
                        ))}
                        {children}
                    </Select>

                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                    <br />
                    <br />
                    <Button type="primary" htmlType="submit">
                        Cancel
                    </Button>
                </Col> */}
            </Col>
            
            
            <Col className="row3" span={9} style={{margin: '0.5em', paddingRight: '1em', textAlign:'left'}}>
                <Divider>Profile Page</Divider>
                <Col>
                    <Form.Item label="Full Name" style={{width: '70%'}}>
                        <Input style={{marginLeft: '2.5em'}}/>
                    </Form.Item>
  
                </Col>

                <Col> 
                    <Form.Item label="Email" style={{width: '64%'}} rules={[
                        { 
                        type: 'email'
                        }
                        ]}>
                        <Input style={{marginLeft: '4.6em'}}/>
                    </Form.Item>
                </Col>

                <Col>    
                    <Form.Item label="Phone Number" style={{width: '76.5%'}}>
                        <Input style={{marginLeft: '0.2em'}}/>
                    </Form.Item>
                </Col>

                <Col> 
                    <label>Gender:<Select defaultValue="male" style={{ width: 120, padding: 10, marginLeft: '3.7em'}} onChange={handleChange}>
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                    </Select></label>
                </Col>

                <Col>
                    <Divider>Academic</Divider>
                    <Select
                        showSearch
                        placeholder="Select an Institution"
                        style={{padding: 10, width: '75%', borderRadius: '80px'}}
                        optionFilterProp="campus"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="aastu">Addis Ababa Science and Technology University</Option>
                        <Option value="astu">Adama Science and Technology University</Option>
                        <Option value="aau">Addis Ababa University</Option>
                    </Select>
                </Col>

                <Col>
                <Select
                        showSearch
                        placeholder="Select a College"
                        style={{padding: 10, width: '75%', borderRadius: '80px'}}
                        optionFilterProp="college"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="CEE">College of Electrical Engineering</Option>
                        <Option value="CME">College of Mechanical Engineering</Option>
                        <Option value="CA">College of Architecture</Option>
                    </Select>
                </Col>
                
                <Col>
                <Select
                        showSearch
                        placeholder="Select a Department"
                        style={{padding: 10, width: '75%', borderRadius: '80px'}}
                        optionFilterProp="department"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="SE">Software Engineering</Option>
                        <Option value="EE">Electrical Engineering</Option>
                        <Option value="ME">Mechanical Engineering</Option>
                        <Option value="A">Architecture</Option>
                        <Option value="EME">Electro-Mechanical Engineering</Option>
                    </Select>
                </Col>

                <Col> 
                    <Space direction="vertical" style={{padding: 10, width: '75%'}}>
                    <DatePicker onChange={onChange} placeholder="Start Date"/>
                    <DatePicker onChange={onChange} placeholder="End Date" style={{float:'right', marginTop: '-2.9em'}}/>
                    </Space>
                    
                </Col>
            
            
                
            </Col>

            <Col className="row2" span={9} style={{margin: '0.5em', paddingLeft: '1.5em', paddingTop: '3em'}}>
            <Divider>Skills</Divider>
                <Col>
                    <Select
                        mode="multiple"
                        placeholder="Skills"
                        
                        dropdownRender={menu => (
                            <>
                            {menu}
                            <Divider style={{ margin: '8px 0' }} />
                            <Space align="center" style={{ padding: '0 8px 4px' }}>
                                <Input placeholder="Please enter item" value={name} onChange={onNameChange} />
                                <Typography.Link onClick={addItem} style={{ whiteSpace: 'nowrap' }}>
                                <PlusOutlined /> Add Skill
                                </Typography.Link>
                            </Space>
                            </>
                        )}
                        onChange={handleChange}
                        style={{ width: '70%', marginBottom: '1.7em', marginLeft: '-10.2em', borderRadius: '80px'}}
                    >
                        {items.map(item => (
                            <Option key={item} style={{borderRadius: '80px'}}>{item}</Option>
                        ))}
                        {children}
                    </Select>
                   
                </Col>
                <Divider>Employement History</Divider>                    
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
                                            <Input placeholder="Company"  />
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
                                            {/* <br /> */}
                                            <DatePicker onChange={onChange} placeholder="Start Date" 
                                            style={{
                                                // right: '16rem', 
                                                width: "7rem", 
                                                // marginLeft:"11rem"
                                            }}
                                                />
                                            
                                            <DatePicker onChange={onChange} placeholder="End Date" 
                                            style={{float: 'right', width:"7rem"}}
                                            />
                                            </Space>
                                        </Form.Item>
                                        <div style={{left: '4', paddingRight: '6rem'}}>
                                        <MinusCircleOutlined  onClick={() => remove(name)} />
                                        </div>
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
            </Col>
        </Row>
    );
}

export default ProfilePageP;