import React, { useState, useEffect } from "react";
import { Card, Row, Col, Layout } from "antd";
import { Form, Input, Button, Upload } from "antd";
import { Select } from "antd";
import { DatePicker, Space, List, Modal } from "antd";
import { Avatar, Image } from "antd";
import {  InboxOutlined} from "@ant-design/icons";
import { Divider } from "antd";
import axios from "axios";
import illustration from "../assets/CompanyAccount.png";
import { useNavigate } from "react-router-dom";
import '../App.css';

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

  useEffect(() => {
    axios.get(`/api/all-institution`).then((res) => {
      if (res.data.status === 200) {
        setInstitutionList(res.data.institution);
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
          axios
            .get(`api/checkCreateProfile?id=${localStorage.getItem("auth_id")}`)
            .then((response) => {
              localStorage.setItem('first',response.data.first) ;
          
            });
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
    <Row style={{
      paddingTop: "2rem"
    }}>
      <Divider>Create Hiring Company Profile</Divider><br  />
      <Col span={16}
      style={{backgroundColor: "#ffffff", textAlign: "left",
        paddingRight: "2rem", paddingLeft:"1rem"
      }}>
        <Col>
          <div className={window.innerWidth<=500?"imageMob":"image"}>
            <img src={illustration} style={{paddingLeft: "5em", width: "180%"}} className="illustration" alt="" />
          </div>
        </Col>
        <Col>
        <Card bordered={false} className="homeCard" style={{width: "90%"}}>
								<h1 style={{ color: "black", fontSize: "2em" }}>
									Create hiring company's profile here
								</h1>
								<span>
									This page is to create a hiring companies user profile. This account canbe able to view students from various institutions, hire students, as well as view notifications, posts and news from various institutions.
								</span>
							</Card>
        </Col>

      </Col>
      <Col span={8}>
        <Form onFinish={Profile}>
        <Row>
          
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
                style={{ width: "150%" }}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag to upload Profile Image
                  </p>
              </Upload.Dragger>
            </Form.Item>
          
        </Row>
        

        <Row>  
            <Form.Item
              label="Phone Number"
                >
                <Input
                  style={{ marginLeft: "0.2em" }}
                  name="phoneNumber"
                  onChange={handleInput}
                  value={createProfile.phoneNumber}
                />
                 <span style={{color:"red"}}>{createProfile.error_list.phoneNumber}</span>
              </Form.Item>
          
        </Row>
        <Row>
          <Form.Item
            label="Representative Name"
             style={{ width: "70%", borderRadius: "50px" }}
            >
              <Input
                style={{ marginLeft: "0.2em" }}
                name="representativeName"
                onChange={handleInput}
                value={createProfile.institutionName}
              />
          <span style={{color:"red"}}>{createProfile.error_list.institutionName}</span>
            </Form.Item>
        </Row>
        <Row>
        <Form.Item
              label="Representative Email"
              style={{ width: "70%", borderRadius: "50px" }}
            >
              <Input
                style={{ marginLeft: "0.2em" }}
                name="representativeEmail"
                onChange={handleInput}
                value={createProfile.representativeEmail}
              />
          <span style={{color:"red"}}>{createProfile.error_list.representativeEmail}</span>
            </Form.Item>
        </Row>
        <Row>
        <Form.Item
              label="Describe what your Company does"
              style={{ width: "90%", borderRadius: "50px" }}
            >
              <Input.TextArea
                style={{ marginLeft: "0.2em" }}
                name="description"
                onChange={handleInput}
                value={createProfile.description}
              />
          <span style={{color:"red"}}>{createProfile.error_list.description}</span>
            </Form.Item>
        </Row>
        <Row>
        <Form.Item label="Location" style={{ width: "60%", borderRadius: "50px" }}>
               <Input
                style={{ marginLeft: "0.2em" }}
                name="location"
                onChange={handleInput}
                value={createProfile.location}
              />
          <span style={{color:"red"}}>{createProfile.error_list.location}</span>
            </Form.Item>
        </Row>
        <Row>
        <Form.Item label="P.O. Box" style={{ width: "60%", borderRadius: "50px" }}>
               <Input
                style={{ marginLeft: "0.2em" }}
                name="poBox"
                onChange={handleInput}
                value={createProfile.poBox}
              />
          <span style={{color:"red"}}>{createProfile.error_list.poBox}</span>

            </Form.Item>
        </Row>
        <Row>
        <Form.Item>
             <Button type="primary" htmlType="submit" style={{ borderRadius: "80px", marginLeft: '10em', marginTop: '1em'}}>
               Create Profile
             </Button>
          </Form.Item>
        </Row>
    </Form>
    </Col>
    </Row>
  );
}

export default HiringCompanyCreateProfile;
