import { Card, Carousel } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import illustration from "../assets/homeillustration.png";
import Newscard from "../components/Newscard";
import "../styles/home.css";
const Home = () => {
	const navigate = useNavigate();
	const contentStyle = {
		color: "black",
		lineHeight: "160px",
		textAlign: "left",
		background: "white",
	};
	return (
		<div className="homeContainer">
			<div className="topContainer">
				<div className="wordCaroselContainer">
					<div>
						<Carousel
							style={{ width: "auto", marginleft: "20px", display: "flex" }}
							autoplay
							dots={false}
							effect="fade"
						>
							<Card bordered={false} className="homeCard">
								<h1 style={{ color: "black" }}>
									Stay connected to your community
								</h1>
								<span>
									we offer multiple convinient ways of connecting you with the
									community you learned and grew up with by using either news,
									posts from fellow students or notifications
								</span>
							</Card>
							<Card bordered={false} className="homeCard">
								<h1 style={{ color: "black" }}>
									Find jobs best suited for you
								</h1>
								<span>
									Employers accross the country will have access to your profile
									through our advanced filtering method for better
									compatability.
								</span>
							</Card>
							<Card bordered={false} className="homeCard">
								<h1 style={{ color: "black" }}>
									Get the latest news from Institutions
								</h1>
								<span>
									Get news from multiple institutions located in different
									cities accross the country with the option to filter it to
									your personal institution of choice.
								</span>
							</Card>
						</Carousel>
						<Card bordered={false} className="buttonCard">
							<button
								class="cssbuttons-io-button"
								onClick={() => navigate("signup")}
							>
								Get started
								<div class="icon">
									<svg
										height="24"
										width="24"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M0 0h24v24H0z" fill="none"></path>
										<path
											d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
											fill="currentColor"
										></path>
									</svg>
								</div>
							</button>
						</Card>
					</div>
				</div>

				<div className="image">
					<img src={illustration} className="illustration" alt="" />
				</div>
			</div>
			<div className="newsContainerHome">
				<div style={{ width: "100%" }}>
					<h2
						style={{
							fontWeight: "bold",
							fontFamily: " Arial, Helvetica, sans-serif",
							alignSelf: "flex-start",
						}}
					>
						Latest News
					</h2>
				</div>

				<div>
					<Newscard />
				</div>
			</div>
		</div>
	);
};

export default Home;
