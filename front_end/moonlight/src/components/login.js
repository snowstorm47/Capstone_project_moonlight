import "bootstrap/dist/css/bootstrap.css";
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBContainer } from "cdbreact";
import { Link } from "react-router-dom";
import "../styles/register.css";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import images from "../assets/image2.jpg";
import axios from "axios";
import React, { useState } from "react";

const Login = () => {
	const navigate = useNavigate();

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
		e.preventDefault();

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
					swal("success", res.data.message, "success");
					console.log(res.data.name);
					navigate("/");
				} else if (res.data.status === 401) {
					swal("warning", res.data.message, "warning");
				} else {
					setLogin({ ...loginInput, error_list: res.data.validation_errors });
				}
			});
		});
	};

	return (
		<div className="body" style={{}}>
			<CDBContainer className="d-flex align-items-center justify-content-center min-vh-100">
				<CDBCard
					style={{
						width: "24rem",
						borderRadius: "20px",
						height: "23rem",
						border: "none",
					}}
				>
					<CDBCardBody className="mx-4">
						<form onSubmit={loginSubmit}>
							<div className="text-center">
								<p className="h2 bold"> Log in </p>
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
							/>
							<div style={{ color: "red" }}>{loginInput.error_list.email}</div>
							<label
								htmlFor="defaultRegisterPassword"
								className="text-muted m-0"
							>
								Your password
							</label>
							<CDBInput
								id="defaultRegisterEmail"
								className="mt-n3"
								type="password"
								name="password"
								onChange={handleInput}
							/>
							<div style={{ color: "red" }}>
								{loginInput.error_list.password}
							</div>
							<Link to="/forgot">forgot password?</Link>
							{/* <Link to="/landing" style={{textDecoration:'none'}}> */}
							<CDBBtn
								type="submit"
								color="warning"
								circle
								className="btn-block-login mt-4 mx-auto"
							>
								Login
							</CDBBtn>
							{/* </Link> */}
							<CDBBtn
								type="submit"
								color="dark"
								circle
								className="btn-block-cancel "
							>
								Cancel
							</CDBBtn>
							{/* <Link to="/register" style={{}}>
                    Not Signed up yet?
                  </Link> */}
						</form>
					</CDBCardBody>
				</CDBCard>
			</CDBContainer>
		</div>
	);
};

export default Login;
