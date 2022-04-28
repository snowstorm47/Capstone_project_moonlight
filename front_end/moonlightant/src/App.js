import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Newsfeed from "./pages/newsFeed";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Notification from "./pages/Notification";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import { Layout, Menu, Breadcrumb } from "antd";
import "antd/dist/antd.css";
const { Header, Content, Footer, Sider } = Layout;
function App() {
	return (
		<div className="App">
			<Header style={{ backgroundColor: "white" }}>
				<div className="logo" />
				<Menu theme="light" mode="horizontal" defaultSelectedKeys={["2"]}>
					<Menu.Item key="1">
						<a href="/newsfeed"> News Feed</a>
					</Menu.Item>
					<Menu.Item key="2">
						<a href="#"> post</a>
					</Menu.Item>
					<Menu.Item key="3">
						<a href="/notification"> Notification</a>
					</Menu.Item>
					<Menu.Item key="4">
						<a href="/aboutus"> About us</a>
					</Menu.Item>
					<Menu.Item key="5">
						<a href="/contactus"> Contact Us</a>
					</Menu.Item>
					<Menu.Item key="6">
						<a href="/signin"> Login </a> 
					</Menu.Item>
				</Menu>
			</Header>
			<Router>
				<Routes>
					<Route path="/newsfeed" element={<Newsfeed />} />
					<Route path="/aboutus" element={<AboutUs />} />
					<Route path="/contactus" element={<ContactUs />} />
					<Route path="/notification" element={<Notification />} />
					<Route path="/signin" element={<SignIn/>}/>
					<Route path="/signup" element={<SignUp/>}/>
				</Routes>
			</Router>
			<Footer style={{ textAlign: "center" }}>
				Ant Design ©2018 Created by Ant UED
			</Footer>
		</div>
	);
}

export default App;
