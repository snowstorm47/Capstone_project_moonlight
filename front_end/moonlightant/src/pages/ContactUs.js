import React, { useState ,useEffect} from "react";
import { Form, Input, Button, Typography, Row, Col ,message} from "antd";
import {
	LeftCircleFilled,
	PhoneFilled,
	MailFilled,
	FacebookFilled,
	LinkedinFilled,
	InstagramFilled,
} from "@ant-design/icons";
import axios from "axios";
const ContactUs = () => {
	const [form] = Form.useForm();
	const { Title, Text } = Typography;
	const [adminContact,setAdminContact] = useState({
		PhoneNumber:"",
		Email:"",
		LinkedIn:"",
		Facebook:"",
		Instagram:""
	})
	const [contactus, setContactus] = useState({
		name:"",
		phoneNumber:"",
		email:"",
		message:""
	})
	useEffect(() => {
		axios.get(`/api/admincontact`).then((res) => {
		  if (res.data.status === 200) {
			setAdminContact(res.data.contact[0]);
			console.log(adminContact)
		  } else {
			console.log("couldnt retrieve data");
		  }
		});
	  }, []);

	  const sendMessage = () => {
		const data ={
			phoneNumber: contactus.phoneNumber,
			email: contactus.email,
			name: contactus.name,
			message: contactus.message
		}

		axios.post("api/sendcontactus", data).then((response) => {
			console.log(response);
			if (response.data.status === 200) {
				message.success("Thank You for contacting us!");
			} else {
				console.log("sending failed");
			}
		});
	  }

	  const handleInput = (e) => {
		setContactus({ ...contactus, [e.target.name]: e.target.value });
	};
	return (
		<div
			style={{
				backgroundColor: "#f0f2f5",
				marginLeft: 40,
				marginTop: 20,
				marginRight: 40,
			}}
		>
			<Row>
				<Col
					span={12}
					style={{
						//  backgroundColor:"#ffbf00",
						marginTop: 80,
						borderRadius: 10,
					}}
				>
					<Title // Form's Title
						level={3}
						style={{
							marginBottom: 20,
							paddingTop: 60,
							paddingLeft: 0,
							paddingRight: 30,
							marginLeft: 50,
							textAlign: "left",
							color: "#000000",
							fontSize: 35,
						}}
					>
						Contact Us!
					</Title>
					<Text // Form's Description
						type="secondary"
						style={{
							paddingLeft: 30,
							paddingRight: 30,
							color: "#000000",
						}}
					>
						Got a question? We'd love to hear from you. Send us a message and
						we'll respond as soon as possible
						<br />
					</Text>
					<PhoneFilled
						style={{
							fontSize: "1.2em",
							color: "#0080ff",
							marginTop: 40,
							marginLeft: -250,
							marginRight: 40,
						}}
					/>
					<Text
						style={{
							color: "#000000",
							marginLeft: 0,
						}}
					>
						{" "}
						{adminContact.PhoneNumber}
					</Text>
					<br />
					<MailFilled
						style={{
							fontSize: "1.2em",
							color: "#0080ff",
							marginTop: 20,
							marginLeft: -220,
							marginRight: 10,
						}}
					/>
					<Text
						style={{
							color: "#000000",
							marginLeft: 30,
						}}
					>
						{" "}
						{adminContact.Email}
					</Text>
					<br />
					<a href={adminContact.Facebook}>
					<FacebookFilled
						style={{
							fontSize: "1.5em",
							color: "#0080ff",
							marginTop: 200,
							marginLeft: -150,
							marginRight: 10,
						}}
					/>
					</a>
					<a href={adminContact.LinkedIn}>
					<LinkedinFilled 
						style={{
							fontSize: "1.5em",
							color: "#0080ff",
							marginTop: 200,
							marginLeft: -110,
							marginRight: 10,
						}}
					/>
					</a>
					<a href={adminContact.Instagram}>
					<InstagramFilled
						style={{
							fontSize: "1.5em",
							color: "#0080ff",
							marginTop: 200,
							marginLeft: -100,
							marginRight: 70,
						}}
					/>
					</a>
				</Col>
				<Col span={12}>
					<Form // Ant Design's Form Component
						name="contact-us"
						layout="vertical"
						form={form}
						wrapperCol={{
							span: 21,
						}}
						labelCol={{ span: 8 }}
						//   wrapperCol={{ span: 16 }}
						style={{
							marginTop: 80,
							paddingBottom: 10,
							paddingLeft: 20,
							paddingRight: 0,
							paddingTop: 20,
							marginRight: 220,
							marginBottom: 80,
							marginLeft: 60,
							borderRadius: 30,
							backgroundColor: "white",
						}}
						onFinish={()=>sendMessage()}
					>
						<Form.Item // Form Item (Full Name)
							label="Full Name"
							
							required
							tooltip="This is a required field"
							rules={[
								{
									required: true,
									message: "Please enter your full name!",
								},
							]}
						>
							<Input placeholder="First Name"
							name="name"
							onChange={handleInput}
							/>
						</Form.Item>
						<Form.Item // Form Item (Phone Number)
							label="Phone Number"
							required
							tooltip="This is a required field"
							rules={[
								{
									required: true,
									message: "Please enter your phone number!",
								},
							]}
						>
							<Input placeholder="Phone Number"
							name="phoneNumber"
							onChange={handleInput} />
						</Form.Item>
						<Form.Item // Form Item (Email)
							label="Email"
							required
							tooltip="This is a required field"
							rules={[
								{
									required: true,
									message: "Please enter your email!",
									type: "email",
								},
							]}
						>
							<Input placeholder="Email"
							name="email"
							onChange={handleInput}
							/>
						</Form.Item>
						<Form.Item // Form Item (Message)
							label="Type your message here"
							required
							tooltip="This is a required field"
							rules={[
								{
									required: true,
									message: "Message is a required field!",
								},
							]}
						>
							<Input.TextArea
								placeholder="Let us know how we can help you?"
								name="message"
							onChange={handleInput}
								autoSize={{ minRows: 4, maxRows: 6 }}
							/>
						</Form.Item>
						<Form.Item // Form Item (Submit Button)
						>
							<Button
								type="primary"
								htmlType="submit"
								style={{
									borderRadius: 10,
									borderColor: "",
									paddingLeft: 30,
									paddingRight: 30,
									marginLeft: 30,
								}}
							>
								Submit
							</Button>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</div>
	);
};

export default ContactUs;
