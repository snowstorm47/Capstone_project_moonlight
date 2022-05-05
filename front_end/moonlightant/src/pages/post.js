import React, { useState } from "react";
import "../styles/newsFeed.css";
import food from "../assets/p.jpg";
import PostDrawer from "../components/createPostDrawer";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import ProfileDetail from "../components/ProfieDetail";
import Recomendation from "../components/recomendations";
import PostCard from "../components/postsCard";
import "../styles/newsFeed.css";
import axios from "axios";

const { Search } = Input;
const Post = () => {
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
					style={{ padding: "40px 20px" }}
					onSearch={onSearch}
				/>
				<PostCard />
				<PostCard />
				<PostCard />
				<PostCard />
			</div>
			<div className="leftContainer">
				<Recomendation />
				<PostDrawer />
			</div>
		</div>
	);
};

export default Post;
