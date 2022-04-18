import { Layout, Menu } from "antd";
import React, { useState } from "react";

import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const Newsfeed = () => {
    const 
	const state = {
		collapsed: false,
	};

	const toggle = () => {
		setState({
			collapsed: !state.collapsed,
		});
	};
	return (
		<Layout>
			<Sider trigger={null} collapsible collapsed={this.state.collapsed}>
				<div className="logo" />
				<Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
					<Menu.Item key="1" icon={<UserOutlined />}>
						NewsFeed
					</Menu.Item>
					<Menu.Item key="2" icon={<VideoCameraOutlined />}>
						Posts
					</Menu.Item>
					<Menu.Item key="3" icon={<UploadOutlined />}>
						Notification
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout className="site-layout">
				<Header className="site-layout-background" style={{ padding: 0 }}>
					{React.createElement(
						state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
						{
							className: "trigger",
							onClick: this.toggle,
						}
					)}
				</Header>
				<Content
					className="site-layout-background"
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: 280,
					}}
				>
					Content
				</Content>
			</Layout>
		</Layout>
	);
};

export default Newsfeed;
