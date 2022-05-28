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
    placeholder="Choose how to sign up as"
    style={{width: '20rem',padding:"1rem",marginLeft:'6rem'}}
      
  >
    <Option value="student">Student</Option>
    <Option value="instractor">Instractor</Option>
    <Option value="hiringcompany">HiringCompany</Option>
    <Option value="institution">Institution</Option>
  </Select>

      
      <Form.Item
        style={{paddingTop:"2rem", width:'27rem', paddingLeft:'1 rem',marginLeft:"2rem"}}
        label="Fullname"
        name="fullname"
        rules={[
          {
            required: true,
            message: 'Please input your fullname!',
          },
        ]}
      >
        <Input
        placeholder='Enter Fullname' 
        style={{padding:'0.7rem',width:"20rem"}}
        />
      </Form.Item>



      
      <Form.Item
        style={{paddingTop:"2rem", paddingRight:"2rem", width:'29rem',marginLeft:"2rem"}}
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input
        placeholder='Enter Email'
        style={{padding:'0.7rem',width:"20rem"}}
         />
      </Form.Item>
  


      {/* <Space className='space-align-center'> */}
      <Form.Item
       style={{paddingTop:"2rem", width:'24rem',paddingLeft:"5rem"}}
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
        style={{padding:'0.7rem',width:"20rem"}}
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
        <Checkbox style={{paddingRight:'5rem', paddingTop:'2rem'}}>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
       style={{ paddingTop:"1rem", paddingBottom:"1rem"}}
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" style={{paddingLeft:"8rem",paddingRight:"8rem",marginRight:"16rem",position:"relative", marginBottom:"2rem"}}>
          SignUp
        </Button>
      </Form.Item>
    </Form>
    </Space>
    </div>
        </div>
     );
}
 
export default Enter;