import { Form, Input, Button, Checkbox, Space, Select } from "antd";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ConsoleSqlOutlined } from "@ant-design/icons";
const { Option } = Select;

const AdminSignup = () => {
	const first = 0;
	const navigate = useNavigate();
	const [message, setMessage] = useState(null);
	const [position, setPosition] = useState("");
	const [failMessage, setFailMessage] = useState(null);
	const [registerInput, setRegister] = useState({
		email: "",
		password: "",
		name: "",
		position: "",
		confirmPassword: "",
		error_list: [],
		confirm_error: "",
	});

	const handleInput = (e) => {
		// e.persist();

		setRegister({ ...registerInput, [e.target.name]: e.target.value });
	};
	// const handleInputPosition = (e) => {
	//   // e.persist();
	//   console.log(e)
	//   setRegister({ position: e});
	//   console.log(registerInput.position);
	// };

	const registerSubmit = (e) => {
		console.log(registerInput.email);
		console.log(registerInput.position);
		console.log(registerInput.password);
		console.log(registerInput.name);
		// e.preventDefault();

		const data = {
			email: registerInput.email,
			password: registerInput.password,
			position: "Admin",
			name: registerInput.name,
		};

    const confirmPassword = registerInput.confirmPassword;
    if (confirmPassword === registerInput.password) {
      axios.get("/sanctum/csrf-cookie").then((res) => {
        console.log("inside csrf");
        axios.post("/api/register", data).then((res) => {
          setMessage("You have successfully registered Admin");
        });
      });
    } else {
      setRegister({
        ...registerInput,
        confirm_error: "passwords are not the same",
      });
    }
  };

  return (
    <div className="space-align-container">
      <div className="space-align-center">
        <Space className="space-align-center">
          <Form
            style={{ paddingTop: "3rem" }}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 20,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            onFinish={registerSubmit}
          >
            <div style={{ color: "green" }}>{message}</div>
            <div style={{ color: "red" }}>{failMessage}</div>
            <Form.Item
              style={{
                paddingTop: "2rem",
                paddingRight: "2rem",
                width: "27rem",
              }}
              label="Email"
              
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input 
              name="email"
              onChange={handleInput}
              value={registerInput.email}
              />
              {/* <span style={{color:"red"}}>{registerInput.error_list.email}</span> */}
            </Form.Item>

						<Form.Item
							style={{ paddingTop: "2rem", width: "25rem" }}
							label="Full Name"
							rules={[
								{
									required: true,
									message: "Please input your Full Name!",
								},
							]}
						>
							<Input
								name="name"
								onChange={handleInput}
								value={registerInput.name}
							/>
							{/* <span style={{color:"red"}}>{registerInput.error_list.name}</span> */}
						</Form.Item>

						{/* <Space className='space-align-center'> */}
						<Form.Item
							style={{ paddingTop: "2rem", width: "25 rem" }}
							label="Password"
							rules={[
								{
									required: true,
									message: "Please input your password!",
								},
							]}
						>
							<Input.Password
								name="password"
								onChange={handleInput}
								value={registerInput.password}
							/>
							{/* <span style={{color:"red"}}>{registerInput.error_list.password}</span> */}
						</Form.Item>

						<Form.Item
							style={{ paddingTop: "2rem", width: "25 rem" }}
							label="Confirm Password"
							rules={[
								{
									required: true,
									message: "Please confirm your password!",
								},
							]}
						>
							<Input.Password name="confirmPassword" onChange={handleInput} />
							{/* <div style={{color:"red"}}>{registerInput.error_list.password}</div> */}
							<div style={{ color: "red" }}>{registerInput.confirm_error}</div>
						</Form.Item>
                        <Form.Item
							style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
							wrapperCol={{
								offset: 8,
								span: 16,
							}}
						>
							<Button type="primary" htmlType="submit">
								Sign Up Admin
							</Button>
						</Form.Item>
					</Form>
				</Space>
			</div>
		</div>
	);
};

export default AdminSignup;
