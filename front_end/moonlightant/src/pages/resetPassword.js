import { Form, Input, Button, Checkbox, Space, Divider,message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import "../styles/signIn.css";
import { useLocation } from "react-router-dom";
const ResetPassword = (props) => {

  const location = useLocation();
	const navigate = useNavigate();
	const [message, setMessage] = useState(null);
	const [failMessage, setFailMessage] = useState(null);
  const [first,setFirst]=useState();
	let {id}=useParams();
	const[loading,setLoading]=useState(false);
	const [loginInput, setLogin] = useState({
		email:"",
		token:id,
		password: "",
        password_confirmation:"",
		error_list: [],
	});
	const handleInput = (e) => {
		console.log(id);
		e.persist();
		setLogin({ ...loginInput, [e.target.name]: e.target.value });
	};

	const handleSubmit=()=>{
		setLoading(true);
		if(window.navigator.onLine)
        axios.get("/sanctum/csrf-cookie").then((response) => {
			axios.post('api/resetPassword',loginInput).then((res)=>{
				console.log(res);
				setLoading(false);
				if(res.data.status==200){
					message.success(res.data.message);
					setMessage(res.data.message);
				}
				else{
					message.error(res.data.message);

				}

			})
		});
		else{setFailMessage('no internet')}
	}
	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				height: 640,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div
				style={{
					position: "absolute",
					backgroundColor: "white",
					width: "auto",
					height: "auto",
					boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
					padding: 40,
					display: "flex",
					flexDirection: "column",
					paddingTop: "3%",
					borderRadius: 25,
					fontFamily: "sans-serif",
				}}
			>
				<Divider>
					<h1>Reset password</h1>
				</Divider>

				<Form
					style={{
						display: "flex",
						flexDirection: "column",
						width: 300,
					}}
					name="basic"
					onFinish={handleSubmit}
					initialValues={{
						remember: true,
					}}
					layout="vertical"
		
					autoComplete="off"
				>
					<div style={{ color: "green" }}>{message}</div>
					<div style={{ color: "red" }}>{failMessage}</div>

					{/* <Space className='space-align-center'> */}
					<Form.Item
						style={{ fontWeight: "bold" }}
						label="Email"
						placeholder="Enter your Email"
						rules={[
							{
								required: true,
								message: "Please input your Email!",
							},
						]}
					>
						<Input
							name="email"
							onChange={handleInput}
							value={loginInput.email}
						/>
						<span style={{ color: "red", fontWeight: "normal" }}>
							{loginInput.error_list.email}
						</span>
					</Form.Item>
					<Form.Item
						style={{ fontWeight: "bold" }}
						label="Password"
						placeholder="Enter your password"
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
							value={loginInput.password}
						/>
						<span style={{ color: "red", fontWeight: "normal" }}>
							{loginInput.error_list.password}
						</span>
					</Form.Item>
					<Form.Item
						style={{ fontWeight: "bold" }}
						label="Confirm password"
						placeholder="Confirm your password"
						rules={[
							{
								required: true,
								message: "Please input your password!",
							},
						]}
					>
						<Input.Password
							name="password_confirmation"
							onChange={handleInput}
							value={loginInput.password_confirmation}
						/>
						<span style={{ color: "red", fontWeight: "normal" }}>
							{loginInput.error_list.password}
						</span>
					</Form.Item>
					{/* </Space> */}


					<Form.Item style={{}}>
						<Button type="primary" loading={loading} style={{ width: "100%" }} htmlType="submit">
							Login
						</Button>
					</Form.Item>
				</Form>
			</div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				style={{ marginTop: "auto" }}
				viewBox="0 0 1440 320"
			>
				<path
					fill="#0099ff"
					fill-opacity="1"
					d="M0,128L60,122.7C120,117,240,107,360,112C480,117,600,139,720,128C840,117,960,75,1080,48C1200,21,1320,11,1380,5.3L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
				></path>
			</svg>
		</div>
	);
};

export default ResetPassword;
