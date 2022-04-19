import React from "react";
import { Form, Input, Button, Typography, Row,Col} from "antd";
import { LeftCircleFilled,
   PhoneFilled,
    MailFilled,
    FacebookFilled,
   TwitterSquareFilled,
   InstagramFilled    } from "@ant-design/icons";

const ContactUs = () => {
  const [form] = Form.useForm();
  const { Title, Text } = Typography;
  return (
    <div
    style={{
      backgroundColor:"#010449",
      marginLeft:40,
      marginTop:100,
      marginRight:40
      }}>
        <Row>
          <Col
           span={12}
           style={{
            //  backgroundColor:"#ffbf00",
             marginTop:80,
             borderRadius:10
           }}>
             <Title // Form's Title
        level={3}
        style={{
          marginBottom: 20,
          paddingTop: 60,
          paddingLeft: 0,
          paddingRight: 30,
          marginLeft:50,
          textAlign:"left",
          color: "#ffffff",
          fontSize:35
        }}
      >
        Contact Us!
      </Title>
      <Text // Form's Description
        type="secondary"
        style={{
          paddingLeft: 30,
          paddingRight: 30,
          color:"#eeeeee"
        }}
      >
        Got a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible
      <br/>
      </Text>
      <PhoneFilled  
      style={{ 
        fontSize: "1.2em", 
        color: "#0080ff",
        marginTop:40,
        marginLeft:-250,
        marginRight:40,
        
        }}
        />
      <Text
        style={{
          color:"#ffffff",
          marginLeft:0
        }}
      >     +251-9-20-98-78</Text><br/>
      <MailFilled 
       style={{ 
        fontSize: "1.2em", 
        color: "#0080ff",
        marginTop:20,
        marginLeft:-220,
        marginRight:10
        }}
        />
      <Text
        style={{
          color:"#ffffff",
          marginLeft:30
        }}
      >     Moonlight@gmail.com</Text><br/>
      <FacebookFilled 
      style={{ 
        fontSize: "1.5em", 
        color: "#ffffff",
        marginTop:200,
        marginLeft:-150,
        marginRight:10
        }}
      />
      <TwitterSquareFilled 
      style={{ 
        fontSize: "1.5em", 
        color: "#ffffff",
        marginTop:200,
        marginLeft:-110,
        marginRight:10
        }}
      />
      <InstagramFilled 
      style={{ 
        fontSize: "1.5em", 
        color: "#ffffff",
        marginTop:200,
        marginLeft:-100,
        marginRight:70
        }}
      />
          </Col>
          <Col
           span={12}>
      
      <Form // Ant Design's Form Component
        name="contact-us"
        layout="vertical"
        form={form}
        wrapperCol={{
          span:21,
        }}
        labelCol={{ span: 8 }}
    //   wrapperCol={{ span: 16 }}
        style={{
          marginTop: 80,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 0,
          paddingTop:20,
          marginRight: 220,
          marginBottom:80,
          marginLeft:60,
          borderRadius:30,
          backgroundColor: "white",
        }}
      >
        <Form.Item // Form Item (Full Name)
          label="Full Name"
          name="fullName"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter your full name!",
            },
          ]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item // Form Item (Phone Number)
          label="Phone Number"
          name="phoneNumber"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter your phone number!",
            },
          ]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>
        <Form.Item // Form Item (Email)
          label="Email"
          name="email"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter your email!",
              type: "email",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item // Form Item (Message)
          label="Type your message here"
          name="message"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Message is a required field!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Let us know how we can help you?"
            autoSize={{ minRows: 4, maxRows: 6 }}
          />
        </Form.Item>
        <Form.Item // Form Item (Submit Button)
        >
          <Button type="primary" style={{ borderRadius:10, borderColor: "",paddingLeft:30,paddingRight:30,marginLeft:30 }}>Submit</Button>
        </Form.Item>
      </Form>
      </Col>
      </Row>
    </div>
  );
};

export default ContactUs;