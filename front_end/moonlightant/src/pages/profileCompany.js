import React, { useState, useEffect } from "react";
import { Row, Col} from "antd";
import { Form, Input, Button } from "antd";
import { Select } from "antd";
import { Avatar,message} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditHiringProfilePicture from "../components/EditHiringProfilePicture";
import '../App.css';


const { Option } = Select;

function ProfilePageCompany() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

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
          message.success('Update Profile')
        } else {
          console.log("inside else");
          setEditProfile({
            ...editProfile,
            error_list: res.data.validation_errors,
          });
          message.error('Profile Update Failed')
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
          <EditHiringProfilePicture />
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
        <Form 
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
        onFinish={updateProfile}>
          <Divider>Edit Profile Page</Divider>

          <Col>
            <Form.Item
              label="Company Name"
              style={{ width: "77%", borderRadius: "50px" }}
            >
              <Input
                name="name"
                onChange={handleInput}
                value={editProfile.name}
              />
            <span style={{color:"red"}}>{editProfile.error_list?.name}</span>

            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              label="Representative Name"
              style={{ width: "77%", borderRadius: "50px" }}
            >
              <Input
                name="representative"
                onChange={handleInput}
                value={editProfile.representative}
              />
            <span style={{color:"red"}}>{editProfile.error_list?.representative}</span>
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              label="Representative Email"
              style={{ width: "64%" }}
              rules={[
                {
                  type: "email",
                },
              ]}
            >
              <Input
                name="representativeEmail"
                onChange={handleInput}
                value={editProfile.representativeEmail}
                style={{ marginLeft: "4.6em" }}
              />
            <span style={{color:"red"}}>{editProfile.error_list?.representativeEmail}</span>
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              label="Company Phone Number"
              style={{ width: "76.5%", borderRadius: "50px" }}
            >
              <Input
                style={{ marginLeft: "0.2em" }}
                name="phoneNumber"
                onChange={handleInput}
                value={editProfile.phoneNumber}
              />
            <span style={{color:"red"}}>{editProfile.error_list?.phoneNumber}</span>
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              label="P.O. Box"
              style={{ width: "76.5%", borderRadius: "50px" }}
            >
              <Input
                style={{ marginLeft: "0.2em" }}
                name="poBox"
                onChange={handleInput}
                value={editProfile.poBox} //change this
              />
            <span style={{color:"red"}}>{editProfile.error_list?.poBox}</span>
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              label="Location"
              style={{ width: "76.5%", borderRadius: "50px" }}
            >
              <Input
                style={{ marginLeft: "0.2em" }}
                name="location"
                onChange={handleInput}
                value={editProfile.location} //change this
              />
            <span style={{color:"red"}}>{editProfile.error_list?.location}</span>
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
                value={editProfile.description} //change this
              />
            <span style={{color:"red"}}>{editProfile.error_list?.description}</span>
            </Form.Item>
          </Col>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                borderRadius: "80px",
                marginLeft: "0.7em",
                marginTop: "1em",
              }}
            >
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default ProfilePageCompany;
