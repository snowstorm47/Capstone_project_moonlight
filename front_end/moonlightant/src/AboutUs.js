import React from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import { Button, Image, Row, Col, Divider, Typography } from "antd";
import { TeamOutlined, AimOutlined, BulbOutlined } from "@ant-design/icons";
function AboutUs() {
  const { Text, Link, Title } = Typography;
  return (
    <div>
      <Navbar />
      <Row>
        <Row
          style={{
            backgroundImage:
              "url(" +
              "https://media-exp1.licdn.com/dms/image/C4D1BAQG5C_yM6QOYZw/company-background_10000/0/1624099256683?e=2147483647&v=beta&t=UNmK8vR8Tmah78d8Fuw7vcNpveWEnQ4Qwp828qaKUf4" +
              ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "400px",
            width: "80",
          }}
        >
          <Col span={24}>
            <Col span={12}></Col>
            <Col
              span={12}
              style={{ backgroundColor: "linear-gradient(to right,#cccccc ,#f2f2f2)", height:"100%"}}
              level={1}
            >
              <Title style={{ color: "white",opacity:1  }} level={1}>
                <br/>
                Connecting Everyone
              </Title>
              <Title level={5} style={{ color: "white",opacity:1, textAlign: "left" , marginLeft:"30px" }}>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </Title>
            </Col>
          </Col>
        </Row>
      </Row>

      <Row>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <br />
          <br />
          <TeamOutlined style={{ fontSize: "2em", color: "#FFBF00" }} />
          <br />
          Our Team
          <br />
          <br />
          <Text type="secondary">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          {/* <Divider type="vertical"></Divider> */}
        </Col>
        <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <br />
          <br />
          <AimOutlined style={{ fontSize: "2em", color: "#FFBF00" }} />
          <br />
          Our Mission
          <br />
          <br />
          <Text type="secondary">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <br />
          <br />
          <BulbOutlined style={{ fontSize: "2em", color: "#FFBF00" }} />
          <br />
          Our Vision
          <br />
          <br />
          <Text type="secondary">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
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
          <Image
            height="90%"
            width="80%"
            src="https://media-exp1.licdn.com/dms/image/C4D1BAQG5C_yM6QOYZw/company-background_10000/0/1624099256683?e=2147483647&v=beta&t=UNmK8vR8Tmah78d8Fuw7vcNpveWEnQ4Qwp828qaKUf4"
          ></Image>
        </Col>
        <Col span={12}>
          <br />
          <Title level={2}>Our Services</Title>
          <Text type="secondary" style={{ textAlign: "left" }}>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
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
          <Title level={2}>Our Mission</Title>
          <Text type="secondary" style={{ textAlign: "left" }}>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </Col>
        <Col span={12}>
          <Image
            height="90%"
            width="80%"
            src="https://media-exp1.licdn.com/dms/image/C4D1BAQG5C_yM6QOYZw/company-background_10000/0/1624099256683?e=2147483647&v=beta&t=UNmK8vR8Tmah78d8Fuw7vcNpveWEnQ4Qwp828qaKUf4"
          ></Image>
        </Col>
      </Row>
      <br />
      <br />
      <br />
      <br />
      <br />

      <Row>
        <Col span={12}>
          <Image
            height="90%"
            width="80%"
            src="https://media-exp1.licdn.com/dms/image/C4D1BAQG5C_yM6QOYZw/company-background_10000/0/1624099256683?e=2147483647&v=beta&t=UNmK8vR8Tmah78d8Fuw7vcNpveWEnQ4Qwp828qaKUf4"
          ></Image>
        </Col>
        <Col span={12}>
          <br />
          <Title level={2}>Our Vision</Title>
          <Text type="secondary" style={{ textAlign: "left" }}>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </Col>
      </Row>
    </div>
  );
}

export default AboutUs;
