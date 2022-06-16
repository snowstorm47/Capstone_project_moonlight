import {
	BankOutlined,
	BellOutlined,
	BookOutlined,
	ReadOutlined,
	UserSwitchOutlined,
	NotificationOutlined,
} from "@ant-design/icons";
import { Button, Menu, Layout, Col, Row, Badge } from "antd";
import { useState } from "react";
import AdminNews from "./components/Admin/AdminNews";
import AdminPost from "./components/Admin/AdminPost";
import AdminHiring from "./components/Admin/AdminHiring";
import AdminAboutus from "./components/Admin/AdminAboutus";
import AdminInstitution from "./components/Admin/AdminInstitution";
import AdminContact from "./components/Admin/AdminContact";
import AdminContactDetail from "./components/Admin/AdminContactDetail";
const { Header, Footer, Sider, Content } = Layout;

const AdminPage = () => {
	const [selectedMenuItem, setSelectedMenuItem] = useState("add");

	const componentsSwtich = (key) => {
		switch (key) {
			case "post":
				return <AdminPost />;
			case "institution":
				return <AdminInstitution />;
			case "news":
				return <AdminNews />;
			case "aboutus":
				return <AdminAboutus />;
			case "company":
				return <AdminHiring />;
			case "contact":
				return <AdminContact />;
			case "admincontact":
				return <AdminContactDetail />;
			default:
				break;
		}
	};

	return (
		<Layout>
			<Sider
				width={350}
				style={{
					minHeight: "90vh",
					marginTop: "2.6rem",
				}}
				theme="light"
				// collapsible
				// collapsed={this.state.collapsed}
				// onCollapse={this.onCollapse}
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
					Admin Menu
				</div>
				<Menu
					// theme="light"
					mode="inline"
					selectedKeys={selectedMenuItem}
					onClick={(e) => setSelectedMenuItem(e.key)}
				>
					<Menu.Item key="post">
						<BookOutlined />
						<span>Posts</span>
					</Menu.Item>

					<Menu.Item
						key="news"
						style={
							{
								// paddingBottom:"20px"
							}
						}
					>
						<ReadOutlined />
						<span>News</span>
						<Badge
							count={99}
							overflowCount={10}
							status="warning"
							offset={[20, 20]}
						></Badge>
					</Menu.Item>
					<Menu.Item
						key="institution"
						style={
							{
								// paddingBottom:"20px"
							}
						}
					>
						<BankOutlined />
						<span
							style={{
								color: "#dddddd",
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
					</Menu.Item>
					<Menu.Item key="company">
						<BankOutlined />
						<span>Hiring Company</span>
						<Badge
							count={0}
							overflowCount={10}
							status="warning"
							offset={[20, 20]}
						></Badge>
					</Menu.Item>
					<Menu.Item
						key="admincontact"
						style={{
							paddingBottom: "20px",
						}}
					>
						<UserSwitchOutlined />
						<span>Admin Contact </span>
						<Badge
							count={0}
							overflowCount={10}
							status="warning"
							offset={[20, 20]}
						></Badge>
					</Menu.Item>
					<Menu.Item
						key="contact"
						style={{
							paddingBottom: "20px",
						}}
					>
						<UserSwitchOutlined />
						<span>Contact Us </span>
						<Badge
							count={0}
							overflowCount={10}
							status="warning"
							offset={[20, 20]}
						></Badge>
					</Menu.Item>
					<Menu.Item
						key="aboutUs"
						style={{
							paddingBottom: "20px",
						}}
					>
						<NotificationOutlined />
						<span>About Us</span>
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
					<Col style={{ width: "100%" }}>
						<Content
							style={{
								margin: "40px 20px",
								padding: 40,
								paddingRight: 200,
								background: "#fff",
								minHeight: 500,
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

export default AdminPage;
