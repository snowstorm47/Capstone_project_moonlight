import React, { useState, useEffect } from "react";
import { Row, Col, Layout } from "antd";
import { Form, Input, Button, Upload } from "antd";
import { Select } from "antd";
import { DatePicker, Space, List, Modal } from "antd";
import { Avatar, Image } from "antd";
import {  InboxOutlined} from "@ant-design/icons";
import { Divider } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import '/App.css';

const { Option } = Select;

function HiringCompanyCreateProfile() {
  const [institutionList, setInstitutionList] = useState([]);
  const [success, setSuccess] = useState();
  const [createProfile, setCreateProfile] = useState({
    phoneNumber: "",
    poBox: "",
    location: "",
    description: "",
    representative: "",
    representativeEmail: "",
    image: "",
    error_list: [],
  });

  //   const [skill,setSkill]= useState({
  //       newSkill:""
  //   });

  useEffect(() => {
    axios.get(`/api/all-institution`).then((res) => {
      if (res.data.status === 200) {
        setInstitutionList(res.data.institution);
        console.log(institutionList);
      }
    });
  }, []);

  

  const navigate = useNavigate();

  const handleInput = (e) => {
    // e.persist();

    setCreateProfile({ ...createProfile, [e.target.name]: e.target.value });
  };

  const Profile = (e) => {
    console.log("create");
    // e.preventDefault();
    const id = localStorage.getItem("auth_id");
    const fData = new FormData();
    fData.append("image", createProfile.image);
    fData.append("phoneNumber", createProfile.phoneNumber);
    fData.append("poBox", createProfile.poBox);
    fData.append("location", createProfile.location);
    fData.append("description", createProfile.description);
    // fData.append("verificationStatus", 0);
    fData.append("representative", createProfile.representative);
    fData.append("representativeEmail", createProfile.representativeEmail);
    fData.append("user_id", id);

    
    axios.get("/sanctum/csrf-cookie").then(() => {
      console.log("inside csrf");

      axios.post(`/api/addHiringCompanyProfile/${id}`, fData).then((res) => {
        if (res.data.status === 200) {
          //   setSuccess(res.data.message);
          localStorage.setItem("auth_profile",1);
          navigate("/");
          console.log('success');
        } else {
          console.log("inside else");
          setCreateProfile({
            ...createProfile,
            error_list: res.data.validation_errors,
          });
          console.log(res.data.validation_errors);
        }
      });
    });
  };

  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  return (
    <Col
    className="row1" 
    style={{ 
        margin: "3em", 
        paddingLeft: "35rem",
        paddingRight: "35rem",
        backgroundColor:"#f0f2f5",
        width:"100%" }}>
      <span>{success}</span>
      <Form 
      style={{
          backgroundColor:"#ffffff",
          paddingTop:"2rem",
          paddingLeft:"1rem",
          paddingRight:"1rem",
          textAlign:"left",
      }}
      onFinish={Profile}>
        {/* <Col
          className="row3"
          span={9}
          style={{ margin: "0.5em", paddingRight: "1em", textAlign: "left" }}
        > */}
        
          <Divider>Create Your Profile </Divider>
          <Col>
        <Form.Item
          name="dragger"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload.Dragger
            name="image"
            type="file"
            multiple={false}
            onChange={(e) =>
              setCreateProfile({
                ...createProfile,
                image: e.fileList[0].originFileObj,
              })
            }
            style={{ width: "100%" }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag to upload Profile Image
            </p>
          </Upload.Dragger>
          <span style={{color:"red"}}>{createProfile.error_list.image}</span>
        </Form.Item>
        </Col>
          <Col>
            <Form.Item
              label="Phone Number"
              style={{ width: "76.5%", borderRadius: "50px" }}
            >
              <Input
                style={{ marginLeft: "0.2em" }}
                name="phoneNumber"
                onChange={handleInput}
                value={createProfile.phoneNumber}
              />
          <span style={{color:"red"}}>{createProfile.error_list.phoneNumber}</span>
            </Form.Item>
          </Col>
        {/* </Col> */}

        <Col>
            <Form.Item
              label="Representative Full Name"
              style={{ width: "76.5%", borderRadius: "50px" }}
            >
              <Input
                style={{ marginLeft: "0.2em" }}
                name="representative"
                onChange={handleInput}
                value={createProfile.representative}
              />
          <span style={{color:"red"}}>{createProfile.error_list.representative}</span>
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              label="Representative Email"
              style={{ width: "76.5%", borderRadius: "50px" }}
            >
              <Input
                style={{ marginLeft: "0.2em" }}
                name="representativeEmail"
                onChange={handleInput}
                value={createProfile.representativeEmail}
              />
          <span style={{color:"red"}}>{createProfile.error_list.representativeEmail}</span>
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              label="Describe what your Company does"
              style={{ width: "76.5%", borderRadius: "50px" }}
            >
              <Input.TextArea
                style={{ marginLeft: "0.2em" }}
                name="description"
                onChange={handleInput}
                value={createProfile.description}
              />
          <span style={{color:"red"}}>{createProfile.error_list.description}</span>
            </Form.Item>
          </Col>

          <Col>
            <Form.Item label="P.O. Box" style={{ width: "76.5%", borderRadius: "50px" }}>
              <Input
                style={{ marginLeft: "0.2em" }}
                name="poBox"
                onChange={handleInput}
                value={createProfile.poBox}
              />
          <span style={{color:"red"}}>{createProfile.error_list.poBox}</span>
            </Form.Item>
          </Col>

          <Col>
            <Form.Item label="Location" style={{ width: "76.5%", borderRadius: "50px" }}>
              <Input
                style={{ marginLeft: "0.2em" }}
                name="location"
                onChange={handleInput}
                value={createProfile.location}
              />
          <span style={{color:"red"}}>{createProfile.error_list.location}</span>
            </Form.Item>
          </Col>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ borderRadius: "80px", marginLeft: '0.7em', marginTop: '1em'}}>
              Create Profile
            </Button>
          </Form.Item>
      </Form>
    </Col>
  );
}

export default HiringCompanyCreateProfile;
