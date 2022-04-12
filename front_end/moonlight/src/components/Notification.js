import React from "react";
import "../styles/notification.css";
import 'bootstrap/dist/css/bootstrap.css';
function Notification() {
  return (
    <div>
      <div class="linkall">
        <a href="#" className="linkpublic links">
          Public
        </a>
        <a href="#" className="linkprivate links">
          Private
        </a>
        <a href="#" className="linklatest links">
          Latest
        </a>
        <a href="#" className="linkhot links">
          Hot
        </a>
      </div>
      <div>
        <hr className="hr"></hr>
      </div>

      <div className="container profile row">
        <div class="col-md-3">
          <div class="profile-img" style={{marginTop:"8em"}}>
            <span>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
              alt=""
            />
            </span>
          </div>
        </div>
      </div>
      <div className="row">
        <div class="col-md-3">
          <div class="profile-head">
            <h5>Kshiti Ghelani</h5>
          </div>
        </div>
      </div>
      <div className="row">
        <div class="col-md-3">
          <div class="profile-head">
            <h6>Addis Ababa Science and Technology University</h6>
          </div>
        </div>
      </div>
      <div className="row">
        <div class="col-md-3">
          <div class="profile-work">
            <p style={{fontWeight: "bold" ,color:"black", fontSize:"1.2em"}}>Experiences</p>
            <a href="">Berbera Market</a>
            <br />
            <p>Developer</p>
            <br />
            <hr></hr>
            <a href="">Zafre Papers</a>
            <br />
            <p>Arso Ader</p>
            <br />
            <hr></hr>

            <p style={{fontWeight: "bold", color:"black"}}>
              Posts: <span>10</span>
            </p>

            <br />
          </div>
        </div>
        
        <div class="containerpost col-md-6">
        <div onClick="" class="container mt-5 mb-5 news">
          <div class="row d-flex justify-content-center">
            <div class="col-md-8">
              <div class="d-flex flex-row"style={{marginTop:"-11em",marginBottom:"0em"}}></div>
              <div class="row news-card p-3 bg-white">
                <div class="col-md-4">
                  <div class="feed-image">
                    <img
                      class="news-feed-image rounded img-fluid img-responsive"
                      src="https://i.imgur.com/ZKbpmaU.jpg"
                    />
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="news-feed-text">
                    <h5 class="news-title">Frosty aced for the first time</h5>
                  </div>
                  <div class="d-flex flex-row justify-content-between align-items-center mt-2">
                    <div class="d-flex creator-profile">
                      <img
                        class="rounded-circle profile-image"
                        src="https://i.imgur.com/uSlStch.jpg"
                        width="50"
                        height="50"
                      />
                      <div class="d-flex flex-column ml-2">
                        <h6 class="username">
                          Addis Ababa Science and Technology University
                        </h6>
                      </div>
                    </div>
                    <i class="fa fa-share share"></i>
                  </div>

                  <span class="news-detail">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard Lorem Ipsum is simply Lorem Ipsum has been the
                    industry's standard Lorem Ipsum is simply ...
                    <br />
                  </span>
                  <span class="date">2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div onClick="" class="container mt-5 mb-5 news">
          <div class="row d-flex justify-content-center">
            <div class="col-md-8">
              <div class="d-flex flex-row" style={{marginTop:"-8em",marginBottom:"0em"}}></div>
              <div class="row news-card p-3 bg-white">
                <div class="col-md-4">
                  <div class="feed-image">
                    <img
                      class="news-feed-image rounded img-fluid img-responsive"
                      src="https://i.imgur.com/ZKbpmaU.jpg"
                    />
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="news-feed-text">
                    <h5 class="news-title">Frosty aced for the first time</h5>
                  </div>
                  <div class="d-flex flex-row justify-content-between align-items-center mt-2">
                    <div class="d-flex creator-profile">
                      <img
                        class="rounded-circle profile-image"
                        src="https://i.imgur.com/uSlStch.jpg"
                        width="50"
                        height="50"
                      />
                      <div class="d-flex flex-column ml-2">
                        <h6 class="username">
                          Addis Ababa Science and Technology University
                        </h6>
                      </div>
                    </div>
                    <i class="fa fa-share share"></i>
                  </div>

                  <span class="news-detail">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard Lorem Ipsum is simply Lorem Ipsum has been the
                    industry's standard Lorem Ipsum is simply ...
                    <br />
                  </span>
                  <span class="date">2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div class="containercreatepost col-md-3">
        <div class=" col-md-">
          <div class="Back">
            <i class="fa fa-arrow-left" onclick="Back()"></i>
          </div>
          <p class="h2 text-center">Create a Post</p>
          <form action="" method="post">
            <div class="form-group "><br/>
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
              <label className="">Add an image or video:</label><br/> <br/>
                    <input class="" type="file" required name="UploadedFile" id="UploadedFile"/>
                </div>
                <span class="Error"></span>
            </div>
            <div class="form-group">
              <input
                class="btn btn-warning btn-block"
                type="submit"
                value="Submit"
              />
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
