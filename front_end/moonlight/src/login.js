import "bootstrap/dist/css/bootstrap.css";
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBContainer } from "cdbreact";
import { Link } from "react-router-dom";
import "./register.css";
import images from "./image2.jpg";

const Login = () => {
	return (
		<div
			className="body"
			style={{
				backgroundImage: `url(${images})`,
				backgroundSize: "cover",
				maxHeight: "fit-content",
			}}
		>
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
							<p className="h2 bold"> Log in </p>
						</div>

						<label htmlFor="defaultRegisterEmail" className="text-muted m-0">
							Your email
						</label>
						<CDBInput
							id="defaultRegisterEmail"
							className="mt-n3"
							type="email"
						/>
						<label htmlFor="defaultRegisterPassword" className="text-muted m-0">
							Your password
						</label>
						<CDBInput
							id="defaultRegisterEmail"
							className="mt-n3"
							type="password"
						/>
						<Link to="/forgot">forgot password?</Link>
						<Link to="/landing" style={{ textDecoration: "none" }}>
							<CDBBtn
								type="submit"
								color="warning"
								circle
								className="btn-block-login mt-4 mx-auto"
							>
								Login
							</CDBBtn>
						</Link>
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
					</CDBCardBody>
				</CDBCard>
			</CDBContainer>
		</div>
	);
};

export default Login;
