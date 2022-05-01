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
import { Layout, Menu, Breadcrumb } from "antd";
import {
	BellOutlined,
	BookOutlined,
	ReadOutlined,
	UserSwitchOutlined,
	NotificationOutlined,
	HomeOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import Post from "./pages/post";
import Home from "./pages/Home";

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
	return (
		<div className="App">
			<Router>
				<Header
					style={{
						backgroundColor: "white",
						position: "fixed",
						zIndex: 1,
						width: "100%",
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
						<Menu.Item key="6" style={{ marginLeft: "auto" }}>
							<Link to="/signin">Login</Link>
						</Menu.Item>
						<Menu.Item key="7">
							<Link to="/signup" style={{ left: "auto" }}>
								Sign Up
							</Link>
						</Menu.Item>
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
					</Routes>
				</Content>
				<Footer style={{ textAlign: "center" }}>
					Ant Design ©2018 Created by Ant UED
				</Footer>
			</Router>
		</div>
	);
}

export default App;
