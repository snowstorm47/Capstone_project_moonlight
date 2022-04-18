import "./styles/register.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Redirect,
} from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import Landing from "./components/landing";
import Footer from "./components/footer";
import Header from "./components/header";
import Reset from "./components/Reset";
import Notification from "./components/Notification";
import axios from "axios";
import AboutUs from "./components/AboutUs";
import ForgotPassword from "./components/forgotPassword";
import Newsfeed from "./components/Newsfeed";

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
function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Landing />} />
			</Routes>
			<Routes>
				<Route path="/register" element={<Register />} />
			</Routes>
			<Routes>
				<Route path="/login" element={<Login />} />
			</Routes>
			<Routes>
				<Route path="/password-reset/:token" element={<Reset />} />
			</Routes>
			<Routes>
				<Route path="/notification" element={<Notification />} />
			</Routes>
			<Routes>
				<Route path="/aboutUs" element={<AboutUs />} />
			</Routes>
			<Routes>
				<Route path="/forgot" element={<ForgotPassword />} />
			</Routes>
			<Routes>
				<Route path="/Newsfeed" element={<Newsfeed />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
