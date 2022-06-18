import React, { useEffect, useState } from "react";
import "../styles/newsFeed.css";
import food from "../assets/p.jpg";
import NewsCard from "../components/Newscard";
import {
	Alert,
	AutoComplete,
	Card,
	Input,
	Skeleton,
	Space,
	Switch,
} from "antd";
import { AudioOutlined } from "@ant-design/icons";
import ProfileDetail from "../components/ProfieDetail";
import NewsDrawer from "../components/createNewsDrawer";
import Recomendation from "../components/recomendations";
import axios from "axios";
import CreateRecommendationDrawer from "../components/CreateRecommendationDrawer";
import CreateStudentRecommendation from "../components/CreateStudentRecommendation";
const { Search } = Input;
const Newsfeed = () => {
	const [first,setFirst] = useState();
	useEffect(() => {
		axios.get(`api/checkCreateProfile?id=${localStorage.getItem("auth_id")}`).then((response) => {
		  setFirst(response.data.first);
		  console.log(response.data.first);
		});
	  }, []);
	const suffix = (
		<AudioOutlined
			style={{
				fontSize: 16,
				color: "#1890ff",
			}}
		/>
	);
	const [state, setState] = useState();
	const [search, setSearch] = useState();
	const showMyNews = () => {
		setLoading(true);
		return axios
			.get(`api/showMyNews?id=${localStorage.getItem("auth_id")}`)
			.then((response) => {
				setState(response.data.newsdata);
				setLoading(false);
			});
	};
	const [institution, setInstitution] = useState(false);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		axios.get("api/newsfeed").then((response) => {
			setState(response.data.newsdata);
			setLoading(false);
		});
	}, []);
	const getAllNews = (value) => {
		setLoading(true);
		return axios.get("api/newsfeed").then((response) => {
			setState(response.data.newsdata);
			setLoading(false);
		});
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

	const onSearch = (value) => {
		setState(
			state.filter((i) => {
				return i.institutionName.includes(value);
			})
		);
	};

	return (
		<div className="newsContainer">
			{}
			<div className="rightContainer">
				{window.innerWidth>=500?<ProfileDetail />:null}
				{localStorage.getItem("auth_position") === "Instructor"? (
					<CreateRecommendationDrawer/>
				) : null}
				{localStorage.getItem("auth_position") === "Student" ? (
					<CreateStudentRecommendation/>
				) : null}
				
			</div>
			<div className="centerContainer">
				<Search
					placeholder="search"
					allowClear
					onChange={(value)=>{return value?null:getAllNews}}
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
					<NewsCard state={state} loading={loading} />
				)}
			</div>
			<div className="leftContainer">
				{localStorage.getItem("auth_position") === "Student" ?
				<Card>
					My institution
					<br />
					<Switch
						onChange={(checked) => {
							return checked ? showMyNews() : getAllNews();
						}}
					/>
				</Card>:null
				}
				{localStorage.getItem("auth_position") === "Student" ? (
					window.innerWidth>=500?<Recomendation />:null
				) : null}
				
				{(localStorage.getItem("auth_position") === "Institution" ?(first=== 1)?(
					<NewsDrawer />
				) :null : null)}
			</div>
		</div>
	);
};

export default Newsfeed;
