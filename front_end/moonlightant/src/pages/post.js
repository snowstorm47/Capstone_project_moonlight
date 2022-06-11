import React, { useEffect, useState } from "react";
import "../styles/newsFeed.css";
import food from "../assets/p.jpg";
import PostDrawer from "../components/createPostDrawer";
import { Input, Skeleton, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import ProfileDetail from "../components/ProfieDetail";
import Recomendation from "../components/recomendations";
import PostCard from "../components/postsCard";
import "../styles/newsFeed.css";
import axios from "axios";

const { Search } = Input;
const Post = () => {
	const [loading, setLoading] = useState(false);

	const suffix = (
		<AudioOutlined
			style={{
				fontSize: 16,
				color: "#1890ff",
			}}
		/>
	);
	const [state, setState] = useState();
	useEffect(() => {
		setLoading(true);
		axios.get("api/posts").then((response) => {
			setState(response.data.postdata);
			setLoading(false);
		});
	}, []);
	const onSearch = (value) => {
		setLoading(true);
		setState(
			state.filter((i) => {
				setLoading(false);
				return i.postdata.name?.includes(value);
			})
		);
	};
	const getAllPosts = () => {
		return axios.get("api/posts").then((response) => {
			setState(response.data.postdata);
		});
	};

	return (
		<div className="newsContainer">
			<div className="rightContainer">
				<ProfileDetail />
			</div>
			<div className="centerContainer">
				<Search
					placeholder="search a user"
					allowClear
					onChange={getAllPosts}
					enterButton="Search"
					size="large"
					style={{ padding: "40px 20px" }}
					onSearch={onSearch}
				/>
				{loading ? (
					<>
						<Skeleton loading={true} active avatar></Skeleton>
						<Skeleton loading={true} active avatar></Skeleton>
						<Skeleton loading={true} active avatar></Skeleton>
					</>
				) : (
					<PostCard state={state} />
				)}
			</div>
			<div className="leftContainer">
				<Recomendation />
				<PostDrawer />
			</div>
		</div>
	);
};

export default Post;
