import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Newsfeed from "./pages/newsFeed";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/newsfeed" element={<Newsfeed />} />
			</Routes>
		</div>
	);
}

export default App;
