import React from 'react';
import image from "../assets/aastuaboutus.jpg";
import "../styles/aboutUs.css";
function AboutUs(){
    return(
        <div>
           
           <div className="body">
               <img src={image}/>
               <div class="top-right">
               <h1>
                    Connecting everyone
                </h1>
                <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
               </div>
                
                
               
           </div>
           <div>
               <span className="col-md-3 ourTeam our">
                   <div>

                   </div>
                   <div className="titles">
                        Our Team
                    </div>
                   <div>
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                       Lorem 
                       <div className="vl col-md-2"></div>
                   </div>
                   
               </span>
               
               <span className="col-md-3 ourMission our">
                   <div>

                   </div>
                   <div className="titles">
                        Our Mission
                    </div>
                   <div>
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                       Lorem 
                       <div className="vl col-md-1"></div>
                   </div>
                   
               </span>
               
               <span className="col-md-3 ourVision our">
                   <div>

                   </div>
                   <div className="titles">
                        Our Vision
                    </div>
                   <div>
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                       Lorem 
                   </div>
                   
               </span>
           </div>
           <div className="service">
               <img className="col-md-6 serviceImage"/>
               <span className="col-md-6 ourService">
                   <h4>Our Services</h4>
               Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                       Lorem 
               </span>
           </div>
           <div className="service">
               
               <div className="col-md-6 ourMission">
                   <h4>Our Mission</h4>
               Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                       Lorem 
               </div>
               <img className="col-md-6 missionImage"/>
           </div>
           <div className="service">
               <img className="col-md-6 serviceImage"/>
               <span className="col-md-6 ourService">
                   <h4>Our Vision</h4>
               Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                       Lorem 
               </span>
           </div>
        </div>
    );
}

export default AboutUs;