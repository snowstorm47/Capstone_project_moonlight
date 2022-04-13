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
				<p className="title">Bettelehem Abayneh</p>
				<p
					className="subcontent"
					style={{ textAlign: "center", marginBottom: "20px" }}
				>
					addis ababa university
				</p>
				<p className="title">Experience</p>
				<p className="companyName" style={{ paddingLeft: "20px" }}>
					Berbera
				</p>
				<p className="subcontent" style={{ paddingLeft: "20px" }}>
					Developer
				</p>
			</div>
		</div>
	);
}
export default ProfileCard;
