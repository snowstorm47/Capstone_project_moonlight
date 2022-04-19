import React, { useState } from "react";
import { Layout, Menu } from "antd";
import "../styles/newsFeed.css";
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content, Search } = Layout;
const onSearch = (value) => console.log(value);
const Newsfeed = () => {
	const [state, setState] = useState(false);

	const toggle = () => {
		setState(!state);
	};
	return (
		<Layout>
			<Sider trigger={null} collapsible collapsed={state}>
				<div className="logo" />
				<Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
					<Menu.Item key="1" icon={<UserOutlined />}>
						nav 1
					</Menu.Item>
					<Menu.Item key="2" icon={<VideoCameraOutlined />}>
						nav 2
					</Menu.Item>
					<Menu.Item key="3" icon={<UploadOutlined />}>
						nav 3
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout className="site-layout">
				<Header className="site-layout-background" style={{ padding: 0 }}>
					{React.createElement(state ? MenuUnfoldOutlined : MenuFoldOutlined, {
						className: "trigger",
						onClick: () => {
							setState(!state);
						},
					})}
					<Search
						addonBefore="https://"
						placeholder="input search text"
						allowClear
						onSearch={onSearch}
						style={{ width: 304 }}
					/>
				</Header>
				<Content
					className="site-layout-background"
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: 280,
						height: 1000,
					}}
				>
					Content
				</Content>
			</Layout>
		</Layout>
	);
};

export default Newsfeed;
