import React, { useState, useEffect } from "react";
import { Row, Col, Layout } from "antd";
import { Form, Input, Button, Typography } from "antd";
import { Select } from "antd";
import { DatePicker, Space, List, Modal } from "antd";
import { Avatar, Image } from "antd";
import { UserOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import '/App.css';

const { Option } = Select;

function InstitutionProfile() {
  const [profilePicture, setProfilePicture] = useState({
    image: "",
  });
  const [success, setSuccess] = useState();
  const [editProfile, setEditProfile] = useState({
    phoneNumber: "",
    institutionName: "",
    location:"",
    poBox:"",
    error_list: [],
  });


  const id = localStorage.getItem("auth_id");
  useEffect(() => {
    axios.get(`/api/institutionprofile/${id}`).then((res) => {
      if (res.data.status === 200) {
        setEditProfile(res.data);
      } else {
        console.log("couldnt retrieve data");
      }
    });
  }, []);

  useEffect(() => {
    // axios.get('/sanctum/csrf-cookie').then(res => {
    axios.get(`/api/getInstitutionProfilePicture/${id}`).then((res) => {
      if (res.data.status === 200) {
        setProfilePicture(res.data);
      } else {
        console.log("couldnt retrieve data");
      }
    });
  }, []);

  <Avatar icon={<UserOutlined />} />;
  return (
    <Row className="row1" style={{ backgroundColor: "#f0f2f5", margin: "3em" }}>
      <span>{success}</span>

      <Col
        className="row"
        span={5}
        style={{
          margin: "0.5em",
          paddingRight: "1.5em",
          paddingTop: "6em",
          marginLeft: "15em" 
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
        style={{ marginRight: "-10em",
        marginLeft: "0.5em",
        paddingRight: "1em",
        textAlign: "left"}}
      >
          <Divider>Profile Page</Divider>

          <Col>
          <span>
                <label style={{fontWeight:"bold"}}>Institution Name : </label> {editProfile.institutionName}
              </span>
              <br/>
              <br/>
          </Col>
          <Col>
          <span>
                <label style={{fontWeight:"bold"}}>Phone Number : </label> {editProfile.phoneNumber}
              </span>
              <br/>
              <br/>
          </Col>

          <Col>
          <span>
                <label style={{fontWeight:"bold"}}>Location : </label> {editProfile.location}
              </span>
              <br/>
              <br/>
          </Col>

          <Col>
          <span>
                <label style={{fontWeight:"bold"}}>P.O. Box : </label> {editProfile.poBox}
              </span>
              <br/>
              <br/>
          </Col>
      </Col>
    </Row>
  );
}

export default InstitutionProfile;
