import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import "../styles/newsFeed.css";
import { useNavigate } from "react-router-dom";
const { Header, Content, Footer } = Layout;

const Navbar = () => {
  return (
    <Layout className="layout">
      <Header style={{ backgroundColor: "white" }}>
        <div className="logo" />
        <Menu theme="light" mode="horizontal" 
        defaultSelectedKeys={["1"]}
        >
          <Menu.Item key="1">
            <a href="newsfeed">News feed</a>
          </Menu.Item>
          <Menu.Item key="2" >
            <a href="#">Posts</a>
          </Menu.Item>
          <Menu.Item key="3" >
            <a href="notification">Notification</a>
          </Menu.Item>
          <Menu.Item key="4">
            <a href="aboutus">Aboutus</a>
          </Menu.Item>
          <Menu.Item key="5">
            <a href="contactus">ContactUs</a>
          </Menu.Item>
          <Menu.Item key="6">
            <a href="login">Login</a>
          </Menu.Item>
          <Menu.Item key="7">
            <a href="profilePage">Profile</a>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default Navbar;
