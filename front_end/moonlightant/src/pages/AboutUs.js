import React ,{useState,useEffect} from "react";
// import Navbar from "../../../layouts/frontend/Navbar";
import { Button, Image, Row, Col, Divider, Typography } from "antd";
import { TeamOutlined, AimOutlined, BulbOutlined } from "@ant-design/icons";
import axios from "axios";
function AboutUs() {
  const { Text, Link, Title } = Typography;
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
    image:"",
    imageTitle:"",
    imageDetail:"",
    TitleOneImage:"",
    TitleTwoImage:"",
    TitleThreeImage:""
  });
  useEffect(() => {
    axios.get(`/api/aboutus`).then((res) => {
      if (res.data.status === 200) {
        setEditAboutus(res.data.aboutus[0]);
      } else {
        console.log("couldnt retrieve data");
      }
    });
  }, []);
  return (
    <div>
      {/* <Navbar /> */}
      <Row>
        <Row
          style={{
            backgroundImage:
            `url(
              "http://localhost:8000/uploads/AboutusPicture/${editAboutus.image}"
              
            )`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "300px",
            width: "80",
          }}
          name="image"
        >
          {/* <Col span={24}> */}
            <Col span={12}>
              
            </Col>
            <Col
              span={12}
              style={{ backgroundColor: "linear-gradient(to right,#cccccc ,#f2f2f2)", height:"100%"}}
              level={1}
            >
              <Title 
              style={{ 
                color: "#ffffff",
                opacity:1,
                  }} 
              level={1}>
                <br/>
                {editAboutus.imageTitle}
              </Title>
              <Title level={5} style={{ color: "#ffffff",opacity:1, textAlign: "left" , marginLeft:"30px" }}>
                {editAboutus.imageDetail}
              </Title>
            {/* </Col> */}
          </Col>
        </Row>
      </Row>

      <Row>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <br />
          <br />
          <TeamOutlined style={{ fontSize: "2em", color: "blue" }} />
          <br />
          {editAboutus.ourTeam}
          <br />
          <br />
          <Text type="secondary">
            {editAboutus.ourTeamDetail}
          </Text>
          {/* <Divider type="vertical"></Divider> */}
        </Col>
        <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <br />
          <br />
          <AimOutlined style={{ fontSize: "2em", color: "blue" }} />
          <br />
          {editAboutus.ourMission}
          <br />
          <br />
          <Text type="secondary">
            {editAboutus.ourMissionDetail}
          </Text>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <br />
          <br />
          <BulbOutlined style={{ fontSize: "2em", color: "blue" }} />
          <br />
          {editAboutus.ourVision}
          <br />
          <br />
          <Text type="secondary">
            {editAboutus.ourVisionDetail}
          </Text>
        </Col>
      </Row>

      <br />
      <br />
      <Divider orientation="left"></Divider>
      <br />
      <br />
      <Row>
        <Col span={12}>
          <img
            height="70%"
            width="50%"
            name="TitleOneImage"
            alt="title"
            src={
              "http://localhost:8000/uploads/AboutusPicture/" +
              editAboutus.TitleOneImage
            }
          />
        </Col>
        <Col span={12}>
          <br />
          <Title level={2}>{editAboutus.TitleOne}</Title>
          <Text type="secondary" style={{ textAlign: "left" }}>
            {editAboutus.TitleOneDetail}
          </Text>
        </Col>
      </Row>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Row>
        <Col span={12}>
          <br />
          <Title level={2}>{editAboutus.TitleTwo}</Title>
          <Text type="secondary" style={{ textAlign: "left" }}>
            {editAboutus.TitleTwoDetail}
          </Text>
        </Col>
        <Col span={12}>
          <img
            height="70%"
            width="30%"
            name="TitleTwoImage"
            src={
              "http://localhost:8000/uploads/AboutusPicture/" +
              editAboutus.TitleTwoImage
            }
          />
        </Col>
      </Row>
      <br />
      <br />
      <br />
      <br />
      <br />

      <Row>
        <Col span={12}>
          <img
            height="70%"
            width="50%"
            name="TitleThreeImage"
            src={
              "http://localhost:8000/uploads/AboutusPicture/" +
              editAboutus.TitleThreeImage
            }
          />
        </Col>
        <Col span={12}>
          <br />
          <Title level={2}>{editAboutus.TitleThree}</Title>
          <Text type="secondary" style={{ textAlign: "left" }}>
            {editAboutus.TitleThreeDetail}
          </Text>
        </Col>
      </Row>
    </div>
  );
}

export default AboutUs;
