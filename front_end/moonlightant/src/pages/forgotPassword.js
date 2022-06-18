import { Form, Input, Button, Checkbox, Space, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import "../styles/signIn.css";
import { useLocation } from "react-router-dom";
const ForgotPassword = () => {

  const location = useLocation();
	const navigate = useNavigate();
	const [message, setMessage] = useState(null);
	const [failMessage, setFailMessage] = useState(null);
  const [first,setFirst]=useState();
	const [loginInput, setLogin] = useState({
		email: "",
		error_list: [],
	});

	const handleInput = (e) => {
		e.persist();
		setLogin({ ...loginInput, [e.target.name]: e.target.value });
	};
    const forgotSubmit=()=>{
        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.post("api/forgotPassword",loginInput).then((res)=>{
                if(res.status==200){
                    message.info('check your email');
                }
                else{message.info('failed to send an email')}
            })
        })
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
					<h1>Forgot password</h1>
				</Divider>

				<Form
					style={{
						display: "flex",
						flexDirection: "column",
						width: 300,
					}}
					name="basic"
					initialValues={{
						remember: true,
					}}
					layout="vertical"
					onFinish={forgotSubmit}
					autoComplete="off"
				>
					<div style={{ color: "green" }}>{message}</div>
					<div style={{ color: "red" }}>{failMessage}</div>
					<Form.Item
						style={{ fontWeight: "bold" }}
						label="Email"
						rules={[
							{
								required: true,
								message: "Please input your email!",
							},
						]}
					>
						<Input
							placeholder="Enter your email"
							name="email"
							style={{ display: "flex", width: "100%" }}
							onChange={handleInput}
							value={loginInput.email}
						/>
						<span style={{ color: "red", fontWeight: "normal" }}>
							{loginInput.error_list.email}
						</span>
					</Form.Item>

					<Form.Item style={{}}>
						<Button type="primary" style={{ width: "100%" }} htmlType="submit">
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

export default ForgotPassword;
