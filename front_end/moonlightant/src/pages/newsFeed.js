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
import ProfileDetailInstitution from "../components/profileDetailInstitution";

import NewsDrawer from "../components/createNewsDrawer";
import Recomendation from "../components/recomendations";
import axios from "axios";
import CreateRecommendationDrawer from "../components/CreateRecommendationDrawer";
import CreateStudentRecommendation from "../components/CreateStudentRecommendation";
import ProfileDetailHiring from "../components/profileDetailHiring";
const { Search } = Input;
const Newsfeed = () => {
	let first;
	let verify;
	const [valid,setValid] = useState({
		first:1,
		verify:1
	});
	useEffect(() => {
		axios.get(`api/checkCreateProfile?id=${localStorage.getItem("auth_id")}`).then((response) => {
		  first = response.data.first;
		  setValid({
			first:first
		  });
		  console.log(response.data.first);
		});
	  }, []);
	  const id = localStorage.getItem('auth_id');
	useEffect(() => {

	  if(localStorage.getItem('auth_position')==="Instructor")
	  {
		  axios.get(`api/checkVerifyInstructor/${id}`).then((response) => {
			verify = response.data.verified;
			setValid({
				verify:verify
			})
		  });
	  }
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
			console.log(response,"thisis the data/.........");
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
				  
				{window.innerWidth>=500?localStorage.getItem("auth_position") === "Institution"?<ProfileDetailInstitution/>:(localStorage.getItem("auth_position") === "Hiring Company"?<ProfileDetailHiring/>:<ProfileDetail />):null}
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
				
				{(localStorage.getItem("auth_position") === "Institution" &&(valid.first=== 1)?
					<NewsDrawer />:
				null)}
			</div>
		</div>
	);
};

export default Newsfeed;
