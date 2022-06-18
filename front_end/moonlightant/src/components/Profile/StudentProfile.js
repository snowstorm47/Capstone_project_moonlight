import React, { useState, useEffect } from "react";
import { List, Image,Row, Col,Card } from "antd";
import { Divider } from "antd";
import axios from "axios";

function StudentProfile() {
  const [profilePicture, setProfilePicture] = useState({
    image: "",
  });
  const [visible, setVisible] = useState(true);
  const [institutionData, setInstitutionData] = useState([]);
  const [institutionId, setInstitutionId] = useState([]);
  const [collegeId, setCollegeId] = useState([]);
  const [departmentId, setDepartmentId] = useState([]);
  const [success, setSuccess] = useState();
  const [skillList, setSkillList] = useState([]);
  const [editProfile, setEditProfile] = useState({
    phoneNumber: "",
    name: "",
    position: "",
    startDate: "",
    endDate: "",
    sex: "",
    institution_id: "",
    college_id: "",
    department_id: "",
    companyName: "",
    GPA: "",
    major: "",
    startDateClass: "",
    endDateClass: "",
    image: "",
    skill: [],
    employmentHistory: [],
    newSkill: "",
    error_list: [],
  });
  const id = localStorage.getItem("auth_id");

  useEffect(() => {
    axios.get(`/api/profile/${id}`).then((res) => {
      if (res.data.status === 200) {
          setInstitutionId(res.data.institution_id);
          setCollegeId(res.data.college_id);
          setDepartmentId(res.data.department_id);
          const data = {
              institutionId: institutionId,
              collegeId: collegeId,
              departmentId: departmentId,
          }
          axios.get(`/api/getInstitutionName?institution_id=${institutionId}&college_id=${collegeId}&department_id=${departmentId}`,data).then((res) => {
            if (res.data.status === 200) {
                setInstitutionData(res.data);
                console.log(institutionData)
            } else {
              console.log("couldnt retrieve data");
            }
          });
        setEditProfile(res.data);
        console.log(res.data.ins);
        setSkillList(res.data.skill);
        console.log(skillList.skill);
      } else {
        console.log("couldnt retrieve data");
      }
    });
  }, []);

  useEffect(() => {
    axios.get(`/api/getProfilePicture/${id}`).then((res) => {
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
                <label style={{fontWeight:"bold"}}>Major : </label> {editProfile.major}
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
                <label style={{fontWeight:"bold"}}>Institution : </label> {institutionData.institutionName}
              </span>
              <br/>
              <br/>
          </Col>

          <Col>
          <span>
                <label style={{fontWeight:"bold"}}>College : </label> {institutionData.collegeName}
              </span>
              <br/>
              <br/>
          </Col>

          <Col>
            <span>
                <label style={{fontWeight:"bold"}}>Department : </label> {institutionData.departmentName}
              </span>
              <br/>
              <br/>
          </Col>

          <Col>
              <span>
                <label style={{fontWeight:"bold"}}>Class Start Date: </label> {editProfile.startDateClass}
              </span>
              <br/>
              <br/>
              <span>
                <label style={{fontWeight:"bold"}}>Class End Date: </label> {editProfile.endDateClass}
              </span>
            
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

        {/* </Col> */}
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

export default StudentProfile;
