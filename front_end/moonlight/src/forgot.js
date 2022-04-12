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
import "bootstrap/dist/css/bootstrap.css";
import "./forgot.css";
const Forgot = () => {
	return (
		<div className="forgot_body">
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>
						<Form.Control type="email" placeholder="Enter Name" />
					</Form.Label>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
					</Form.Label>
				</Form.Group>
			</Form>

			<Button variant="primary" type="submit">
				Reset
			</Button>
		</div>
	);
};

export default Forgot;
