import { Component, useState } from "react";
import { Layout, Menu, Space, Alert, Row, Col,Button, List,
  Avatar, } from "antd";
import {
  DashboardOutlined,
  BankOutlined,
  CheckCircleOutlined,
  UserOutlined,
  PlusCircleOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { React,useEffect } from "react";

const { Header, Footer, Sider, Content } = Layout;

const data = [
  {
    title: "User Title 1",
  },
  {
    title: "User Title 2",
  },
];
const NotificationUser = () =>{

  const [notificationUser, setNotificationUser] = useState({
    phoneNumber:'',
    name:'',
    position:'',
    startDate:'',
    endDate:'',
    sex:'',
    institution:'',
    companyName:'',
    startDateClass:'',
    endDateClass:'',
    skill:[],
    error_list: []
});
const id = localStorage.getItem('auth_id');
    useEffect(() => {
            
            axios.get(`/api/viewNotification/${id}`).then(res => {

              if(res.data.status === 200)
              {
                  // setEditProfile(res.data);
                  // setSkillList(res.data.skill); 
                  // console.log(skillList);      
              }
              else
              {
                  console.log('couldnt retrieve data');
              }
        });
        },[]);

  return (
   <div>
        
          <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
            style={{
              marginBottom:"1em"
            }}
            >
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={
                  <a
                    href="#"
                    style={{
                      marginLeft: "0em",
                    }}
                  >
                    {item.title}
                  </a>
                }
                description=
                "Ant Design, a design language for background applications, is refined by Ant UED Team "
                style={{
                  textAlign:"left"
                }}
              />
              <br/>
              <br/>
              <div
              style={{
                marginTop:"5em"
              }}
              >Apr 28, 2022</div>
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
      
     </div>
  );
};

export default NotificationUser;
