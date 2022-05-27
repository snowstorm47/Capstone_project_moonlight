import React, { useState, useEffect } from "react";
import { Row, Col, Layout } from "antd";
import { Form, Input, Button, Upload } from "antd";
import { Select } from "antd";
import { DatePicker, Space, List, Modal } from "antd";
import { Avatar, Image } from "antd";
import { UserOutlined, CloseOutlined, InboxOutlined} from "@ant-design/icons";
import { Divider } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddSkill from "../components/AddSkill";
import AddEmploymentHistory from "../components/AddEmploymentHistory";
import EditEmploymentHistory from "../components/EditEmploymentHistory";
import SocialMediaLink from "../components/SocialMediaLink";
import EditProfilePicture from "./EditProfilePicture";

// import '/App.css';

const { Option } = Select;

function InstructorCreateProfile() {
  const [institutionList, setInstitutionList] = useState([]);
  const [success, setSuccess] = useState();
  const [createProfile, setCreateProfile] = useState({
    phoneNumber: "",
    sex: "",
    institution_id: "",
    GPA: "",
    major: "",
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
    fData.append("sex", createProfile.sex);
    fData.append("major", createProfile.major);
    fData.append("GPA", createProfile.GPA);
    fData.append("verificationStatus", 0);
    fData.append("institution_id", createProfile.institution_id);
    fData.append("user_id", id);

    
    axios.get("/sanctum/csrf-cookie").then(() => {
      console.log("inside csrf");

      axios.post(`/api/addInstructorProfile/${id}`, fData).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_profile",1);
          //   setSuccess(res.data.message);
          navigate("/");
          console.log('success');
        } else {
          console.log("inside else");
          setCreateProfile({
            ...createProfile,
            error_list: res.data.validation_errors,
          });
          console.log(createProfile.error_list);
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
            <Form.Item>
              <label>Gender:</label>
              <select
                style={{ width: "50%", padding: 10, marginLeft: "3.7em", borderRadius: "50px" }}
                name="sex"
                onChange={handleInput}
                value={createProfile.sex}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
          <span style={{color:"red"}}>{createProfile.error_list.sex}</span>
            </Form.Item>
          </Col>

          <Col>
            <Divider>Academic</Divider>
            <Form.Item>
              <select
                placeholder="Select an Institution"
                style={{ padding: 10, width: "75%", borderRadius: "80px" }}
                name="institution_id"
                onChange={handleInput}
                value={createProfile.institution_id}
              >
                <option value="">Select Institution</option>
                {institutionList.map((item) => {
                  return (
                    <option value={item.id} key={item.id}>
                      {item.institutionName}
                    </option>
                  );
                })}
              </select>
              
            </Form.Item>
          </Col>

          <Col>
            <Form.Item label="Major" style={{ width: "76.5%", borderRadius: "50px" }}>
              <Input
                style={{ marginLeft: "0.2em" }}
                name="major"
                onChange={handleInput}
                value={createProfile.major}
              />
          <span style={{color:"red"}}>{createProfile.error_list.major}</span>

            </Form.Item>
          </Col>

          <Col>
            <Form.Item label="GPA" style={{ width: "76.5%", borderRadius: "50px" }}>
              <Input
                style={{ marginLeft: "0.2em" }}
                name="GPA"
                onChange={handleInput}
                value={createProfile.GPA}
              />
          <span style={{color:"red"}}>{createProfile.error_list.GPA}</span>

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

export default InstructorCreateProfile;
