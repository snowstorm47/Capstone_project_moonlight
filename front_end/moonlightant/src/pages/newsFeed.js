import React, { useState } from "react";
import "../styles/newsFeed.css";
import food from "../assets/p.jpg";
import NewsCard from "../components/Newscard";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import ProfileDetail from "../components/ProfieDetail";
import NewsDrawer from "../components/createNewsDrawer";
import Recomendation from "../components/recomendations";
const { Search } = Input;
const Newsfeed = () => {
	const suffix = (
		<AudioOutlined
			style={{
				fontSize: 16,
				color: "#1890ff",
			}}
		/>
	);
	const onSearch = (value) => console.log(value);

	return (
		<div className="newsContainer">
			<div className="rightContainer">
				<ProfileDetail />
			</div>
			<div className="centerContainer">
				<Search
					placeholder="search"
					allowClear
					enterButton="Search"
					size="large"
					style={{ padding: "40px 0" }}
					onSearch={onSearch}
				/>
				<NewsCard />
			</div>
			<div className="leftContainer">
				<Recomendation />
				<NewsDrawer />
			</div>
		</div>
	);
};

export default Newsfeed;
