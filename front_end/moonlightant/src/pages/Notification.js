import { Component, useState } from "react";
import { Layout, Menu, Icon, Col, Row, Badge } from "antd";
import {
  SendOutlined,
  BankOutlined,
  CheckCircleOutlined,
  UserOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NotificationAdd from "./NotificationAdd";
import NotificationInstitution from "./NotificationInstitution";
import NotificationUser from "./NotificationUser";
import NotificationSeen from "./NotificationSeen";
import NotificationRecieved from "./NotificationRecieved";
const { Header, Footer, Sider, Content } = Layout;

// Introduce submenu components
const SubMenu = Menu.SubMenu;

const Notification = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("add");

  const componentsSwtich = (key) => {
    switch (key) {
      case "add":
        return <NotificationAdd />;
      case "institution":
        return <NotificationInstitution />;
      case "sent":
        return <NotificationUser/>;
        case "user":
        return <NotificationRecieved/>
      // case "suitcase":
      //   return <h3>item3</h3>;
      case "seen":
        return <NotificationSeen/>
      default:
        break;
    }
  };
  // const state = {
  //   collapsed: false,
  // };

  // const onCollapse = (collapsed) => {
  //   this.setState({ collapsed });
  // };
  // const toggle = () => {
  //   this.setState({
  //     collapsed: !this.state.collapsed,
  //   });
  // };

  return (
    <Layout>
      <Sider
        width={256}
        style={{ 
          minHeight: "90vh",
         }}
        // collapsible
        // collapsed={this.state.collapsed}
        // onCollapse={this.onCollapse}
      >
        <div
          style={{
            height: "32px",
            background: "rgba(255,255,255,.2)",
            color: "white",
            margin: "16px",
          }}
        >
          {" "}
          Menu
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedMenuItem}
          onClick={(e) => setSelectedMenuItem(e.key)}
          
        >
          <Menu.Item key="add">
            <PlusCircleOutlined />
            <span>Add</span>
          </Menu.Item>

          <Menu.Item key="institution"
            style={{
              paddingBottom:"20px"
            }}
          >
            <BankOutlined />
            <span
              style={{
                color: "#dddddd",
              }}
            >
              Institution
            </span>
            <Badge
              count={99}
              overflowCount={10}
              status="warning"
              offset={[20, 20]}
            ></Badge>
          </Menu.Item>
          <Menu.Item key="user"
            style={{
              paddingBottom:"20px"
            }}
          >
            <UserOutlined />
            <span>User</span>
            <Badge
              count={99}
              overflowCount={10}
              status="warning"
              offset={[20, 20]}
            ></Badge>
          </Menu.Item>
          <Menu.Item key="company">
            <span>Suitcase</span>
            <Badge
              count={0}
              overflowCount={10}
              status="warning"
              offset={[20, 20]}
            ></Badge>
          </Menu.Item>
          <Menu.Item key="seen"
            style={{
              paddingBottom:"20px"
            }}
          >
            <CheckCircleOutlined />
            <span>Seen</span>
            <Badge
              count={0}
              overflowCount={10}
              status="warning"
              offset={[20, 20]}
            ></Badge>
          </Menu.Item>
          <Menu.Item key="sent"
            style={{
              paddingBottom:"20px"
            }}
          >
            <SendOutlined />
            <span>Sent</span>
            <Badge
              count={99}
              overflowCount={10}
              status="warning"
              offset={[20, 20]}
            ></Badge>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Row>
          <Col span={20}>
            <Content
              style={{
                margin: "40px 180px",
                padding: 24,
                background: "#fff",
                minHeight: 280,
              }}
            >
              {componentsSwtich(selectedMenuItem)}
            </Content>
          </Col>
        </Row>
      </Layout>
    </Layout>
  );
};
export default Notification;
