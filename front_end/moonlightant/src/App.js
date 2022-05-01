import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Newsfeed from "./pages/newsFeed";
import AboutUs from "./AboutUs";
function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/newsfeed" element={<Newsfeed />} />
				<Route path="/aboutus" element={<AboutUs />} />

			</Routes>
		</div>
	);
}

export default App;
