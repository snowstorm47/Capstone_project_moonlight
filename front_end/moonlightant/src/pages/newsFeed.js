import React, { useEffect, useState } from "react";
import "../styles/newsFeed.css";
import food from "../assets/p.jpg";
import NewsCard from "../components/Newscard";
import { Card, Input, Space, Switch } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import ProfileDetail from "../components/ProfieDetail";
import NewsDrawer from "../components/createNewsDrawer";
import Recomendation from "../components/recomendations";
import axios from "axios";
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
	const [state, setState] = useState();
	const [institution, setInstitution] = useState(false);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		axios.get("api/newsfeed").then((response) => {
			setState(response.data.newsdata);
			setLoading(false);
		});
	}, []);
	const getAllNews = () => {
		axios.get("api/newsfeed").then((response) => {
			setState(response.data.newsdata);
			setLoading(false);
		});
		console.log("state,,,", state);
	};
	useEffect(() => {
		{
			institution
				? axios.get("api/getmyinstitution").then((response) => {
						setState(response.data.newsdata);
						setLoading(false);
				  })
				: axios.get("api/newsfeed").then((response) => {
						setState(response.data.newsdata);
						setLoading(false);
				  });
		}
	}, [institution]);

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
				<NewsCard state={state} loading={loading} />
			</div>
			<div className="leftContainer">
				<Card>
					<Switch
						onChange={(checked) => {
							console.log(institution);
							setInstitution(checked);
						}}
					/>
				</Card>
				<Recomendation />
				{localStorage.getItem("auth_position") === "Institution" ? (
					<NewsDrawer />
				) : null}
			</div>
		</div>
	);
};

export default Newsfeed;
