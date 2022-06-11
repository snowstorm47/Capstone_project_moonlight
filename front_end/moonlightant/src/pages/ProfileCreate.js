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

function CreateProfile() {
  const [institutionList, setInstitutionList] = useState([]);
  const [collegeList, setCollegeList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [success, setSuccess] = useState();
  const [createProfile, setCreateProfile] = useState({
    phoneNumber: "",
    sex: "",
    institution_id: "",
    college_id: "",
    department_id: "",
    GPA: "",
    major: "",
    startDateClass: "",
    endDateClass: "",
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
        setCollegeList(res.data.college);
        setDepartmentList(res.data.department);
        console.log(institutionList);
      }
    });
  }, []);

  const id = localStorage.getItem("auth_id");

  const navigate = useNavigate();

  const handleInput = (e) => {
    // e.persist();

    setCreateProfile({ ...createProfile, [e.target.name]: e.target.value });
  };

  const Profile = (e) => {
    console.log("create");
    // e.preventDefault();
    const fData = new FormData();
    fData.append("image", createProfile.image);
    fData.append("phoneNumber", createProfile.phoneNumber);
    fData.append("sex", createProfile.sex);
    fData.append("major", createProfile.major);
    fData.append("GPA", createProfile.GPA);
    fData.append("institution_id", createProfile.institution_id);
    fData.append("college_id", createProfile.college_id);
    fData.append("endDateClass", createProfile.endDateClass);
    fData.append("startDateClass", createProfile.startDateClass);
    fData.append("department_id", createProfile.department_id);

    const id = localStorage.getItem("auth_id");
    axios.get("/sanctum/csrf-cookie").then(() => {
      console.log("inside csrf");

      axios.post(`/api/addProfile/${id}`, fData).then((res) => {
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
            </Form.Item>
          </Col>

          <Col>
            <Space direction="vertical" size={12} style={{ padding: 10 }}>
              <label>Class start Date: </label>
              <input
                style={{ borderRadius: "80px", marginLeft: '1em'}}
                type="date"
                name="startDateClass"
                format={"m/d/Y"}
                onChange={handleInput}
                value={createProfile.startDateClass}
                className="form-control"
              />
              {/* <span>{createProfile.error_list.startDateClass}</span> */}

              <label>Class end Date: </label>
              <input
                style={{ borderRadius: "80px", marginLeft: '1em', border: 'outset'}}
                type="date"
                name="endDateClass"
                format={"m/d/Y"}
                onChange={handleInput}
                value={createProfile.endDateClass}
                className="form-control"
              />
              {/* <span>{createProfile.error_list.endDateClass}</span> */}
            </Space>
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
            <Form.Item>
              <select
                placeholder="Select a College"
                style={{ padding: 10, width: "75%", borderRadius: "80px" }}
                name="college_id"
                onChange={handleInput}
                value={createProfile.college_id}
              >
                <option value="">Select College</option>

                {collegeList.map((item) => {
                  return (
                    <option value={item.id} key={item.id}>
                      {item.collegeName}
                    </option>
                  );
                })}
              </select>
            </Form.Item>
          </Col>

          <Col>
            <Form.Item>
              <select
                placeholder="Select a Department"
                style={{ padding: 10, width: "75%", borderRadius: "80px"}}
                name="department_id"
                onChange={handleInput}
                value={createProfile.department_id}
              >
                <option value="">Select Department</option>

                {departmentList.map((item) => {
                  return (
                    <option value={item.id} key={item.id}>
                      {item.departmentName}
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

export default CreateProfile;
