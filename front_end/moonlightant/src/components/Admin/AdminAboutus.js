import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Layout } from "antd";
import { Form, Input, Button, Modal, Upload } from "antd";
import { Select } from "antd";
import { Avatar, Image } from "antd";
import { UserOutlined, EditOutlined, InboxOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import '/App.css';

const { Option } = Select;

function AdminAboutus() {
  const [success, setSuccess] = useState();
  const [editAboutus, setEditAboutus] = useState({
    ourVision: "",
    ourVisionDetail: "",
    ourMission: "",
    ourMissionDetail: "",
    ourTeam: "",
    ourTeamDetail: "",
    TitleOne: "",
    TitleOneDetail: "",
    TitleTwo: "",
    TitleTwoDetail: "",
    TitleThree: "",
    TitleThreeDetail: "",
    image: "",
    TitleOneImage: "",
    TitleTwoImage: "",
    TitleThreeImage: "",
    error_list: [],
  });

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const onOpenModal = (id) => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const onOpenModal1 = (id) => setOpen1(true);
  const onCloseModal1 = () => setOpen1(false);

  const onOpenModal2 = (id) => setOpen2(true);
  const onCloseModal2 = () => setOpen2(false);

  const onOpenModal3 = (id) => setOpen3(true);
  const onCloseModal3 = () => setOpen3(false);

  const id = localStorage.getItem("auth_id");

  //
  useEffect(() => {
    axios.get(`/api/aboutus`).then((res) => {
      if (res.data.status === 200) {
        setEditAboutus(res.data.aboutus[0]);
      } else {
        console.log("couldnt retrieve data");
      }
    });
  }, []);

  const navigate = useNavigate();

  const handleInput = (e) => {
    // e.persist();
    setEditAboutus({ ...editAboutus, [e.target.name]: e.target.value });
  };

  const updateAboutus = (e) => {
    console.log(editAboutus.TitleOne)
    // e.preventDefault();
    const fData = new FormData();
    const data ={
      ourVision:editAboutus.ourVision,
      ourVisionDetail:editAboutus.ourVisionDetail,
      ourMission:editAboutus.ourMission,
      ourMissionDetail:editAboutus.ourMissionDetail,
      ourTeam:editAboutus.ourTeam,
      ourTeamDetail:editAboutus.ourTeamDetail,
      TitleOne:editAboutus.TitleOne,
      TitleOneDetail:editAboutus.TitleOneDetail,
      TitleTwo:editAboutus.TitleTwo,
      TitleTwoDetail:editAboutus.TitleTwoDetail,
      TitleThree:editAboutus.TitleThree,
      TitleThreeDetail:editAboutus.TitleThreeDetail
    }
    fData.append("ourVision", editAboutus.ourVision);
    fData.append("ourVisionDetail", editAboutus.ourVisionDetail);
    fData.append("ourMission", editAboutus.ourMission);
    fData.append("ourMissionDetail", editAboutus.ourMissionDetail);
    fData.append("ourTeam", editAboutus.ourTeam);
    fData.append("ourTeamDetail", editAboutus.ourTeamDetail);
    fData.append("TitleOne", editAboutus.TitleOne);
    fData.append("TitleOneDetail", editAboutus.TitleOneDetail);
    fData.append("TitleTwo", editAboutus.TitleTwo);
    fData.append("TitleTwoDetail", editAboutus.TitleTwoDetail);
    fData.append("TitleThree", editAboutus.TitleThree);
    fData.append("TitleThreeDetail", editAboutus.TitleThreeDetail);
    const id = 1;
    axios.get("/sanctum/csrf-cookie").then((res) => {
      console.log("inside csrf");

      axios.put(`/api/editaboutus/${id}`, data).then((res) => {
        if (res.data.status === 200) {
          setSuccess("Your aboutus has been updated Succcessfully");
          axios.get(`/api/aboutus`).then((res) => {
            if (res.data.status === 200) {
              setEditAboutus(res.data.aboutus[0]);
              console.log(res.data.aboutus[0]);
              console.log(editAboutus);
            } else {
              console.log("couldnt retrieve data");
            }
          });
          console.log(success);
        } else {
          console.log("inside else");
          setEditAboutus({
            ...editAboutus,
            error_list: res.data.validation_errors,
          });
          console.log(res.data.validation_errors);
        }
      });
    }, []);
  };

  const updateTitleOneImageAboutus = (e) => {
    console.log(editAboutus.TitleOneImage);
    // e.preventDefault();
    const fData = new FormData();

    fData.append("TitleOneImage", editAboutus.TitleOneImage);
    const id = 1;
    axios.get("/sanctum/csrf-cookie").then((res) => {
      console.log("inside csrf");

      axios.post(`/api/editTitleOneImageAboutus/${id}`, fData).then((res) => {
        if (res.data.status === 200) {
          setOpen1(false);
          axios.get(`/api/aboutus`).then((res) => {
            if (res.data.status === 200) {
              setEditAboutus(res.data.aboutus[0]);
            } else {
              console.log("couldnt retrieve data");
            }
          });
          console.log("Your TitleOne image has been updated Succcessfully");
        } else {
          console.log("inside else");
          setEditAboutus({
            ...editAboutus,
            error_list: res.data.validation_errors,
          });
          console.log(res.data.validation_errors);
        }
      });
    }, []);
  };

  const updateTitleTwoImageAboutus = (e) => {
    console.log("update");
    // e.preventDefault();
    const fData = new FormData();

    fData.append("TitleTwoImage", editAboutus.TitleTwoImage);
    const id = 1;
    axios.get("/sanctum/csrf-cookie").then((res) => {
      console.log("inside csrf");

      axios.post(`/api/editTitleTwoImageAboutus/${id}`, fData).then((res) => {
        if (res.data.status === 200) {
          setOpen2(false);
          console.log("Your TitleTwo image has been updated Succcessfully");
            axios.get(`/api/aboutus`).then((res) => {
              if (res.data.status === 200) {
                setEditAboutus(res.data.aboutus[0]);
                 console.log(res.data.aboutus[0]);
                console.log(editAboutus);
              } else {
                console.log("couldnt retrieve data");
              }
            });
        } else {
          console.log("inside else");
          setEditAboutus({
            ...editAboutus,
            error_list: res.data.validation_errors,
          });
          console.log(res.data.validation_errors);
        }
      });
    }, []);
  };

  const updateTitleThreeImageAboutus = (e) => {
    console.log("update");
    // e.preventDefault();
    const fData = new FormData();

    fData.append("TitleThreeImage", editAboutus.TitleThreeImage);
    const id = 1;
    axios.get("/sanctum/csrf-cookie").then((res) => {
      console.log("inside csrf");

      axios.post(`/api/editTitleThreeImageAboutus/${id}`, fData).then((res) => {
        if (res.data.status === 200) {
          setOpen3(false);
          axios.get(`/api/aboutus`).then((res) => {
            if (res.data.status === 200) {
              setEditAboutus(res.data.aboutus[0]);
            } else {
              console.log("couldnt retrieve data");
            }
          });
          console.log("Your TitleThree image has been updated Succcessfully");
        } else {
          console.log("inside else");
          setEditAboutus({
            ...editAboutus,
            error_list: res.data.validation_errors,
          });
          console.log(res.data.validation_errors);
        }
      });
    }, []);
  };
  const updateBackgroundImageAboutus = (e) => {
    console.log(editAboutus.image);
    // e.preventDefault();
    const id = 1;
    const fData = new FormData();
    console.log(fData);
    fData.append("image", editAboutus.image);
    
    console.log(fData.image);
    axios.get("/sanctum/csrf-cookie").then((res) => {
      console.log("inside csrf");

      axios.post(`/api/editBackgroundAboutus/${id}`, fData).then((res) => {
        if (res.data.status === 200) {
          setOpen(false);
          axios.get(`/api/aboutus`).then((res) => {
            if (res.data.status === 200) {
              setEditAboutus(res.data.aboutus[0]);
            } else {
              console.log("couldnt retrieve data");
            }
          });
          console.log("Your Background image has been updated Succcessfully");
        } else {
          console.log("inside else");
          setEditAboutus({
            ...editAboutus,
            error_list: res.data.validation_errors,
          });
          console.log(res.data.validation_errors);
        }
      });
    }, []);
  };
  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };
  <Avatar icon={<UserOutlined />} />;
  return (
    <>
      <Modal visible={open} onOk={()=>updateBackgroundImageAboutus()} onCancel={onCloseModal} center>
        <Form >
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
                setEditAboutus({
                  ...editAboutus,
                  image: e.fileList[0].originFileObj,
                })
              }
              style={{ width: "100%" }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Upload.Dragger>
          </Form.Item>
          {/* <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Update Background Image
            </Button>
          </Form.Item> */}
        </Form>
      </Modal>
      <Modal visible={open1} onOk={()=>updateTitleOneImageAboutus()} onCancel={onCloseModal1} center>
        <Form >
          <Form.Item
            name="dragger"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload.Dragger
              name="TitleOneImage"
              type="file"
              multiple={false}
              onChange={(e) =>
                setEditAboutus({
                  ...editAboutus,
                  TitleOneImage: e.fileList[0].originFileObj,
                })
              }
              style={{ width: "100%" }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Upload.Dragger>
          </Form.Item>
          
        </Form>
      </Modal>
      <Modal visible={open2} onOk={()=>updateTitleTwoImageAboutus()} onCancel={onCloseModal2} center>
        <Form>
          <Form.Item
            name="dragger"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload.Dragger
              name="TitleTwoImage"
              type="file"
              multiple={false}
              onChange={(e) =>
                setEditAboutus({
                  ...editAboutus,
                  TitleTwoImage: e.fileList[0].originFileObj,
                })
              }
              style={{ width: "100%" }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Upload.Dragger>
          </Form.Item>
          
        </Form>
      </Modal>
      <Modal visible={open3} onOk={()=>updateTitleThreeImageAboutus()} onCancel={onCloseModal3} center>
        <Form >
          <Form.Item
            // name="dragger"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload.Dragger
              name="TitleThreeImage"
              type="file"
              multiple={false}
              onChange={(e) =>
                setEditAboutus({
                  ...editAboutus,
                  TitleThreeImage: e.fileList[0].originFileObj,
                })
              }
              style={{ width: "100%" }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form>
      </Modal>
      <Row
        className="row1"
        style={{ backgroundColor: "#f0f2f5", margin: "3em" }}
      >
        <span style={{color:"green"}}>{success}</span>

        <Col
          className="row3"
          span={20}
          style={{
            marginRight: "-10em",
            marginLeft: "0.5em",
            paddingRight: "1em",
            textAlign: "left",
          }}
        >
          <Form
            onFinish={()=>updateAboutus()}
            style={{
              background: "#ffffff",
              marginTop: "2rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              textAlign: "left",
              marginBottom: "2rem",
              borderRadius: "1rem",
            }}
          >
            <Divider>Edit About Us</Divider>

            <Col>
              <div className="image1">
                <Image
                  width={250}
                  height={250}
                  src={
                    "http://localhost:8000/uploads/AboutusPicture/" +
                    editAboutus.image
                  }
                  name="image"
                  style={{
                    borderRadius: "100%",
                    alignContent: "left",
                    marginTop: "0rem",
                  }}
                />
              </div>
              <Button
                type="text"
                style={{
                  marginLeft: "0rem",
                  marginTop: "-4rem",
                }}
                icon={
                  <EditOutlined
                    style={{ cursor: "pointer" }}
                    onClick={() => onOpenModal(editAboutus.id)}
                  />
                }
              />
              <Form.Item
                label="Our Vision"
                style={{ width: "77%", borderRadius: "50px" }}
              >
                <Input
                  name="ourVision"
                  onChange={handleInput}
                  value={editAboutus.ourVision}
                />
              </Form.Item>
              <Form.Item
                label="Our Vision Detail"
                style={{ width: "77%", borderRadius: "50px" }}
              >
                <Input.TextArea
                  name="ourVisionDetail"
                  onChange={handleInput}
                  value={editAboutus.ourVisionDetail}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label="Our Mission"
                style={{ width: "76.5%", borderRadius: "50px" }}
              >
                <Input
                  style={{ marginLeft: "0.2em" }}
                  name="ourMission"
                  onChange={handleInput}
                  value={editAboutus.ourMission}
                />
              </Form.Item>
              <Form.Item
                label="Our Mission Detail"
                style={{ width: "76.5%", borderRadius: "50px" }}
              >
                <Input.TextArea
                  style={{ marginLeft: "0.2em" }}
                  name="ourMissionDetail"
                  onChange={handleInput}
                  value={editAboutus.ourMissionDetail}
                />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item
                label="Our Team"
                style={{ width: "76.5%", borderRadius: "50px" }}
              >
                <Input
                  style={{ marginLeft: "0.2em" }}
                  name="ourTeam"
                  onChange={handleInput}
                  value={editAboutus.ourTeam} //change this
                />
              </Form.Item>
              <Form.Item
                label="Our Team Detail"
                style={{ width: "76.5%", borderRadius: "50px" }}
              >
                <Input.TextArea
                  style={{ marginLeft: "0.2em" }}
                  name="ourTeamDetail"
                  onChange={handleInput}
                  value={editAboutus.ourTeamDetail} //change this
                />
              </Form.Item>
            </Col>

            <Col>
              
                  <div className="image1">
                <Image
                  width={250}
                  height={250}
                  src={
                    "http://localhost:8000/uploads/AboutusPicture/" +
                    editAboutus.TitleOneImage
                  }
                  name="image"
                  style={{
                    borderRadius: "100%",
                    alignContent: "left",
                    marginTop: "0rem",
                  }}
                />
              </div>
              <Button
                type="text"
                style={{
                  marginLeft: "0rem",
                  marginTop: "-4rem",
                }}
                icon={
                  <EditOutlined
                    style={{ cursor: "pointer" }}
                    onClick={() => onOpenModal1(editAboutus.id)}
                  />
                }
              />
              <Form.Item
                label="Title One"
                style={{ width: "76.5%", borderRadius: "50px" }}
              >
                <Input
                  style={{ marginLeft: "0.2em" }}
                  name="TitleOne"
                  onChange={handleInput}
                  value={editAboutus.TitleOne} //change this
                />
              </Form.Item>
              <Form.Item
                label="Title One Detail"
                style={{ width: "76.5%", borderRadius: "50px" }}
              >
                <Input.TextArea
                  style={{ marginLeft: "0.2em" }}
                  name="TitleOneDetail"
                  onChange={handleInput}
                  value={editAboutus.TitleOneDetail} //change this
                />
              </Form.Item>
              
            </Col>
            <Col>
            <div className="image1">
                <Image
                  width={250}
                  height={250}
                  src={
                    "http://localhost:8000/uploads/AboutusPicture/" +
                    editAboutus.TitleTwoImage
                  }
                  name="TitleTwoImage"
                  style={{
                    borderRadius: "100%",
                    alignContent: "left",
                    marginTop: "0rem",
                  }}
                />
              </div>
              <Button
                type="text"
                style={{
                  marginLeft: "0rem",
                  marginTop: "-4rem",
                }}
                icon={
                  <EditOutlined
                    style={{ cursor: "pointer" }}
                    onClick={() => onOpenModal2(editAboutus.id)}
                  />
                }
              />
              <Form.Item
                label="Title Two"
                style={{ width: "76.5%", borderRadius: "50px" }}
              >
                <Input
                  style={{ marginLeft: "0.2em" }}
                  name="TitleTwo"
                  onChange={handleInput}
                  value={editAboutus.TitleTwo} //change this
                />
              </Form.Item>
              <Form.Item
                label="Title Two Detail"
                style={{ width: "76.5%", borderRadius: "50px" }}
              >
                <Input.TextArea
                  style={{ marginLeft: "0.2em" }}
                  name="TitleTwoDetail"
                  onChange={handleInput}
                  value={editAboutus.TitleTwoDetail} //change this
                />
              </Form.Item>
            </Col>
            <Col>
            <div className="image1">
                <Image
                  width={250}
                  height={250}
                  src={
                    "http://localhost:8000/uploads/AboutusPicture/" +
                    editAboutus.TitleThreeImage
                  }
                  name="TitleThreeImage"
                  style={{
                    borderRadius: "100%",
                    alignContent: "left",
                    marginTop: "0rem",
                  }}
                />
              </div>
              <Button
                type="text"
                style={{
                  marginLeft: "0rem",
                  marginTop: "-4rem",
                }}
                icon={
                  <EditOutlined
                    style={{ cursor: "pointer" }}
                    onClick={() => onOpenModal3(editAboutus.id)}
                  />
                }
              />
              <Form.Item
                label="Title Three"
                style={{ width: "76.5%", borderRadius: "50px" }}
              >
                <Input
                  style={{ marginLeft: "0.2em" }}
                  name="TitleThree"
                  onChange={handleInput}
                  value={editAboutus.TitleThree} //change this
                />
              </Form.Item>
              <Form.Item
                label="Title Three Detail"
                style={{ width: "76.5%", borderRadius: "50px" }}
              >
                <Input.TextArea
                  style={{ marginLeft: "0.2em" }}
                  name="TitleThreeDetail"
                  onChange={handleInput}
                  value={editAboutus.TitleThreeDetail} //change this
                />
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
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default AdminAboutus;
