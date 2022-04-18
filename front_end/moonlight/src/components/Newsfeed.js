import React from "react";
import "../styles/Newsfeed.css";
import "bootstrap/dist/css/bootstrap.css";
import NewsCard from "./newsCard";
import ProfileCard from "./profileCard";
function Newsfeed() {
	return (
		<div>
			<div className="all">
				<a href="#" className="links">
					Public
				</a>
				<a href="#" className="links">
					Private
				</a>
				<a href="#" className="links">
					Latest
				</a>
				<a href="#" className="links">
					Hot
				</a>
				<hr className="hr"></hr>
			</div>
			<div className="rows">
				<div className="profileContainer">
					<ProfileCard />
				</div>
				<div className="newsContainer">
					<NewsCard />
					<NewsCard />
					<NewsCard />
					<NewsCard />
				</div>
				<div className="createPostContainer">
					<div className="formContainer">
						<p class="h2 text-center">Create a Post</p>
						<form action="" method="post">
							<div class="form-group ">
								<br />
								<label>Title:</label>
								<input
									class="form-control"
									type="text"
									name="title"
									required
									placeholder="Enter Your title"
								/>
								<span class="Error"></span>
								<br />
							</div>
							<div class="form-group">
								<label>Description:</label>
								<textarea
									class="form-control"
									rows="5"
									type="text"
									name="description"
									required
									placeholder="Enter Your post description"
								/>
								<span class="Error"></span>
							</div>

							<div class="preview text-center">
								<div class="">
									<label className="">Add an image or video:</label>
									<br /> <br />
									<input
										class=""
										type="file"
										required
										name="UploadedFile"
										id="UploadedFile"
									/>
								</div>
								<span class="Error"></span>
							</div>

							<input className="createPost" type="submit" value="Submit" />
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Newsfeed;
