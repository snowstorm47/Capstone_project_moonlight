import React, { useEffect, useState } from "react";
import { Card, Avatar } from "antd";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import food from "../assets/man.jpg";
import verified from "../assets/verifiedblack.svg";
import { Verified } from "@mui/icons-material";
import axios from "axios";

const ProfileDetailInstitution = () => {
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
	let showProfile = "";
	if (localStorage.getItem("auth_position") === "Student") {
		showProfile = "/StudentProfile";
	} else if (localStorage.getItem("auth_position") === "Institution") {
		showProfile = "/InstitutionProfile";
	} else if (localStorage.getItem("auth_position") === "Instructor") {
		showProfile = "/InstructorProfile";
	} else if (localStorage.getItem("auth_position") === "Hiring Company") {
		showProfile = "/HiringProfile";
	}
	const id = localStorage.getItem("auth_id");
	useEffect(() => {
		// axios.get('/sanctum/csrf-cookie').then(res => {
		axios.get(`/api/profileInstitution/${id}`).then((res) => {
			if (res.data.status === 200) {
				setUserData(res.data);
				console.log(res,'...../...');
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
				width: "20%",
				position: "fixed",
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
					<strong>Addis Ababa University</strong>
					{localStorage.getItem("auth_position") === "Instructor" ? (
						<Verified
							style={{ width: "15px", height: "15px", color: "#0080ff" }}
						/>
					) : null}
				</div>
				<span style={{ color: "gray" }}>aastu@gmail.com</span>
			</Card>
			
			<><Card
						type="inner"
						title="information"
						extra={<a href={showProfile}>More</a>}
						style={{
							marginTop: -10,
							marginRight: -25,
							marginLeft: -25,
							paddingBottom: 20,
							textAlign: "left",
							minHeight: "150px",
						}}
					>
						        <h4>Location</h4>
								<span style={{ color: "gray" }}>Addis ababa, Kaliti</span>
								<h4>Phone number</h4>
								<span style={{ color: "gray" }}>+251911274829</span>
                                <h4>P.O. box</h4>
								<span style={{ color: "gray" }}>12527</span>
                                
							
					</Card></>
			
			
		</Card>
		
	);
};
export default ProfileDetailInstitution;
