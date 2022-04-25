import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Newsfeed from "./pages/newsFeed";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
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
						<a href="/post"> post</a>
					</Menu.Item>
					<Menu.Item key="3">
						<a href="/Notification"> Notification</a>
					</Menu.Item>
					<Menu.Item key="4">
						<a href="/aboutus"> Aboutus</a>
					</Menu.Item>
					<Menu.Item key="5">
						<a href="/contactus"> Contact Us</a>
					</Menu.Item>
					<Menu.Item key="6">Login</Menu.Item>
				</Menu>
			</Header>
			<Router>
				<Routes>
					<Route path="/newsfeed" element={<Newsfeed />} />
					<Route path="/aboutus" element={<AboutUs />} />
					<Route path="/contactus" element={<ContactUs />} />
				</Routes>
			</Router>
			<Footer style={{ textAlign: "center" }}>
				Ant Design ©2018 Created by Ant UED
			</Footer>
		</div>
	);
}

export default App;
