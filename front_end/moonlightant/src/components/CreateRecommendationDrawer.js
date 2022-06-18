import React, { useState, useEffect } from "react";
import { Drawer, Button, Col, Popover, Card, message } from "antd";
import { Form, Input, Select } from "antd";
import { UploadOutlined, InboxOutlined, SendOutlined } from "@ant-design/icons";
import "../styles/newscreate.css";
import axios from "axios";

const CreateRecommendationDrawer = () => {
  const [visible, setVisible] = useState(false);
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const [studentList, setStudentList] = useState([]);
  const [senderId, setSenderId] = useState();
  const [institutionId, setInstitutionId] = useState();
  const [recomendation, setRecomendation] = useState({
    recomendationDetail: "",
    sender_id: "",
    error_list: [],
    student_id: "",
  });

  const id = localStorage.getItem("auth_id");
  useEffect(() => {
    axios.get(`/api/getInstructorInstitutionId/${id}`).then((res) => {
      if (res.data.status === 200) {
        setInstitutionId(res.data.institution_id);
        setSenderId(res.data.sender_id[0].id);
        console.log(institutionId);
        axios.get(`/api/filterStudent/${institutionId}`).then((res) => {
            if (res.data.status === 200) {
              setStudentList(res.data.student);
              console.log(res.data.student);
            }
          });
      }
    });
  }, [institutionId]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const recomend = (e) => {
    const data = {
      recomendationDetail: recomendation.recomendationDetail,
      sender_id: id,
      student_id: recomendation.student_id,
    };

    axios.get("/sanctum/csrf-cookie").then((res) => {
      console.log("inside csrf");

      axios.post(`/api/sendRecommendation`, data).then((res) => {
        if (res.data.status === 200) {
          message.success("Your recommendation is successful");
        } else {
          console.log("inside else");
          setRecomendation({
            ...recomendation,
            error_list: res.data.validation_errors,
          });
          console.log(res.data.validation_errors);
        }
      });
    }, []);
    setRecomendation({ ...recomendation, recomendationDetail: "" });
  };
  let options = studentList.map((item) => {
    return { value: item.id, label: item.name, key: item.id };
  });

  const handleInputStudent = (e) => {
    // e.persist();
    console.log(e);
    setRecomendation({ student_id: e });
  };
  const handleInput = (e) => {
    // e.persist();
    setRecomendation({ ...recomendation, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Popover content="Send Recommendation">
        <Button
          type="primary"
          style={{
            position: "fixed",
            bottom: 30,
          }}
          icon={<UploadOutlined />}
          onClick={showDrawer}
          shape="circle"
          size="large"
          className="openButton"
        ></Button>
      </Popover>

      <Drawer
        title="Send Recommendation"
        placement="left"
        onClose={onClose}
        visible={visible}
      >
        <Card
          bordered={true}
          className="cards"
          style={{
            width: 320,
            position: "fixed",
            textAlign: "left",
            marginTop: 30,
            borderRadius: 10,
            marginRight: 10,
            marginLeft: 10,
          }}
        >
          <Form
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
            onFinish={recomend}
          >
            <Col>
              <Form.Item
                label="Recommendation"
                style={{ width: "50%", borderRadius: "50px",marginLeft:"-1rem" }}
              >
                <br/><br/>
                <Input.TextArea
                  autoSize={{ minRows: 2, maxRows: 4 }}
                  showCount
                  maxLength={200}
                  style={{marginLeft:"-7.1rem",marginRight:"-6rem"}}
                  cols={10}
                  name="recomendationDetail"
                  onChange={handleInput}
                  value={recomendation.recomendationDetail}
                />
                {/* <span style={{color:"red"}}>{editProfile.error_list.name}</span> */}
              </Form.Item>
            </Col>
            <Col>
              <Form.Item style={{marginLeft:"-1rem"}}label="Choose the Student">
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      ?.toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      ?.toLowerCase()
                      .localeCompare(optionB.children?.toLowerCase())
                  }
                  label="Choose a Student"
                  style={{ padding: 10, width: "250%", 
                  borderRadius: "80px",
                  marginTop:"1rem",
                  marginLeft:"-8.4rem",
                  marginRight:"-7rem"
                 }}
                  name="student_id"
                  onChange={handleInputStudent}
                  value={recomendation.student_id}
                  options={options}
                />
              </Form.Item>
            </Col>
            <Form.Item>
              <Button
                style={{ borderRadius: "1rem" }}
                type="primary"
                htmlType="submit"
              >
                Send recommendation
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Drawer>
    </>
  );
};

export default CreateRecommendationDrawer;
