import React, { useState, useEffect } from "react";
import { Row, Col, Layout } from "antd";
import { Form, Input, Button, message } from "antd";
import { Select } from "antd";
import { DatePicker, Space, List, Modal } from "antd";
import { Avatar, Image } from "antd";
import { UserOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Divider ,Card} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddSkill from "../components/AddSkill";
import AddEmploymentHistory from "../components/AddEmploymentHistory";
import EditEmploymentHistory from "../components/EditEmploymentHistory";
import EditInstructorProfilePicture from "../components/EditInstructorProfilePicture";
import AddCertificate from "../components/AddCertificate";
// import '/App.css';

const { Option } = Select;

function ProfilePageInstructor() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleCertificate, setIsModalVisibleCertificate] = useState(false);
  const [idsCertificate, setIdsCertificate] = useState({ id: "" });

  const showModal = () => {
    setIsModalVisible(true);
  };

  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };
  const showModalCertificate = (id) => {
    setIsModalVisibleCertificate(true);
    setIdsCertificate({ id: id });
  };
  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
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
    institution_id: "",
    college_id: "",
    department_id: "",
    companyName: "",
    GPA:"",
    major:"",
    startDateClass: "",
    endDateClass: "",
    skill: [],
    employmentHistory: [],
    newSkill: "",
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
    axios.get(`/api/instructorprofile/${id}`).then((res) => {
      if (res.data.status === 200) {
        setEditProfile(res.data);
        setSkillList(res.data.skill);
      } else {
        console.log("couldnt retrieve data");
      }
    });
  }, []);

  const deleteCertificate = (id) => {
    axios.delete(`/api/deleteCertificate/${id}`).then((res) => {
      if (res.data.status === 200) {
        message.success("Certificate deleted");
		axios.get(`/api/profile/${id}`).then((res) => {
			if (res.data.status === 200) {
			  setEditProfile(res.data);
			  setSkillList(res.data.skill);
			} else {
			  console.log("couldnt retrieve data");
			}
		  });
      } else {
        message.error("Certificate not deleted");
      }
    });
  };

  const navigate = useNavigate();

  const handleInput = (e) => {
    // e.persist();

    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  };

  const deleteSkill = (id, e) => {
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

  const deleteEmploymentHistory = (id) => {
    axios.get("/sanctum/csrf-cookie").then((res) => {
      console.log("inside csrf");

      axios.delete(`/api/deleteEmployment/${id}`).then((res) => {
        if (res.data.status === 200) {
          console.log("employment deleted");
        } else {
          console.log("employment not deleted");
        }
      });
    }, []);
  };

  const updateProfile = (e) => {
    console.log("update");
    // e.preventDefault();
    console.log(editProfile.college_id);
    console.log(editProfile.sex);
    const data = {
      phoneNumber: editProfile.phoneNumber,
      sex: editProfile.sex,
      major: editProfile.major,
      name: editProfile.name,
      GPA: editProfile.GPA,
      institution_id: editProfile.institution_id,
    };
    const id = localStorage.getItem("auth_id");
    axios.get("/sanctum/csrf-cookie").then((res) => {
      console.log("inside csrf");

      axios.put(`/api/updateInstructorProfile/${id}`, data).then((res) => {
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
  const handleOkCertificate = (id) => {
    setIsModalVisibleCertificate(false);
    deleteCertificate(id);
  };

  const handleCancelCertificate = () => {
    setIsModalVisibleCertificate(false);
  };

  <Avatar icon={<UserOutlined />} />;
  return (
    <Row className="row1" style={{ margin: "3em", marginLeft: "0em" }}>
      <span>{success}</span>
      <Modal
        title="Delete Notification"
        visible={isModalVisibleCertificate}
        onOk={() => handleOkCertificate(idsCertificate.id)}
        onCancel={handleCancelCertificate}
      >
        Do You Want to Delete The Certificate
      </Modal>
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
          <EditInstructorProfilePicture/>
        </Col>
      </Col>

      <Col
        className="row3"
        span={9}
        style={{ margin: "0.5em", paddingRight: "1em", textAlign: "left" }}
      >
        <Form onFinish={updateProfile}>
          <Divider>Edit your Profile Page</Divider>

          <Col>
            <Form.Item label="Instructor Full Name" style={{width: "77%", borderRadius: "50px"}}>
              <Input
                
                name="name"
                onChange={handleInput}
                value={editProfile.name}
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
            <Form.Item>
              <label>Gender:</label>
              <select
                style={{ width: 120, padding: 10, marginLeft: "3.7em", borderRadius: "50px" }}
                name="sex"
                onChange={handleInput}
                value={editProfile.sex}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </Form.Item>
          </Col>

          <Col>
            <Form.Item label="Major" style={{ width: "76.5%", borderRadius: "50px" }}>
              <Input
                style={{ marginLeft: "0.2em" }}
                name="major"
                onChange={handleInput}
                value={editProfile.major}
              />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item label="GPA" style={{ width: "76.5%", borderRadius: "50px" }}>
              <Input
                style={{ marginLeft: "0.2em" }}
                name="GPA"
                onChange={handleInput}
                value={editProfile.GPA}
              />
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
                value={editProfile.institution_id}
              >
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

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ borderRadius: "80px", marginLeft: '0.7em', marginTop: '1em'}}>
              Submit
            </Button>
          </Form.Item>
        </Form>
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
              
              <Button
                type="text"
                onClick={() => deleteSkill(item.id)}
                icon={<CloseOutlined size="2px" />}
              />
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
                  <List.Item
                    actions={[
                      <Button
                        type="text"
                        key="list-loadmore-edit"
                        icon={<EditOutlined />}
                        onClick={showModal}
                      />,

                      <Button
                        type="text"
                        onClick={() => deleteEmploymentHistory(item.id)}
                        key="list-loadmore-more"
                        icon={<CloseOutlined />}
                      />,
                    ]}
                  ></List.Item>
                  <Modal
                    title="Edit Employment History"
                    visible={isModalVisible}
                    onCancel={handleCancel}
                  >
                    <EditEmploymentHistory parentToChild={item.id} />
                  </Modal>
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
                          <span style={{ marginTop: "2rem",marginLeft:"1rem", marginBottom:"-2rem"}}>
                            {item.description}
                          </span>
                        </>
                      }
                      actions={[
                        <Button
                          type="text"
                          onClick={() => showModalCertificate(item.id)}
                          key="list-loadmore-more"
                          icon={<CloseOutlined />}
                        />,
                      ]}
                    ></Card>
                  </List.Item>
                )}
              />
            ) : null}
          </Col>
      </Col>

      <Col
        className="row2"
        span={9}
        style={{ margin: "0.5em", paddingLeft: "1.5em", paddingTop: "3em" }}
      >
        <Col>
          <Divider>Add Skill</Divider>
          <AddSkill />
        </Col>
        <Col>
          <Divider>Add Employment History</Divider>
          <AddEmploymentHistory />
        </Col>
        <Col>
            <Divider>Certificates</Divider>
            <AddCertificate />
          </Col>
      </Col>
    </Row>
  );
}

export default ProfilePageInstructor;