import { Form, Input, Button, Checkbox, Space } from 'antd';
import Ripple from '../components/ripple';

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
        className='roundedInput'
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
          
        ]}
        style={{marginRight:"4rem"}}
      >
        <Input
        placeholder='Enter Email'
        style={{padding:'0.7rem', width:"20rem"}} 
        />
      </Form.Item>
      
  


      {/* <Space className='space-align-center'> */}
      <Form.Item
       style={{paddingTop:"2rem",marginRight:"4rem"}}
        label="Password"
       
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password 
        placeholder='Enter Password'
        style={{padding:'0.7rem'}}
        />
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
       style={{paddingBottom:"3rem", paddingTop:"2rem"}}
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" style={{paddingLeft:"8rem",paddingRight:"8rem",marginRight:"16rem",position:"relative", marginBottom:"2rem"}}>
          Login
        </Button>
      </Form.Item>
    </Form>
    </Space>
    {/* <Ripple/> */}
    </div>
        </div>
     );
}
 
export default LogIn;