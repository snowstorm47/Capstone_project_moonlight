import { Card, Carousel } from "antd";
import illustration from "../assets/homeillustration.png";
import "../styles/home.css";
const Home = () => {
	const contentStyle = {
		color: "black",
		lineHeight: "160px",
		textAlign: "left",
		background: "white",
	};
	return (
		<div className="homeContainer">
			<div className="wordCarosel">
				<Carousel
					style={{ width: "300px", height: "auto" }}
					autoplay
					dots={false}
					effect="fade"
				>
					<Card bordered={false} style={{ textAlign: "left" }}>
						<h1>Stay connected to your community</h1>
						<span>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit.
							Aspernatur provident{" "}
						</span>
					</Card>
					<Card bordered={false} style={{ textAlign: "left" }}>
						<h1>Find jobs best suited for you</h1>
						<span>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit.
							Aspernatur provident{" "}
						</span>
					</Card>
					<Card bordered={false} style={{ textAlign: "left" }}>
						<h1>Get the latest news from Institutions</h1>
						<span>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit.
							Aspernatur provident{" "}
						</span>
					</Card>
					<div>
						<h1 style={contentStyle}>Get the latest news from Institutions</h1>
						<span>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit.
							Aspernatur provident{" "}
						</span>
					</div>
					<div>
						<h1 style={contentStyle}>Find jobs best suited for you</h1>
						<span>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit.
						</span>
					</div>
				</Carousel>
			</div>
			<div className="image">
				<img src={illustration} className="illustration" alt="" />
			</div>
		</div>
	);
};

export default Home;
