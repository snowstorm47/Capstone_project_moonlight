import { Form, Input, Button, Checkbox, Space } from 'antd';
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
const LogIn = () => {

  const location = useLocation();
	const navigate = useNavigate();
	const [message, setMessage] = useState(null);
	const [failMessage, setFailMessage] = useState(null);
  const [first,setFirst]=useState();
	const [loginInput, setLogin] = useState({
		email: "",
		password: "",
		error_list: [],
	});

	const handleInput = (e) => {
		e.persist();
		setLogin({ ...loginInput, [e.target.name]: e.target.value });
	};

	const loginSubmit = (e) => {
		// e.preventDefault();

		const data = {
			email: loginInput.email,
			password: loginInput.password,
		};

		axios.get("/sanctum/csrf-cookie").then((response) => {
			axios.post("api/login", data).then((res) => {
				if (res.data.status === 200) {
					localStorage.setItem("auth_token", res.data.token);
					localStorage.setItem("auth_email", res.data.email);
					localStorage.setItem("auth_name", res.data.name);
					localStorage.setItem("auth_id", res.data.id);
					localStorage.setItem("auth_position", res.data.position);
					setMessage(res.data.message);
					console.log(res.data.message);
            axios.get(`api/checkCreateProfile?id=${localStorage.getItem("auth_id")}`).then((response) => {
              setFirst(response.data.first);
              console.log(response.data.first);
            });
					if (first === 0) {
						if (localStorage.getItem("auth_position") === "Student") {
							navigate("/createprofile");
						} else if (
							localStorage.getItem("auth_position") === "Institution"
						) {
							navigate("/createprofileinstitution");
						} else if (localStorage.getItem("auth_position") === "Instructor") {
							navigate("/createprofileinstructor");
						} else if (
							localStorage.getItem("auth_position") === "Hiring Company"
						) {
							navigate("/createprofilehiring");
						}
					} else {
						navigate("/newsfeed");
					}
				} else if (res.data.status === 401) {
					console.log(res.data.message);
					setFailMessage(res.data.message);
					console.log(message);
				} else {
					setLogin({ ...loginInput, error_list: res.data.validation_errors });
				}
			});
		});
	};

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
      onFinish={loginSubmit}
      autoComplete="off"
    >
      <div style={{ color: "green" }}>{message}</div>
			<div style={{ color: "red" }}>{failMessage}</div>
      <Form.Item
        style={{paddingTop:"2rem"}}
        label="Email"
        
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input 
        name="email"
        onChange={handleInput}
				value={loginInput.email}/>
						<span>{loginInput.error_list.email}</span>
      </Form.Item>
      
  


      {/* <Space className='space-align-center'> */}
      <Form.Item
       style={{paddingTop:"2rem"}}
        label="Password"
        
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password 
        name="password"
        onChange={handleInput}
				value={loginInput.password}
        />
						<span>{loginInput.error_list.password}</span>
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