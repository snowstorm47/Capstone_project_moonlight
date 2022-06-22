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
import AddSkill from "../components/AddSkill";
import AddEmploymentHistory from "../components/AddEmploymentHistory";
import EditEmploymentHistory from "../components/EditEmploymentHistory";
import EditInstitutionProfilePicture from "../components/EditInstitutionProfilePicture";
import '../App.css';


const { Option } = Select;

function ProfilePageInstitution() {

  const [success, setSuccess] = useState();
  const [editProfile, setEditProfile] = useState({
    phoneNumber: "",
    institutionName: "",
    location:"",
    poBox:"",
    error_list: [],
  });


  const id = localStorage.getItem("auth_id");

  //
  useEffect(() => {
    // axios.get('/sanctum/csrf-cookie').then(res => {
    axios.get(`/api/institutionprofile/${id}`).then((res) => {
      if (res.data.status === 200) {
        setEditProfile(res.data);
      } else {
        console.log("couldnt retrieve data");
      }
    });
  }, []);

  const navigate = useNavigate();

  const handleInput = (e) => {
    // e.persist();

    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  };

  const updateProfile = (e) => {
    console.log("update");
    // e.preventDefault();
    console.log(editProfile.college_id);
    console.log(editProfile.sex);
    const data = {
      phoneNumber: editProfile.phoneNumber,
      institutionName: editProfile.institutionName,
      poBox: editProfile.poBox,
      location: editProfile.location,
    };
    const id = localStorage.getItem("auth_id");
    axios.get("/sanctum/csrf-cookie").then((res) => {
      console.log("inside csrf");

      axios.put(`/api/updateInstitutionProfile/${id}`, data).then((res) => {
        if (res.data.status === 200) {
          setSuccess("Your profile has been updated Succcessfully");
          navigate("/");
          console.log(success);
        } else {
          console.log("inside else");
          setEditProfile({
            ...editProfile,
            error_list: res.data.validation_errors,
          });
          console.log(res.data.validation_errors);
        }
      });
    }, []);
  };

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
          <EditInstitutionProfilePicture/>
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
        <Form 
        onFinish={updateProfile}
        style={{background:"#ffffff",
        marginTop:"2rem",
          paddingLeft:"1rem",
          paddingRight:"1rem",
          paddingTop:"1rem",
          paddingBottom:"1rem",
          textAlign:"left",
          marginBottom:"2rem",
        borderRadius:"1rem"
      }}
        >
          <Divider>Edit Profile Page</Divider>

          <Col>
            <Form.Item label="Institution Name" 
            style={{width: "77%", borderRadius: "50px"}}>
              <Input
                
                name="institutionName"
                onChange={handleInput}
                value={editProfile.institutionName}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Phone Number" style={{ width: "76.5%", borderRadius: "50px" }}>
              <Input
                style={{ marginLeft: "0.2em" }}
                name="phoneNumber"
                onChange={handleInput}
                value={editProfile.phoneNumber}
              />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item label="Location" style={{ width: "76.5%", borderRadius: "50px" }}>
              <Input
                style={{ marginLeft: "0.2em" }}
                name="location"
                onChange={handleInput}
                value={editProfile.location}//change this
              />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item label="P.O. Box" style={{ width: "76.5%", borderRadius: "50px" }}>
              <Input
                style={{ marginLeft: "0.2em" }}
                name="poBox"
                onChange={handleInput}
                value={editProfile.poBox}//change this
              />
            </Form.Item>
          </Col>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ borderRadius: "80px", marginLeft: '0.7em', marginTop: '1em'}}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default ProfilePageInstitution;
