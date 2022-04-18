import React from "react";
import "../styles/newsCard.css";
function NewsCard() {
	return (
		<div className="cardcontainer">
			<div className="image">
				<img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
					alt=""
					className="newsImage"
				/>
			</div>
			<div className="content">
				<div className="title">
					<h3>Dr. Jane Doe's event at the red carpet</h3>
				</div>

				<div className="profileImageAndName">
					<div className="profileImage">
						<img
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
							alt=""
							className="profileImg"
						/>
					</div>
					<div className="universityName">Addis Abeba University</div>
				</div>
				<div className="detail">
					<h4>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima
						numquam similique fugiat repudiandae? Expedita nulla adipisci
						laudantium deserunt, voluptate eius vero
					</h4>
				</div>
			</div>
		</div>
	);
}
export default NewsCard;
