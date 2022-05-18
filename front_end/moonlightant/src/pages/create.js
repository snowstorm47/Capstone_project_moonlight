import { Form, Input, Button, Checkbox, Space, Select } from 'antd';

const { Option } = Select;

const Enter = () => {
    return ( 
        <div className='space-align-container'>
        <div className='space-align-center'>
        <Space className='space-align-center'>
      <Form
      style={{paddingTop:"3rem"}}
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


<Select
    labelInValue
    defaultValue={{ value: 'Student' }}
    style={{width: '15rem'}}
      
  >
    <Option value="instractor">Instractor</Option>
    <Option value="hiringcompany">HiringCompany</Option>
    <Option value="institution">Institution</Option>
  </Select>




  <Form.Item
        style={{paddingTop:"2rem", paddingRight:"2rem", width:'27rem'}}
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
      
      <Form.Item
        style={{paddingTop:"2rem", width:'25rem'}}
        label="Fullname"
        name="fullname"
        rules={[
          {
            required: true,
            message: 'Please input your fullname!',
          },
        ]}
      >
        <Input />
      </Form.Item>



      
      
  


      {/* <Space className='space-align-center'> */}
      <Form.Item
       style={{paddingTop:"2rem", width:'25 rem'}}
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
        <Checkbox style={{paddingRight:'5rem', paddingTop:'2rem'}}>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
       style={{ paddingTop:"1rem", paddingBottom:"1rem"}}
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
 
export default Enter;