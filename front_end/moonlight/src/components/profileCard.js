import React from "react";
import "../styles/profilecard.css";
function ProfileCard() {
	return (
		<div className="cardContainer">
			<div className="topContainer">
				<div className="imageContainer">
					<img
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
						alt=""
					/>
				</div>
			</div>
			<div className="lowerContainer">
				<h1 className="title">Bettelehem Abayneh</h1>
				<h4
					style={{
						marginBottom: "20px",
						fontSize: "10pt",
						textAlign: "center",
					}}
				>
					addis ababa university
				</h4>
				<h1 className="title">Experience</h1>
				<h1 className="companyName" style={{}}>
					Berbera
				</h1>
				<h1 className="subcontent" style={{}}>
					Developer
				</h1>
				<h1 className="companyName" style={{}}>
					zafree
				</h1>
				<h1 className="subcontent" style={{}}>
					Developer
				</h1>
			</div>
		</div>
	);
}
export default ProfileCard;
