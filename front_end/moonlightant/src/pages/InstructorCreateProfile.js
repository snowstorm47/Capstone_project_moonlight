import React, { useState, useEffect } from "react";
import { Card, Row, Col, Layout, InputNumber } from "antd";
import { Form, Input, Button, Upload } from "antd";
import { Select } from "antd";
import { DatePicker, Space, List, Modal } from "antd";
import { Avatar, Image } from "antd";
import { UserOutlined, CloseOutlined, InboxOutlined} from "@ant-design/icons";
import { Divider } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../App.css';
import illustration from "../assets/InstructorAccount.png";


// import '/App.css';

const { Option } = Select;

function InstructorCreateProfile() {
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
    experience: "",
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
    fData.append("experience", createProfile.experience);
    fData.append("college_id", createProfile.college_id);
    fData.append("department_id", createProfile.department_id);
    fData.append("GPA", createProfile.GPA);
    fData.append("verificationStatus", 0);
    fData.append("institution_id", createProfile.institution_id);
    fData.append("user_id", id);

    
    axios.get("/sanctum/csrf-cookie").then(() => {
      console.log("inside csrf");

      axios.post(`/api/addInstructorProfile/${id}`, fData).then((res) => {
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
    <Row style={{
      paddingTop: "2rem"
    }}>
      <Divider> Create Instructor Profile</Divider><br  />
      <Col span={16}
      style={{backgroundColor: "#ffffff", textAlign: "left",
        paddingRight: "2rem", paddingLeft:"1rem"
      }}>
        <Col>
          <div className={window.innerWidth<=500?"imageMob":"image"}>
            <img src={illustration} style={{paddingLeft:"10em", width: "150%"}} className="illustration" alt="" />
          </div>
        </Col>
        <Col>
        <Card bordered={false} className="homeCard" style={{width: "100%"}}>
								<h1 style={{ color: "black", fontSize: "2em" }}>
									Create instructor profile here
								</h1>
								<span>
									This page is to create an instructors user profile. An instructor is able to recommend students, send posts and send notifications too.   
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
              </Form.Item>
          
        </Row>
        <Row>
          <Form.Item>
           <label>Gender:
            <select
              style={{ marginLeft:"1em", borderRadius: "50px" }}
                name="sex"
                onChange={handleInput}
                value={createProfile.sex}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
          </Form.Item>          
        </Row>
        <Row>
          <Space direction="vertical" size={12}>
            <label>Class start Date: 
            <input
              style={{ borderRadius: "80px", marginLeft: '1em'}}
              type="date"
              name="startDateClass"
              format={"m/d/Y"}
              onChange={handleInput}
              value={createProfile.startDateClass}
              className="form-control"
            />
            </label>
            {/* <span>{createProfile.error_list.startDateClass}</span> */}

            <label>Class end Date: 
            <input
              style={{ borderRadius: "80px", marginLeft: '1em', border: 'outset'}}
              type="date"
              name="endDateClass"
              format={"m/d/Y"}
              onChange={handleInput}
              value={createProfile.endDateClass}
              className="form-control"
            />
            </label>
            {/* <span>{createProfile.error_list.endDateClass}</span> */}
          </Space>          
        </Row>
        <Row>
        <Divider style={{marginRight:"3em"}} orientation={"left"}>Academic</Divider>
          <Form.Item>
            <select
              placeholder="Select an Institution"
              style={{ padding: 8, borderRadius: "80px" }}
              name="institution_id"
              onChange={handleInput}
              value={createProfile.institution_id}
            >
            <option value="" style={{width: "120%"}}>Select Institution</option>
            {institutionList.map((item) => {
              return (
                <option value={item.id} key={item.id}>
                  {item.institutionName}
                </option>
              );
            })}
            </select>
          </Form.Item>
        </Row>
        <Row>
            <Form.Item>
              <select
                placeholder="Select a College"
                style={{ padding: 8, borderRadius: "80px" }}
                name="college_id"
                onChange={handleInput}
                value={createProfile.college_id}
              >
                <option value="" style={{width: "130%"}}>Select College</option>

                {collegeList.map((item) => {
                  return (
                    <option value={item.id} key={item.id}>
                      {item.collegeName}
                    </option>
                  );
                })}
              </select>
            </Form.Item>
        </Row>
        <Row>
           <Form.Item>
              <select
                placeholder="Select a Department"
                style={{ padding: 8, borderRadius: "80px"}}
                name="department_id"
                onChange={handleInput}
                value={createProfile.department_id}
              >
                <option value="" style={{width: "120%"}}>Select Department</option>

                {departmentList.map((item) => {
                  return (
                    <option value={item.id} key={item.id}>
                      {item.departmentName}
                    </option>
                  );
                })}
              </select>
            </Form.Item> 
        </Row>
        <Row>
        <Form.Item label="Experience" style={{ borderRadius: "50px" }}>
             <InputNumber
                style={{ marginLeft: "0.2em", width: "60%" }}
                name="experience"
                onChange={(e)=>{setCreateProfile({...createProfile,experience:e})}}
                value={createProfile.experience}
              />
            </Form.Item>
        </Row>
        <Row>
        <Form.Item label="GPA" style={{ borderRadius: "50px" }}>
             <Input
                style={{ marginLeft: "0.2em", width: "50%" }}
                name="GPA"
                onChange={handleInput}
                value={createProfile.GPA}
              />
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

export default InstructorCreateProfile;
