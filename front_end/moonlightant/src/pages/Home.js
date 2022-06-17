import { Card, Carousel, Progress, Statistic } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
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
	const [state, setState] = useState();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		axios.get("api/newsfeed").then((response) => {
			setState(response.data.newsdata);
			setLoading(false);
		});
	}, []);
	return (
		<div className="homeContainer">
			<div className="topContainer">
				<div className="wordCaroselContainer">
					<div>
						{console.log(window.innerWidth, ".............................")}
						<Carousel
							style={{ width: "auto", marginleft: "20px", display: "flex" }}
							autoplay
							dots={false}
							effect="fade"
						>
							<Card bordered={false} className="homeCard">
								<h1 style={{ color: "black", fontSize: "2em" }}>
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
							{localStorage.getItem("auth_token") ? null : (
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
							)}
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
				<div style={{ display: "flex" }}>
					<div style={{ width: "50%", marginRight: "8%", marginLeft: "2%" }}>
						<Newscard state={state} />
					</div>
					<div
						style={{
							width: "35%",
							height: 450,
							marginRight: 0,
							display: "flex",
							flexDirection: "column",
							boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
						}}
					>
						<div
							style={{
								width: "100%",

								textAlign: "center",
								padding: 20,
							}}
						>
							<h2>Join a community with</h2>
						</div>
						<div
							style={{
								display: "flex",

								lexDirection: "row",
								justifyContent: "space-evenly",
								paddingTop: 20,
							}}
						>
							<Statistic title="Total users" value={1890} />
							<Statistic title="Students" value={250} />
						</div>
						<div
							style={{
								display: "flex",
								lexDirection: "row",
								paddingTop: 20,
								justifyContent: "space-evenly",
							}}
						>
							<Statistic title="Graduates" value={347} />
							<Statistic title="Companies" value={110} />
						</div>
						<h4 style={{ color: "gray" }}>
							90% of Institutions in the country
						</h4>
						<Progress
							type="circle"
							title="universities in the nation"
							strokeColor={{
								"0%": "#108ee9",
								"100%": "#87d068",
							}}
							percent={90}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
