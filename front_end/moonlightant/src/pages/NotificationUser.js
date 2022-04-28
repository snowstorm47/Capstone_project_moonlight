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
const { Header, Footer, Sider, Content } = Layout;

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
];
// Introduce submenu components
const SubMenu = Menu.SubMenu;

const NotificationUser = () => {
  const [visible, setVisible] = useState(true);
  const handleClose = () => {
    setVisible(false);
  };

  return (
   <div>
        {visible ? (
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
        ) : null}
     </div>
  );
};
export default NotificationUser;
