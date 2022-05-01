import {
	CDBInput,
	CDBCard,
	CDBCardBody,
	CDBBtn,
	CDBContainer,
	CDBSelect,
} from "cdbreact";
import { useState } from "react";
import { Link } from "react-router-dom";
import image from "../assets/image3.jpg";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/register.css";
import { useNavigate } from "react-router-dom";
//import swal from 'sweetalert';

const Register = () => {
	const navigate = useNavigate();
	const [registerInput, setRegister] = useState({
		email: "",
		password: "",
		name: "",
		position: "",
		confirmPassword: "",
		error_list: [],
		success_list: "",
		confirm_error: "",
	});

	const handleInput = (e) => {
		e.persist();

		setRegister({ ...registerInput, [e.target.name]: e.target.value });
	};

	const registerSubmit = (e) => {
		e.preventDefault();
		const data = {
			email: registerInput.email,
			password: registerInput.password,
			position: registerInput.position,
			name: registerInput.name,
		};
		const confirmPassword = registerInput.confirmPassword;
		if (confirmPassword == registerInput.password) {
			axios.get("/sanctum/csrf-cookie").then((res) => {
				axios.post("/api/register", data).then((res) => {
					if (res.data.status === 200) {
						console.log("before auth_token");

						localStorage.setItem("auth_token", res.data.token);
						localStorage.setItem("auth_email", res.data.email);
						localStorage.setItem("auth_name", res.data.name);
						localStorage.setItem("auth_id", res.data.id);
						localStorage.setItem("auth_position", res.data.position);
						// swal("Success",res.data.message,"success");
						setRegister({ registerInput, success_list: res.data.message });

						navigate("/login");
					} else {
						console.log("inside else");
						setRegister({
							...registerInput,
							error_list: res.data.validation_errors,
						});
					}
				});
			});
		} else {
			setRegister({
				...registerInput,
				confirm_error: "passwords are not the same",
			});
		}
	};
	//   const [option] = useState([
	//   {
	//     text: 'Institution',
	//     value: '1',
	//   },
	//   {
	//     text: 'Student',
	//     value: '2',
	//   },
	//   {
	//     text: 'Hiring Company',
	//     value: '3',
	//   },
	// ]);

	return (
		<><div className="body" style={{}}>
			<CDBContainer className="d-flex">
				<CDBCard className="card1">
					<CDBCardBody className="mx-4">
						<form onSubmit={registerSubmit}>
							<div className="text-center">
								<p className="h2"> Sign up </p>
							</div>
							{/* <div style={{color:"green"}}>{registerInput.success_list}</div> */}
							<div className="select">
								<label>Sign up as:</label>
								<select
									value={registerInput.position}
									name="position"
									onChange={handleInput}
								>
									<option value="">sign up as</option>
									<option value="Institution">Hiring Company</option>
									<option value="Student">Student</option>
									<option value="Instructor">Instructor/Teacher</option>
								</select>
							</div>
							<label htmlFor="defaultRegisterName" className="text-muted m-0">
								Enter Name
							</label>
							<CDBInput
								id="defaultRegisterName"
								className="mt-n3"
								type="text"
								name="name"
								onChange={handleInput}
								value={registerInput.name} />
							<div style={{ color: "red" }}>
								{registerInput.error_list.name}
							</div>
							<label htmlFor="defaultRegisterEmail" className="text-muted m-0">
								Your email
							</label>
							<CDBInput
								id="defaultRegisterEmail"
								className="mt-n3"
								type="email"
								name="email"
								onChange={handleInput}
								value={registerInput.email} />
							<div style={{ color: "red" }}>
								{registerInput.error_list.email}
							</div>
							<label
								htmlFor="defaultRegisterPassword"
								className="text-muted m-0"
							>
								Your password
							</label>
							<CDBInput
								id="defaultRegisterPasswordConfirm"
								className="mt-n3"
								type="password"
								name="password"
								onChange={handleInput}
								value={registerInput.password} />
							<div style={{ color: "red" }}>
								{registerInput.error_list.password}
							</div>
							<label
								htmlFor="defaultRegisterPassword"
								className="text-muted m-0"
							>
								Confirm Your password
							</label>
							<CDBInput
								id="defaultRegisterPassword"
								className="mt-n3"
								type="password"
								name="confirmPassword"
								onChange={handleInput} />
							<div style={{ color: "red" }}>
								{registerInput.error_list.password}
							</div>
							<div style={{ color: "red" }}>{registerInput.confirm_error}</div>
							{/* <Link to="/login" style={{textDecoration:'none'}}> */}
							<CDBBtn
								type="submit"
								color="warning"
								circle
								className="btn-block-register"
							>
								Register
							</CDBBtn>
							{/* </Link> */}
						</form>
					</CDBCardBody>
				</CDBCard>
			</CDBContainer>
		</div><div className="body" style={{}}>

				<CDBContainer className="d-flex">
					<CDBCard className="card1">
						<CDBCardBody className="mx-4">
							<form onSubmit={registerSubmit}>
								<div className="text-center">
									<p className="h2"> Sign up </p>
								</div>
								{/* <div style={{color:"green"}}>{registerInput.success_list}</div> */}
								<div className="select">
									<label className="select_label">
										Sign up as:
									</label>
									<select value={registerInput.position} name="position" onChange={handleInput}>
										<option value="Hiring Company">Hiring Company</option>
										<option value="Student">Student</option>
										<option value="Instructor">Instructor/Teacher</option>

									</select>
								</div>
								<label htmlFor="defaultRegisterName" className="text-muted m-0">
									Enter Name
								</label>
								<CDBInput id="defaultRegisterName" className="mt-n3" type="text" name="name" onChange={handleInput} value={registerInput.name} />
								<div style={{ color: "red" }}>{registerInput.error_list.name}</div>
								<label htmlFor="defaultRegisterEmail" className="text-muted m-0">
									Your email
								</label>
								<CDBInput id="defaultRegisterEmail" className="mt-n3" type="email" name="email" onChange={handleInput} value={registerInput.email} />
								<div style={{ color: "red" }}>{registerInput.error_list.email}</div>
								<label htmlFor="defaultRegisterPassword" className="text-muted m-0">
									Your password
								</label>
								<CDBInput id="defaultRegisterPasswordConfirm" className="mt-n3" type="password" name="password" onChange={handleInput} value={registerInput.password} />
								<div style={{ color: "red" }}>{registerInput.error_list.password}</div>
								<label htmlFor="defaultRegisterPassword" className="text-muted m-0">
									Confirm Your password
								</label>
								<CDBInput id="defaultRegisterPassword" className="mt-n3" type="password" name="confirmPassword" onChange={handleInput} />
								<div style={{ color: "red" }}>{registerInput.error_list.password}</div>
								<div style={{ color: "red" }}>{registerInput.confirm_error}</div>
								{/* <Link to="/login" style={{textDecoration:'none'}}> */}
								<CDBBtn type="submit" color="warning" circle className="btn-block-register">
									Register
								</CDBBtn>
								{/* </Link> */}
							</form>
						</CDBCardBody>
					</CDBCard>
				</CDBContainer>
			</div></>


     );
	 
}

 
export default Register;
