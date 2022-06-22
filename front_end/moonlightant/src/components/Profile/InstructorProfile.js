import React, { useState, useEffect } from "react";
import { List, Image,Row, Col,Form } from "antd";
import { Divider,Card } from "antd";
import axios from "axios";
import { useLocation } from "react-router-dom";

function InstructorProfile() {
	const location = useLocation();
  const [profilePicture, setProfilePicture] = useState({
    image: "",
  });
  const [visible, setVisible] = useState(true);
  const [success, setSuccess] = useState();
  const [skillList, setSkillList] = useState([]);
  const [editProfile, setEditProfile] = useState({
    phoneNumber: "",
    name: "",
    position: "",
    startDate: "",
    endDate: "",
    sex: "",
    institutionName:"",
    collegeName:"",
    departmentName:"",
    companyName: "",
    GPA: "",
    experience: "",
    startDateClass: "",
    endDateClass: "",
    image: "",
    skill: [],
    employmentHistory: [],
    newSkill: "",
    error_list: [],
  });
  const id = location.state.id;
  console.log(id);
  useEffect(() => {
    axios.get(`/api/instructorprofile/${id}`).then((res) => {
      if (res.data.status === 200) {
        setEditProfile(res.data);
        setSkillList(res.data.skill);
      } else {
        console.log("couldnt retrieve data");
      }
    });
  }, []);

  useEffect(() => {
    // axios.get('/sanctum/csrf-cookie').then(res => {
    axios.get(`/api/getInstructorProfilePicture/${id}`).then((res) => {
      if (res.data.status === 200) {
        setProfilePicture(res.data);
      } else {
        console.log("couldnt retrieve data");
      }
    });
  }, []);

  return (
    <Row className="row1" style={{ margin: "3em", marginLeft: "0em" }}>
      <span>{success}</span>
      <Col
        className="row"
        span={5}
        style={{
          margin: "0.5em",
          paddingRight: "1.5em",
          paddingTop: "8em",
        }}
      >
        <Col>
        <div className="image1">
        <Image
          width={190}
          src={
            "http://localhost:8000/uploads/ProfilePicture/" +
            profilePicture.image
          }
          name="image"
          style={{ borderRadius: "100px", alignContent: "left" }}
        />
      </div>  
        </Col>
      </Col>

      <Col
        className="row3"
        span={9}
        style={{ margin: "0.5em", paddingRight: "1em", textAlign: "left" }}
      >
          <Divider>Profile Page</Divider>

          <Col>
          <span>
                <label style={{fontWeight:"bold"}}>Full Name : </label> {editProfile.name}
              </span>
              <br/>
              <br/>
          </Col>

          <Col>
          <span>
                <label style={{fontWeight:"bold"}}>phoneNumber : </label> {editProfile.phoneNumber}
              </span>
              <br/>
              <br/>
          </Col>

          <Col>
          <span>
                <label style={{fontWeight:"bold"}}>Experience : </label> {editProfile.experience}
              </span>
              <br/>
              <br/>
          </Col>

          <Col>
          <span>
                <label style={{fontWeight:"bold"}}>GPA : </label> {editProfile.GPA}
              </span>
              <br/>
             <br/>
          </Col>

          <Col>
          <span>
                <label style={{fontWeight:"bold"}}>Gender : </label> {editProfile.sex}
              </span>
              <br/>
              <br/>
          </Col>

          <Col>
            <Divider>Academic</Divider>
            <span>
                <label style={{fontWeight:"bold"}}>Institution : </label> {editProfile.institutionName}
              </span>
              <br/>
              <br/>
          </Col>
          <Col>
          <span>
                <label style={{fontWeight:"bold"}}>College : </label> {editProfile.collegeName}
              </span>
              <br/>
              <br/>
          </Col>
          <Col>
          <span>
                <label style={{fontWeight:"bold"}}>Department : </label> {editProfile.departmentName}
              </span>
              <br/>
              <br/>
          </Col>
        <Divider>Skills</Divider>
        <Col>
          {skillList.map((item) => (
            <button
              href=""
              key={item.id}
              value={item.skill}
              style={{
                color: "black",
                borderRadius: 100,
                border: 0,
                margin: 2,
                backgroundColor: "#f0f2f5",
              }}
            >
              {item.skill}
            </button>
          ))}
        </Col>

        </Col>
        
        <Col
        className="row"
        span={9}
        style={{
          margin: "0.5em",
          paddingRight: "1.5em",
          paddingTop: "0em",
        }}
        >
        <Divider>Employment History</Divider>
        <Col>
          {visible ? (
            <List
              itemLayout="horizontal"
              dataSource={editProfile.employmentHistory}
              renderItem={(item) => (
                <List.Item
                  style={{
                    marginBottom: "1em",
                  }}
                >
                  <List.Item.Meta
                    title={
                      <a
                        href="#"
                        style={{
                          marginLeft: "0em",
                        }}
                      >
                        {item.companyName}
                      </a>
                    }
                    description={item.position}
                    style={{
                      textAlign: "left",
                    }}
                  />
                  <br />
                  <br />
                  <br />
                  <br />
                  <div
                    style={{
                      marginTop: "5em",
                      marginRight: "9rem",
                    }}
                  >
                    Start Date : {item.startDate}
                  </div>
                  <div
                    style={{
                      marginTop: "5em",
                    }}
                  >
                    End Date : {item.endDate}
                  </div>
                </List.Item>
              )}
            />
          ) : null}
        </Col>
        <Col>
        <Divider>Certificates</Divider>
            {visible ? (
              <List
                itemLayout="horizontal"
                dataSource={editProfile.certificate}
                renderItem={(item) => (
                  <List.Item
                    style={{
                      marginBottom: "1em",
                      float:"left",
                      marginLeft:"2rem"
                    }}
                  >
                    <Card
                      cover={
                        <>
                          <Image
                            width={250}
                            height={90}
                            src={
                              "http://localhost:8000/uploads/Certificates/" +
                              item.certificate
                            }
                            name="image"
                            style={{
                              borderRadius: "0px",
                              alignContent: "left",
                              marginLeft: "0rem",
                              marginTop: "1rem",
                              marginBottom: "-1rem",
                            }}
                          />
                          <br/>
                          <span style={{ marginTop: "2rem",marginLeft:"0rem", marginBottom:"-2rem"}}>
                            {item.description}
                          </span>
                        </>
                      }
                    ></Card>
                  </List.Item>
                )}
              />
            ) : null}
        </Col>
      </Col>
    </Row>
  );
}

export default InstructorProfile;
