import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Newsfeed from "./pages/newsFeed";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Notification from "./pages/Notification";
// import SignUp from "./pages/signup";
import SignUp from "./pages/create";
import SignIn from "./pages/signin";
import ProfilePageP from "./pages/profilePage";
import LogIn from "./pages/login";
import {
	Layout,
	Menu,
	Breadcrumb,
	Avatar,
	Dropdown,
	notification,
	Button,
} from "antd";
import {
	BellOutlined,
	BookOutlined,
	ReadOutlined,
	UserSwitchOutlined,
	NotificationOutlined,
	HomeOutlined,
	UserOutlined,
	EditFilled,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import Post from "./pages/post";
import Home from "./pages/Home";
import food from "./assets/man.jpg";
import { useNavigate } from "react-router-dom";
// import IconContext from "@ant-design/icons/lib/components/Context";
import NewsDetail from "./pages/newsDetailPage";
import CreateProfile from "./pages/ProfileCreate";
import NewsfeedStudent from "./pages/newsfeedstudent";
import AdvancedSearch from "./pages/advancedSearch";

import InstructorCreateProfile from "./pages/InstructorCreateProfile";
import HiringCompanyCreateProfile from "./pages/HiringCompanyCreateProfile";
import InstitutionCreateProfile from "./pages/InstitutionCreateProfile";
import ProfilePageCompany from "./pages/profileCompany";
import ProfilePageInstitution from "./pages/profileInstitution";
import ProfilePageInstructor from "./pages/profileInstructor";
import SendRecomendation from "./components/SendRecommendation";
import AdminPage from "./AdminPage";
import AdminAboutus from "./components/Admin/AdminAboutus";
import { useEffect, useState } from "react";
import StudentProfile from "./components/Profile/StudentProfile";
import InstructorProfile from "./components/Profile/InstructorProfile";
import HiringProfile from "./components/Profile/HiringProfile";
import InstitutionProfile from "./components/Profile/InstitutionProfile";

//to generate csrf token
axios.defaults.baseURL = "http://localhost:8000/";
//to get data in json format
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
//for logout to get the token otherwise unauthorized
axios.interceptors.request.use(function (config) {
	const token = localStorage.getItem("auth_token");
	config.headers.Authorization = token ? `Bearer ${token}` : "";
	return config;
});

const { Header, Content, Footer, Sider } = Layout;
function App() {
	const notify = () => {
		const key = "this";
		notification.warn({
			message: "Update Profile",
			description: `Dear ${localStorage.getItem(
				"auth_name"
			)} please go to your profile and update your information.`,
			btn: (
				<Button
					type="primary"
					size="small"
					onClick={() => {
						navigate(editProfile);
						notification.close(key);
					}}
				>
					Confirm
				</Button>
			),
		});
	};
	const [image, setImage] = useState();
	const [first,setFirst] = useState();
	const navigate = useNavigate();
	const logoutSubmit = (e) => {
		axios.post("/api/logout").then((res) => {
			if (res.data.status === 200) {
				setImage("");
				localStorage.removeItem("auth_token");
				localStorage.removeItem("auth_email");
				localStorage.removeItem("auth_profile");
				localStorage.removeItem("auth_name");
				localStorage.removeItem("auth_position");
				localStorage.removeItem("auth_id");
				navigate("/");
			} else {
			}
		});
	};
	let id = localStorage.getItem("auth_id");
	useEffect(() => {
		axios.get(`/api/getProfilePicture/${id}`).then((res) => {
			if (res.data.status === 200) {
				setImage(res.data.image);
			} else {
				console.log("couldnt retrieve data");
			}
		});
	}, []);
	useEffect(() => {
		axios.get(`api/checkCreateProfile?id=${localStorage.getItem("auth_id")}`).then((response) => {
		  setFirst(response.data.first);
		  console.log(response.data.first);
		});
	  }, []);
	// console.log(localStorage.getItem("auth_profile"));
	let editProfile = "";
	if (first=== 1) {
		if (localStorage.getItem("auth_position") === "Student") {
			editProfile = "/profilepage";
		} else if (localStorage.getItem("auth_position") === "Institution") {
			editProfile = "/editinstitutionprofile";
		} else if (localStorage.getItem("auth_position") === "Instructor") {
			editProfile = "/editinstructorprofile";
		} else if (localStorage.getItem("auth_position") === "Hiring Company") {
			editProfile = "/editcompanyprofile";
		}
	} else {
		if (localStorage.getItem("auth_position") === "Student") {
			editProfile = "/createprofile";
		} else if (localStorage.getItem("auth_position") === "Institution") {
			editProfile = "/createprofileinstitution";
		} else if (localStorage.getItem("auth_position") === "Instructor") {
			editProfile = "/createprofileinstructor";
		} else if (localStorage.getItem("auth_position") === "Hiring Company") {
			editProfile = "/createprofilehiring";
		}
	}
	const menu = (
		<Menu selectable={true} style={{ width: "150px" }}>
			<Menu.Item key="1" onClick={logoutSubmit}>
				<UserOutlined style={{ paddingLeft: "2.5px", paddingRight: "5px" }} />
				Logout
			</Menu.Item>
			<Menu.Item key="2">
				<EditFilled style={{ paddingLeft: "2.5px", paddingRight: "5px" }} />

				<Link to={editProfile}>Edit Profile</Link>
			</Menu.Item>
		</Menu>
	);
	var AuthButtons = "";

	if (!localStorage.getItem("auth_token")) {
		AuthButtons = (
			<>
				<Menu.Item key="6" style={{ marginLeft: "auto" }}>
					<Link to="/signin">Login</Link>
				</Menu.Item>
				<Menu.Item key="7">
					<Link to="/signup" style={{ left: "auto" }}>
						Sign Up
					</Link>
				</Menu.Item>
			</>
		);
	} else {
		AuthButtons = (
			<Menu.Item key="7" style={{ marginLeft: "auto", borderColor: "white" }}>
				<Dropdown overlay={menu} placement="bottomRight">
					<Avatar
						src={"http://localhost:8000/uploads/ProfilePicture/" + image}
						icon={<UserOutlined />}
						size={50}
						style={{ zIndex: 10, border: "2px solid #1890ff" }}
					/>
				</Dropdown>
			</Menu.Item>
		);
	}
	return (
		<div className="App">
			{/* {image != null && localStorage.getItem("auth_token") != undefined
				? notify()
				: null} */}
			<Header
				style={{
					backgroundColor: "white",
					position: "fixed",
					zIndex: 1,
					width: "100%",
					height: "auto",
				}}
			>
				<div className="logo" />
				<Menu theme="light" mode="horizontal">
					<Menu.Item key="0">
						<Link to="/">
							<HomeOutlined /> Home
						</Link>
					</Menu.Item>
					<Menu.Item key="1">
						<Link to="/newsfeed">
							<ReadOutlined /> News Feed
						</Link>
					</Menu.Item>
					{localStorage.getItem("auth_position") !== "Student" ? null : (
						<Menu.Item key="2">
							<Link to="/post">
								{" "}
								<BookOutlined />
								post
							</Link>
						</Menu.Item>
					)}
					<Menu.Item key="3">
						<Link to="/Notification">
							<BellOutlined /> Notification
						</Link>
					</Menu.Item>
					<Menu.Item key="4">
						<Link to="/aboutus">
							<NotificationOutlined /> Aboutus
						</Link>
					</Menu.Item>
					<Menu.Item key="5">
						<Link to="/contactus">
							{" "}
							<UserSwitchOutlined />
							Contact Us
						</Link>
					</Menu.Item>
					{AuthButtons}
				</Menu>
			</Header>
			<Content style={{ padding: "50px 0 0 0" }}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/newsfeed"
						element={
							localStorage.getItem("auth_token") ? <Newsfeed /> : <LogIn />
						}
					/>
					<Route path="/aboutus" element={<AboutUs />} />
					<Route path="/contactus" element={<ContactUs />} />
					<Route
						path="/post"
						element={localStorage.getItem("auth_token") ? <Post /> : <LogIn />}
					/>
					<Route
						path="/notification"
						element={
							localStorage.getItem("auth_token") ? <Notification /> : <LogIn />
						}
					/>
					<Route
						path="/notification/advancedSearch"
						element={<AdvancedSearch />}
					/>
					{/* <Route path="/signin" element={<SignIn />} /> */}
					{/* <Route path="/signup" element={<SignUp />} /> */}
					<Route path="newsfeed/news" element={<NewsDetail />} />
					<Route path="profilepage" element={<ProfilePageP />} />
					<Route path="createprofile" element={<CreateProfile />} />
					<Route
						path="editinstructorprofile"
						element={<ProfilePageInstructor />}
					/>
					<Route
						path="editinstitutionprofile"
						element={<ProfilePageInstitution />}
					/>
					<Route path="editcompanyprofile" element={<ProfilePageCompany />} />
					<Route path="/signin" element={<LogIn />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="recomendation" element={<SendRecomendation />} />
					<Route path="admin" element={<AdminPage />} />
					<Route path="editabout" element={<AdminAboutus />} />
					<Route
						path="createprofileinstructor"
						element={<InstructorCreateProfile />}
					/>
					<Route
						path="createprofilehiring"
						element={<HiringCompanyCreateProfile />}
					/>
					<Route
						path="createprofileinstitution"
						element={<InstitutionCreateProfile />}
					/>
					<Route path="StudentProfile" element={<StudentProfile />} />
					<Route path="InstructorProfile" element={<InstructorProfile />} />
					<Route path="InstitutionProfile" element={<InstitutionProfile />} />
					<Route path="HiringProfile" element={<HiringProfile />} />

				</Routes>
			</Content>
			<Footer
				style={{
					textAlign: "center",
				}}
			>
				Moonlight ©2022 Created by Moonlight PLC
			</Footer>
		</div>
	);
}

export default App;
