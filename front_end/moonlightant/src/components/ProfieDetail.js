import React, { useEffect, useState } from "react";
import { Card, Avatar } from "antd";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import food from "../assets/man.jpg";
import verified from "../assets/verifiedblack.svg";
import { Verified } from "@mui/icons-material";
import axios from "axios";

const ProfileDetail = () => {
	const [userData, setUserData] = useState({
		phoneNumber: "",
		name: "",
		position: "",
		startDate: "",
		endDate: "",
		sex: "",
		institution_id: "",
		college_id: "",
		department_id: "",
		companyName: "",
		GPA: "",
		major: "",
		startDateClass: "",
		endDateClass: "",
		image: "",
		skill: [],
		employmentHistory: [],
		email: "",
		error_list: [],
	});

	const [skills, setSkill] = useState([]);
	const [history, setHistory] = useState([]);

	const id = localStorage.getItem("auth_id");
	useEffect(() => {
		// axios.get('/sanctum/csrf-cookie').then(res => {
		axios.get(`/api/profile/${id}`).then((res) => {
			if (res.data.status === 200) {
				setUserData(res.data);
				setSkill(res.data.skill);
				console.log(skills);
				setHistory(res.data.employmentHistory);
				console.log("userData...", userData);
			} else {
				console.log("couldnt retrieve data");
			}
		});
	}, []);
	return (
		<Card
			title=""
			style={{
				marginTop: 30,
				marginRight: 10,
				marginLeft: 10,
				width: 250,
				position: "fixed",
				height: 500,
				borderRadius: 10,
				backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs8XGHyMmmTM7yi39nHzdGsfyCU7xl0_LwRQ&usqp=CAU")`,
			}}
		>
			<Avatar
				size={{
					xs: 24,
					sm: 32,
					md: 40,
					lg: 64,
					xl: 70,
					xxl: 100,
				}}
				src={"http://localhost:8000/uploads/ProfilePicture/" + userData.image}
				icon={<UserOutlined />}
				style={{
					zIndex: 10,
					boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
				}}
			/>
			<Card
				type="inner"
				bordered={false}
				style={{
					marginTop: -10,
					marginRight: -25,
					marginLeft: -25,
				}}
			>
				<div
					style={{
						justifyContent: "center",
						alignItems: "center",
						textAlign: "center",
					}}
				>
					<strong>{userData.name}</strong>
					{localStorage.getItem("auth_position") === "Instructor" ? (
						<Verified
							style={{ width: "15px", height: "15px", color: "#0080ff" }}
						/>
					) : null}
				</div>
				<span style={{ color: "gray" }}>{userData.email}</span>
			</Card>
			<Card
				type="inner"
				title="Experience"
				extra={<a href="#">More</a>}
				style={{
					marginTop: -10,
					marginRight: -25,
					marginLeft: -25,
					paddingBottom: 20,
					textAlign: "left",
					minHeight: "150px",
				}}
			>
				{userData.employmentHistory.map((item) => (
					<>
						<h4>{item.companyName}</h4>
						<span style={{ color: "gray" }}>{item.position}</span>
					</>
				))}
			</Card>
			<Card
				type="inner"
				title="Skills"
				extra={<a href="#">More</a>}
				style={{
					marginTop: -10,
					marginRight: -25,
					marginLeft: -25,
					paddingBottom: 20,
					marginBottom: 0,
					textAlign: "left",
					minHeight: "200px",
				}}
			>
				{userData.skill.map((skill) => (
					<button
						style={{
							color: "white",
							borderRadius: 100,
							border: 0,
							margin: 2,
							backgroundColor: "#0080ff",
						}}
					>
						#{skill.skill}
					</button>
				))}
			</Card>
		</Card>
	);
};
export default ProfileDetail;
