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

function HiringProfile() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState({
    image: "",
  });
  const showModal = () => {
    setIsModalVisible(true);
  };
  useEffect(() => {
    // axios.get('/sanctum/csrf-cookie').then(res => {
    axios.get(`/api/getHiringCompanyProfilePicture/${id}`).then((res) => {
      if (res.data.status === 200) {
        setProfilePicture(res.data);
      } else {
        console.log("couldnt retrieve data");
      }
    });
  }, []);
  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [success, setSuccess] = useState();
  const [editProfile, setEditProfile] = useState({
    name: "",
    phoneNumber: "",
    poBox: "",
    location: "",
    description: "",
    representative: "",
    representativeEmail: "",
    image: "",
    error_list: [],
  });

  const id = localStorage.getItem("auth_id");

  //
  useEffect(() => {
    // axios.get('/sanctum/csrf-cookie').then(res => {
    axios.get(`/api/hiringCompanyprofile/${id}`).then((res) => {
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
    const id = localStorage.getItem("auth_id");
    const data ={
      phoneNumber: editProfile.phoneNumber,
      name: editProfile.name,
      poBox: editProfile.poBox,
      location: editProfile.location,
      representative: editProfile.representative,
      representativeEmail: editProfile.representativeEmail,
      description: editProfile.description
    }
    axios.get("/sanctum/csrf-cookie").then((res) => {
      console.log("inside csrf");

      axios.put(`/api/updateHiringCompanyProfile/${id}`, data).then((res) => {
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
    <Row
      className="row1"
      style={{ backgroundColor: "#f0f2f5", margin: "3em"}}
    >
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
        style={{
          marginRight: "-10em",
          marginLeft: "0.5em",
          paddingRight: "1em",
          textAlign: "left",
        }}
      >
          <Divider>Edit Profile Page</Divider>

          <Col>
          <span>
                <label style={{fontWeight:"bold"}}>Company Name : </label> {editProfile.name}
              </span>
              <br/>
              <br/>
          </Col>

          <Col>
          <span>
                <label style={{fontWeight:"bold"}}>Representative Name : </label> {editProfile.representative}
              </span>
              <br/>
              <br/>
          </Col>

          <Col>
          <span>
                <label style={{fontWeight:"bold"}}>Representative Email : </label> {editProfile.representativeEmail}</span>
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
                <label style={{fontWeight:"bold"}}>P.O. Box : </label> {editProfile.poBox}
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
                <label style={{fontWeight:"bold"}}>What the Company do : </label> {editProfile.description}
              </span>
              <br/>
              <br/>
          </Col>
      </Col>
    </Row>
  );
}

export default HiringProfile;
