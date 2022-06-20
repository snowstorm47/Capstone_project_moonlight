import { Component, useState } from "react";
import { Layout, Menu, Icon, Col, Row, Badge } from "antd";
import {
	SendOutlined,
	BankOutlined,
	CheckCircleOutlined,
	UserOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NotificationAdd from "./NotificationAdd";
import NotificationInstitution from "./NotificationInstitution";
import NotificationUser from "./NotificationUser";
import NotificationSeen from "./NotificationSeen";
import NotificationRecieved from "./NotificationRecieved";
import NotificationInstructor from "./NotificationInstructor";
import NotificationHiring from "./NotificationHiring";
import NotificationInstructorVerify from "./NotificationInstructorVerify";
const { Header, Footer, Sider, Content } = Layout;

// Introduce submenu components
const SubMenu = Menu.SubMenu;

const Notification = () => {
	const [selectedMenuItem, setSelectedMenuItem] = useState("add");

	const componentsSwtich = (key) => {
		switch (key) {
			case "add":
				return <NotificationAdd />;
			case "institution":
				return <NotificationInstitution />;
			case "sent":
				return <NotificationUser />;
			case "user":
				return <NotificationRecieved />;
			case "company":
				return <NotificationHiring />;
			case "seen":
				return <NotificationSeen />;
			case "instructor":
				return <NotificationInstructor />;
			case "verifyInstructor":
				return <NotificationInstructorVerify/>;
			default:
				break;
		}
	};

	return (
		<Layout>
			<Sider
				width={256}
				style={{
					minHeight: "90vh",
					marginTop: "2.6rem",
				}}
				theme="light"
			>
				<div
					style={{
						height: "32px",
						background: "rgba(255,255,255,.2)",
						color: "black",
						margin: "16px",
					}}
				>
					{" "}
					Notification
				</div>
				<Menu
					// theme="dark"
					mode="inline"
					selectedKeys={selectedMenuItem}
					onClick={(e) => setSelectedMenuItem(e.key)}
				>
					<Menu.Item key="add">
						<PlusCircleOutlined />
						<span>Create Notification</span>
					</Menu.Item>
					{(localStorage.getItem("auth_position")==="Hiring Company")
					 ?"" : 
					<Menu.Item
						key="institution"
						style={{
							paddingBottom: "20px",
						}}
					>
						<BankOutlined />
						<span
							style={{
								color: "#000000",
							}}
						>
							Institution
						</span>
						<Badge
							count={99}
							overflowCount={10}
							status="warning"
							offset={[20, 20]}
						></Badge>
					</Menu.Item>}
					<Menu.Item
						key="instructor"
						style={{
							paddingBottom: "20px",
						}}
					>
						<UserOutlined />
						<span>Instructor</span>
						<Badge
							count={99}
							overflowCount={10}
							status="warning"
							offset={[20, 20]}
						></Badge>
					</Menu.Item>
					<Menu.Item
						key="user"
						style={{
							paddingBottom: "20px",
						}}
					>
						<UserOutlined />
						<span>Student</span>
						<Badge
							count={99}
							overflowCount={10}
							status="warning"
							offset={[20, 20]}
						></Badge>
					</Menu.Item>
					{(localStorage.getItem("auth_position")==="Institution" || localStorage.getItem("auth_position")==="Hiring Company")
					 ?"" : <Menu.Item key="company">
					 <BankOutlined />
					 <span>Hiring Company</span>
					 <Badge
						 count={0}
						 overflowCount={10}
						 status="warning"
						 offset={[20, 20]}
					 ></Badge>
				 </Menu.Item>}
				 {(localStorage.getItem("auth_position")==="Institution" )
					?
					<Menu.Item key="verifyInstructor">
						<UserOutlined />
						<span>Verify Instructor</span>
						<Badge
							count={0}
							overflowCount={10}
							status="warning"
							offset={[20, 20]}
						></Badge>
					</Menu.Item>
					:null}
					<Menu.Item
						key="seen"
						style={{
							paddingBottom: "20px",
						}}
					>
						<CheckCircleOutlined />
						<span>Seen</span>
						<Badge
							count={0}
							overflowCount={10}
							status="warning"
							offset={[20, 20]}
						></Badge>
					</Menu.Item>
					<Menu.Item
						key="sent"
						style={{
							paddingBottom: "20px",
						}}
					>
						<SendOutlined />
						<span>Sent</span>
						<Badge
							count={99}
							overflowCount={10}
							status="warning"
							offset={[20, 20]}
						></Badge>
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout>
				<Row>
					<Col span={20}>
						<Content
							style={{
								margin: "40px 180px",
								padding: 24,
								background: "#fff",
								minHeight: 280,
							}}
						>
							{componentsSwtich(selectedMenuItem)}
						</Content>
					</Col>
				</Row>
			</Layout>
		</Layout>
	);
};
export default Notification;
