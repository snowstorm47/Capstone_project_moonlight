import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import "../styles/newsFeed.css";
import { useNavigate } from "react-router-dom";
const { Header, Content, Footer } = Layout;

const Newsfeed = () => {
	const [state, setState] = useState(false);
	const navigate = useNavigate();
	const toggle = () => {
		setState(!state);
	};
	const gotoPage = (page) => {
		//GO TO MENU ITEM PAGE
		navigate('/');
		navigate(page);
	  };
	return (
		<Layout className="layout">
			
			<Content style={{ padding: "0 50px" }}>
				<div className="site-layout-content">
					<div className="leftContainer"></div>
					<div className="centerContainer"></div>
					<div className="rightContainer"></div>
				</div>
			</Content>
			{/* <Footer style={{ textAlign: "center" }}>
				Ant Design ©2018 Created by Ant UED
			</Footer> */}
		</Layout>
	);
};

export default Newsfeed;
