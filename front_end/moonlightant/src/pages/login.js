import { Form, Input, Button, Checkbox, Space } from 'antd';

const LogIn = () => {
    return ( 
        <div className='space-align-container'>
        <div className='space-align-center'>
        <Space className='space-align-center'>
      <Form
      style={{paddingTop:"5rem"}}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 20 ,
      }}
      initialValues={{
        remember: true,
      }}
     
      autoComplete="off"
    >
      
      <Form.Item
        style={{paddingTop:"2rem"}}
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      
  


      {/* <Space className='space-align-center'> */}
      <Form.Item
       style={{paddingTop:"2rem"}}
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      {/* </Space> */}

      <Form.Item
      // style={{alignItems:'center', paddingRight:'5rem'}}
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox style={{paddingRight:'5rem', paddingTop:'3rem'}}>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
       style={{paddingBottom:"5rem", paddingTop:"2rem"}}
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
    </Space>
    </div>
        </div>
     );
}
 
export default LogIn;