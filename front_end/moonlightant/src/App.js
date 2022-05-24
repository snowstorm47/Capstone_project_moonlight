import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Newsfeed from "./pages/newsFeed";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Notification from "./pages/Notification";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import ProfilePageP from "./pages/profilePage";
import Enter from "./pages/create";
import LogIn from "./pages/login";
import { Layout, Menu, Breadcrumb, Avatar, Dropdown } from "antd";
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
	const navigate = useNavigate();
	const logoutSubmit = (e) => {
		axios.post("/api/logout").then((res) => {
			if (res.data.status === 200) {
				localStorage.removeItem("auth_token");
				localStorage.removeItem("auth_email");
				navigate("/");
			} else {
			}
		});
	};
	const menu = (
		<Menu selectable={true} style={{ width: "150px" }}>
			<Menu.Item key="1" onClick={logoutSubmit}>
				<UserOutlined style={{ paddingLeft: "2.5px", paddingRight: "5px" }} />
				Logout
			</Menu.Item>
			<Menu.Item key="2">
				<EditFilled style={{ paddingLeft: "2.5px", paddingRight: "5px" }} />
				<Link to="profilepage">Edit Profile</Link>
			</Menu.Item>
		</Menu>
	);
	var AuthButtons = "";

	if (!localStorage.getItem("auth_token")) {
		AuthButtons = (
			<>
				<Menu.Item key="6" style={{ marginLeft: "auto" }}>
					<Link to="/login">Login</Link>
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
						size={50}
						src={food}
						style={{ zIndex: 10, border: "2px solid #1890ff" }}
					/>
				</Dropdown>
			</Menu.Item>
		);
	}
	return (
		<div className="App">
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
					<Menu.Item key="2">
						<Link to="/post">
							{" "}
							<BookOutlined />
							post
						</Link>
					</Menu.Item>
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
					<Route path="/newsfeed" element={<Newsfeed />} />
					<Route path="/aboutus" element={<AboutUs />} />
					<Route path="/contactus" element={<ContactUs />} />
					<Route path="/post" element={<Post />} />
					<Route path="/notification" element={<Notification />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="newsfeed/news" element={<NewsDetail />} />
					<Route path="profilepage" element={<ProfilePageP/>}/>
					<Route path="createprofile" element={<CreateProfile/>}/>
				</Routes>
			</Content>
			<Footer
				style={{
					textAlign: "center",
				}}
			>
				Ant Design ©2018 Created by Ant UED
			</Footer>
		</div>
	);
}

export default App;
