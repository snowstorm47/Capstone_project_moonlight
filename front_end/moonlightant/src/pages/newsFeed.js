import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import "../styles/newsFeed.css";

const { Header, Content, Footer } = Layout;

const Newsfeed = () => {
	const [state, setState] = useState(false);

	const toggle = () => {
		setState(!state);
	};
	return (
		<Layout className="layout">
			<Header style={{ backgroundColor: "white" }}>
				<div className="logo" />
				<Menu theme="light" mode="horizontal" defaultSelectedKeys={["2"]}>
					<Menu.Item key="1">News feed</Menu.Item>
					<Menu.Item key="2">Posts</Menu.Item>
					<Menu.Item key="3">Notification</Menu.Item>
					<Menu.Item key="4">Aboutus</Menu.Item>
					<Menu.Item key="5">ContactUs</Menu.Item>
					<Menu.Item key="6">Login</Menu.Item>
				</Menu>
			</Header>
			<Content style={{ padding: "0 50px" }}>
				<div className="site-layout-content">
					<div className="leftContainer"></div>
					<div className="centerContainer"></div>
					<div className="rightContainer"></div>
				</div>
			</Content>
			<Footer style={{ textAlign: "center" }}>
				Ant Design ©2018 Created by Ant UED
			</Footer>
		</Layout>
	);
};

export default Newsfeed;
