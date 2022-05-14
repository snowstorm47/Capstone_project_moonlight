import React, { useState, useEffect } from "react";
import { Row, Col, Layout } from "antd";
import { Form, Input, Button, Typography } from "antd";
import { Select } from "antd";
import { DatePicker, Space,List } from "antd";
import { Avatar, Image } from "antd";
import { UserOutlined, CloseOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddSkill from "../components/AddSkill";
import AddEmploymentHistory from "../components/AddEmploymentHistory";

// import '/App.css';

const { Option } = Select;

const onFinish = (values) => {
  console.log("Received values of form:", values);
};

function ProfilePageP() {
  const [visible, setVisible] = useState(true);

  const [institutionList, setInstitutionList] = useState([]);
  const [employmentList, setemploymentList] = useState([]);
  const [collegeList, setCollegeList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [success, setSuccess] = useState();
  const [skillList, setSkillList] = useState([]);
  const [editProfile, setEditProfile] = useState({
    phoneNumber: "",
    name: "",
    position: "",
    startDate: "",
    endDate: "",
    sex: "",
    institution: "",
    // college:"",
    // department:"",
    companyName: "",
    startDateClass: "",
    endDateClass: "",
    skill: [],
    employmentHistory: [],
    newSkill:"",
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

  //
  useEffect(() => {
    // axios.get('/sanctum/csrf-cookie').then(res => {
    axios.get(`/api/profile/${id}`).then((res) => {
      if (res.data.status === 200) {
        setEditProfile(res.data);
        setSkillList(res.data.skill);
        // setemploymentList(res.data.employmentHistory);
        console.log(skillList);
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

  const deleteSkill = (id,e) => {
    axios.get("/sanctum/csrf-cookie").then((res) => {
        console.log("inside csrf");
  
        axios.delete(`/api/deleteSkill/${id}`).then((res) => {
          if (res.data.status === 200) {
            console.log("skill deleted");
          } else {
            console.log("skill not deleted");
          }
        });
      }, []);
  };

  const updateProfile = (e) => {
    console.log("update");
    // e.preventDefault();

    const data = {
      phoneNumber: editProfile.phoneNumber,
      sex: editProfile.sex,
      position: editProfile.position,
      name: editProfile.name,
      startDate: editProfile.startDate,
      endDate: editProfile.endDate,
      startDateClass: editProfile.startDateClass,
      endDateClass: editProfile.endDateClass,
      institution: editProfile.institution,
      //   department: editProfile.department,
      //   college: editProfile.college,
      companyName: editProfile.companyName,
    };
    const id = localStorage.getItem("auth_id");
    axios.get("/sanctum/csrf-cookie").then((res) => {
      console.log("inside csrf");

      axios.put(`/api/updateProfile/${id}`, data).then((res) => {
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
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                // size={100}
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
          <Form onFinish={updateProfile}>
          <Divider>Profile Page</Divider>
          
          <Col>
            <Form.Item label="Full Name">
              <Input
                name="name"
                onChange={handleInput}
                value={editProfile.name}
              />
            </Form.Item>
          </Col>

          {/* <Col> 
                    <Form.Item label="Email" style={{width: '64%'}} rules={[
                        { 
                        type: 'email'
                        }
                        ]}>
                        <Input style={{marginLeft: '4.6em'}}/>
                    </Form.Item>
                </Col> */}

          <Col>
            <Form.Item label="Phone Number" style={{ width: "76.5%" }}>
              <Input
                style={{ marginLeft: "0.2em" }}
                name="phoneNumber"
                onChange={handleInput}
                value={editProfile.phoneNumber}
              />
            </Form.Item>
          </Col>

          <Col>
            <label>Gender:</label>
            <Select
              defaultValue=" "
              style={{ width: 120, padding: 10, marginLeft: "3.7em" }}
              name="sex"
              onChange={handleInput}
              value={editProfile.sex}
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Col>

          <Col>
            <Divider>Academic</Divider>
            <Select
              placeholder="Select an Institution"
              style={{ padding: 10, width: "75%", borderRadius: "80px" }}
              name="institutionName"
              onChange={handleInput}
              value={editProfile.institution}
            >
              {institutionList.map((item) => {
                return (
                  <Option value={item.id} key={item.id}>
                    {item.institutionName}
                  </Option>
                );
              })}
            </Select>
          </Col>

          <Col>
            <Select
              placeholder="Select a College"
              style={{ padding: 10, width: "75%", borderRadius: "80px" }}
              name="collegeName"
              onChange={handleInput}
              //   value={editProfile.college}
            >
              {collegeList.map((item) => {
                return (
                  <Option value={item.id} key={item.id}>
                    {item.collegeName}
                  </Option>
                );
              })}
            </Select>
          </Col>

          <Col>
            <Select
              placeholder="Select a Department"
              style={{ padding: 10, width: "75%", borderRadius: "80px" }}
              name="departmentName"
              onChange={handleInput}
              //   value={editProfile.department}
            >
              {departmentList.map((item) => {
                return (
                  <Option value={item.id} key={item.id}>
                    {item.departmentName}
                  </Option>
                );
              })}
            </Select>
          </Col>

          <Col>
            <Space direction="vertical" size={12} style={{ padding: 10 }}>
              {/* <Form.Item
                name="startDateClass"
                onChange={handleInput}
                value={editProfile.startDateClass}
                >
              <DatePicker/>
              </Form.Item>
              <Form.Item
              name="endDateClass"
              onChange={handleInput}
              value={editProfile.endDateClass}
              >
              <DatePicker/>
              </Form.Item> */}
              <label>Start Date: </label>
              <input
                type="date"
                name="startDateClass"
                format={"m/d/Y"}
                onChange={handleInput}
                value={editProfile.startDateClass}
                className="form-control"
              />
              {/* <span>{editProfile.error_list.startDateClass}</span> */}

              <label>End Date: </label>
              <input
                type="date"
                name="endDateClass"
                format={"m/d/Y"}
                onChange={handleInput}
                value={editProfile.endDateClass}
                className="form-control"
              />
              {/* <span>{editProfile.error_list.endDateClass}</span> */}
            </Space>
          </Col>

          <Divider>Skills</Divider>
          <Col>
            
            {skillList.map((item) => (
					<button
                    key={item.id}
                    value={item.skill}
						style={{
							color: "white",
							borderRadius: 100,
							border: 0,
							margin: 2,
							backgroundColor: "#0080ff",
						}}
					>
						{item.skill}
                        
                        <CloseOutlined size="2px"/>
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
              marginBottom:"1em"
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
                description=
                {item.position}
                style={{
                  textAlign:"left"
                }}
              />
              <br/>
              <br/>
              <div
              style={{
                marginTop:"5em",
                marginRight:"9rem"
              }}
              >Start Date : {item.startDate}</div>
              <div
              style={{
                marginTop:"5em"
              }}
              >End Date : {item.endDate}</div>
              <List.Item
                actions={[
                  <a key="list-loadmore-edit">
                    <CheckOutlined />
                  </a>,
                  <a key="list-loadmore-more">
                    <CloseOutlined />
                  </a>,
                ]}
              ></List.Item>
            </List.Item>
          )}
        />
        ) : null}
          </Col>
          <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      </Form>
        </Col>
        
        
        <Col
          className="row2"
          span={9}
          style={{ margin: "0.5em", paddingLeft: "1.5em", paddingTop: "3em" }}
        >
          <Col>
        <Divider>Add Skill</Divider>
          <AddSkill/>
        </Col>
        <Col>
        <Divider>Add Employment History</Divider>
               <AddEmploymentHistory/>       
        </Col>
        </Col>
        
      </Row>
      
  );
}

export default ProfilePageP;
