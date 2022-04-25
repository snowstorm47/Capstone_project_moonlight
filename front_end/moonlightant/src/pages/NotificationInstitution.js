import { Component, useState } from "react";
import { Layout, Menu, Space, Alert, Row, Col,Button } from "antd";
import {
  DashboardOutlined,
  BankOutlined,
  CheckCircleOutlined,
  UserOutlined,
  PlusCircleOutlined,
  CheckOutlined,
} from "@ant-design/icons";
const { Header, Footer, Sider, Content } = Layout;

// Introduce submenu components
const SubMenu = Menu.SubMenu;

const NotificationInstitution = () => {
  const [visible, setVisible] = useState(true);
  const handleClose = () => {
    setVisible(false);
  };

  return (
   <div>
        {visible ? (
          <Alert
            message="Informational Notes"
            type="info"
            action={
              <Space>
                <Button size="small" type="text">
                  <CheckOutlined size="small" type="ghost" />
                </Button>
              </Space>
            }
            closable
            afterClose={handleClose}
          />
        ) : null}
     </div>
  );
};
export default NotificationInstitution;
