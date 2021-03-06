import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Newsfeed from "./pages/newsFeed";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Notification from "./pages/Notification";
// import SignUp from "./pages/signup";
import SignUp from "./pages/create";
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
	message,
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
	DashboardOutlined,
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
import AdminPage from "./AdminPage";
import AdminAboutus from "./components/Admin/AdminAboutus";
import { useEffect, useState } from "react";
import StudentProfile from "./components/Profile/StudentProfile";
import InstructorProfile from "./components/Profile/InstructorProfile";
import HiringProfile from "./components/Profile/HiringProfile";
import InstitutionProfile from "./components/Profile/InstitutionProfile";
import HiringCompany from "./pages/hiringCompany";
import { LocalHospitalTwoTone } from "@mui/icons-material";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";
import Footerd from "./pages/footer";

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
	const [image, setImage] = useState("");
	const [vary, setVary] = useState();
	const [valid,setValid] = useState({
		first:null,
		verify:1
	});
	let first;
	// const [verify,setVerify] = useState();
	let verify;
	// let vary=false;
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
				localStorage.removeItem("first");
				localStorage.removeItem("verify");
				setVary(!vary);
				navigate("/");
			} else {
			}
		});
	};
	let id = localStorage.getItem("auth_id");
	useEffect(() => {
		if(localStorage.getItem('auth_position')=='Student'){
		axios.get(`/api/getProfilePicture/${id}`).then((res) => {
			console.log('profile......',res.data.image[0].image);
			if (res.data.status === 200) {
				setImage(res.data.image[0].image);
				
			} else {
				console.log("couldnt retrieve data");
			}
		});}
		else if(localStorage.getItem('auth_position')=='Hiring Company'){
			axios.get(`/api/getProfilePictureHiring/${id}`).then((res) => {
				console.log('profile......',res.data.image[0].image);
				if (res.data.status === 200) {
					setImage(res.data.image[0].image);
					
				} else {
					console.log("couldnt retrieve data");
				}
			});}
			else if(localStorage.getItem('auth_position')=='Institution'){
				axios.get(`/api/getProfilePictureInstitution/${id}`).then((res) => {
					console.log('profile......',res.data.image[0].image);
					if (res.data.status === 200) {
						setImage(res.data.image[0].image);
						
					} else {
						console.log("couldnt retrieve data");
					}
				});}
				else{
					axios.get(`/api/getProfilePictureInstructor/${id}`).then((res) => {
						console.log('profile......',res.data.image[0].image);
						if (res.data.status === 200) {
							setImage(res.data.image[0].image);
							
						} else {
							console.log("couldnt retrieve data");
						}
					});
				}
		console.log('profileInIf......',image);
	}, []);

	// useEffect(() => {

	  if(localStorage.getItem('auth_position')==="Instructor")
		{
			axios.get(`api/checkVerifyInstructor/${id}`).then((response) => {
			  localStorage.setItem('verify',response.data.verified) 
			 
		}
	);}

	  
	// console.log(localStorage.getItem("auth_profile"));
	let editProfile = "";
	if (localStorage.getItem('first')== 1) {
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
		} else if (localStorage.getItem("auth_position") === "Instructor") {
			editProfile = "/createprofileinstitution";
		} else if (localStorage.getItem("auth_position") === "Instructor") {
			editProfile = "/createprofileinstructor";
		} else if (localStorage.getItem("auth_position") === "Hiring Company") {
			editProfile = "/createprofilehiring";
		}
	}
	console.log(editProfile);
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
				{console.log('profile...im',image)}
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
						src={
							"http://localhost:8000/uploads/ProfilePicture/" +
							image
						}
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
					{localStorage.getItem("auth_position")===null?null:<Menu.Item key="1">
						<Link to="/newsfeed">
							<ReadOutlined /> News Feed
						</Link>
					</Menu.Item>}
					
					{(localStorage.getItem("auth_position")==="Institution"|| localStorage.getItem("auth_position")==="Hiring Company"||localStorage.getItem("auth_position")===null)
					? null:
					<Menu.Item key="2">
							<Link to="/post">
								{" "}
								<BookOutlined />
								post
							</Link>
						</Menu.Item>
						}
					{(localStorage.getItem("auth_position")==="Admin" )
					? <Menu.Item key="8">
					<Link to="/admin">
						<DashboardOutlined /> Dashboard
					</Link>
				</Menu.Item>:null}
				{/* {
					if(localStorage.getItem("auth_position"))===null)
					{
						
					}
				} */}
				{(localStorage.getItem("auth_position"))===null||(localStorage.getItem("auth_position")==="Admin")?null:
					(((localStorage.getItem("auth_position")==="Institution")&&(localStorage.getItem('first')))||((localStorage.getItem("auth_position")==="Instructor") &&(localStorage.getItem('verify')==1))||((localStorage.getItem("auth_position")==="Student")&&(localStorage.getItem('first')==1))||((localStorage.getItem("auth_position")==="Hiring Company")&&(localStorage.getItem('first'))))
					?
					<Menu.Item key="3">
						<Link to="/Notification">
							<BellOutlined /> Notification
						</Link>
					</Menu.Item>
					:null
					}
					<Menu.Item key="4">
						<Link to="/aboutus">
							<NotificationOutlined /> About Us
						</Link>
					</Menu.Item>
					{(localStorage.getItem("auth_position")==="Admin" )
					? null:
					<Menu.Item key="5">
						<Link to="/contactus">
							{" "}
							<UserSwitchOutlined />
							Contact Us
						</Link>
					</Menu.Item>
						}
					
					{AuthButtons}
				</Menu>
			</Header>
			<Content style={{ padding: "50px 0 0 0" }}>
				<Routes>
					<Route
						path="/"
						element={
							localStorage.getItem("auth_position") !== "Hiring Company" ? (
								<Home />
							) : (
								<HiringCompany />
							)
						}
					/>
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
					<Route path="/advancedSearch" element={<AdvancedSearch />} />
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
					<Route
						path="admin"
						element={
							localStorage.getItem("auth_position") === "Admin" ? (
								<AdminPage />
							) : (
								<LogIn />
							)
						}
					/>
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
					<Route path="signin/forgotpassword" element={<ForgotPassword />} />
					<Route path="resetPassword/:id" element={<ResetPassword />} />


				</Routes>
			</Content>
			<Footerd/>
		</div>
	);
}

export default App;
