import React, { useEffect, useState } from "react";
import { Card, Avatar,Button } from "antd";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import food from "../assets/man.jpg";
import verified from "../assets/verifiedblack.svg";
import { Verified } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
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
	const navigate = useNavigate();
	const [skills, setSkill] = useState([]);
	const [history, setHistory] = useState([]);
	let showProfile = "";
	const profile=()=>{
		if (localStorage.getItem("auth_position") === "Student") {
			navigate("/StudentProfile",{state:{id}});
		} else if (localStorage.getItem("auth_position") === "Institution") {
			navigate("/InstitutionProfile",{state:{id}})
		} else if (localStorage.getItem("auth_position") === "Instructor") {
			navigate("/InstructorProfile",{state:{id}})
		} else if (localStorage.getItem("auth_position") === "Hiring Company") {
			navigate("/HiringProfile",{state:{id}})
		}
	}
	
	const id = localStorage.getItem("auth_id");
	useEffect(() => {
		axios.get(`/api/profile/${id}`).then((res) => {
			if (res.data.status === 200) {
				setUserData(res.data);
				setSkill(res.data.skill);
				setHistory(res.data.employmentHistory);
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
				width: "20%",
				position:'fixed',
				height: "auto",
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
			{(localStorage.getItem("auth_position")==="Institution" || localStorage.getItem("auth_position")==="Hiring Company"||localStorage.getItem("auth_position")==="Admin")
			?null:(
			<><Card
						type="inner"
						title="Experience"
						extra={
						<Button type="text" style={{color:"blue"}}onClick={()=>profile()}>More</Button>
						}
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
					</Card><Card
						type="inner"
						title="Skills"
						extra={						
						<Button type="text" style={{color:"blue"}}onClick={()=>profile()}>More</Button>
					}
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
						</Card></>)
			}
			
		</Card>
		
	);
};
export default ProfileDetail;
