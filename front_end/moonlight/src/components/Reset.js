import { Button } from "bootstrap";
import {
	CDBInput,
	CDBCard,
	CDBCardBody,
	CDBBtn,
	CDBContainer,
	CDBSelect,
} from "cdbreact";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/forgot.css";
import axios from "axios";
import React, { useState, useParams, useNavigate } from "react";
const Reset = () => {
	const navigate = useNavigate();
	const urltoken = useParams();

	const [loginInput, setLogin] = useState({
		password: "",
		password_confirmation: "",
		token: urltoken.token,
		error_list: [],
	});
	const handleInput = (e) => {
		e.persist();
		setLogin({ ...loginInput, [e.target.name]: e.target.value });
	};

	const loginSubmit = (e) => {
		e.preventDefault();
		console.log(loginInput.token);

		const data = {
			password: loginInput.password,
			password_confirmation: loginInput.password_confirmation,
			token: loginInput.token,
		};

		axios.get("/sanctum/csrf-cookie").then((response) => {
			axios.post("api/resetPassword", data).then((res) => {
				if (res.data.status === 200) {
					//	swal("success", res.data.message, "success");
					navigate("/login");
				} else if (res.data.status === 401) {
					//	swal("warning", res.data.message, "warning");
				} else {
					setLogin({ ...loginInput, error_list: res.data.validation_errors });
				}
			});
		});
	};
	return (
		<div className="forgot_body">
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
						<div className="text-center">
							<p className="h2 bold"> Reset Password </p>
						</div>

						<label htmlFor="defaultRegisterEmail" className="text-muted m-0">
							password
						</label>
						<CDBInput
							id="defaultRegisterEmail"
							className="mt-n3"
							type="password"
							name="password"
							onChange={handleInput}
						/>
						<label htmlFor="defaultRegisterEmail" className="text-muted m-0">
							confirm password
						</label>
						<CDBInput
							id="defaultRegisterEmail"
							type="password"
							name="password_confirmation"
							onChange={handleInput}
						/>
						<CDBBtn
							type="submit"
							color="warning"
							circle
							className="btn-block-login mt-4 mx-auto"
						>
							Login
						</CDBBtn>
						{/* <Link to="/register" style={{}}>
                    Not Signed up yet?
                  </Link> */}
					</CDBCardBody>
				</CDBCard>
			</CDBContainer>

			{/* 
                        <Button variant='primary' type='submit'>
                            Reset
                        </Button> */}
		</div>
	);
};

export default Reset;
