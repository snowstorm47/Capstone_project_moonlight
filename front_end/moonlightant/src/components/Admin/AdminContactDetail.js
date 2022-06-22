import React, { useEffect, Component, useState } from "react";
import {
  Typography,
  Menu,
  Form,
  Skeleton,
  List,
  message,
  Button,
  Row,
  Col,
  Input
} from "antd";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { SendTimeExtension, SevenK } from "@mui/icons-material";

// Introduce submenu components
const SubMenu = Menu.SubMenu;
const { Title } = Typography;
const AdminContactDetail = () => {
  const [visible, setVisible] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [state, setState] = useState();
  const [ids, setIds] = useState({ id: "" });
  const [adminContact, setAdminContact] = useState({
    PhoneNumber: "",
    Email: "",
    LinkedIn: "",
    Facebook: "",
    Instagram: "",
  });

  const id = localStorage.getItem("auth_id");

  useEffect(() => {
    axios.get(`/api/admincontact`).then((res) => {
      if (res.data.status === 200) {
        setAdminContact(res.data.contact[0]);
      } else {
        console.log("couldnt retrieve data");
      }
    });
  }, []);

  const editAdmin =(id)=>{
      const data ={
          PhoneNumber: adminContact.PhoneNumber,
          Email: adminContact.Email,
          LinkedIn: adminContact.LinkedIn,
          Facebook: adminContact.Facebook,
          Instagram: adminContact.Instagram
      }
      axios.put(`/api/editcontact/${id}`,data).then((res) => {
        if (res.data.status === 200) {
          message.success("updated contact")
        } else {
          message.error("couldnt update data");
        }
      });
  }
  const handleInput = (e) => {
    setAdminContact({ ...adminContact, [e.target.name]: e.target.value });
};

  return (     
      
          <Form // Ant Design's Form Component
            name="contact"
            layout="vertical"
            wrapperCol={{
              span: 21,
            }}
            labelCol={{ span: 8 }}
            //   wrapperCol={{ span: 16 }}
            style={{
              marginTop: 15,
              paddingBottom: 10,
              paddingLeft: 60,
              paddingRight: 0,
              paddingTop: 20,
              marginRight: 70,
              marginBottom: 80,
              marginLeft: 80,
              borderRadius: 30,
              backgroundColor: "white",
            }}
            onFinish={() => editAdmin(adminContact.id)}
          >
              <Title level={3}>Update Contact</Title>
            <Form.Item // Form Item (Full Name)
              label="Email"
              required
              tooltip="This is a required field"
              rules={[
                {
                  required: true,
                  message: "Please enter our Email!",
                },
              ]}
            >
              <Input
                placeholder="Email"
                name="Email"
                onChange={handleInput}
                value={adminContact.Email}
              />
            </Form.Item>
            <Form.Item // Form Item (Phone Number)
              label="Phone Number"
              required
              tooltip="This is a required field"
              rules={[
                {
                  required: true,
                  message: "Please enter our phone number!",
                },
              ]}
            >
              <Input
                placeholder="Phone Number"
                name="PhoneNumber"
                onChange={handleInput}
                value={adminContact.PhoneNumber}

              />
            </Form.Item>
            <Form.Item // Form Item (Email)
              label="Linked In"
              required
              tooltip="This is a required field"
              rules={[
                {
                  required: true,
                  message: "Please enter our LinkedIn Link!",
                },
              ]}
            >
              <Input placeholder="Linked In" 
                value={adminContact.LinkedIn}
                name="LinkedIn" onChange={handleInput} />
            </Form.Item>
            <Form.Item // Form Item (Email)
              label="Instagram"
              required
              tooltip="This is a required field"
              rules={[
                {
                  required: true,
                  message: "Please enter our Instagram Link!",
                },
              ]}
            >
              <Input placeholder="Instagram" 
              name="Instagram" 
              onChange={handleInput}
              value={adminContact.Instagram}
              
              />
            </Form.Item>
            <Form.Item // Form Item (Email)
              label="Facebook"
              required
              tooltip="This is a required field"
              rules={[
                {
                  required: true,
                  message: "Please enter our Facebook Link!",
                },
              ]}
            >
              <Input placeholder="Facebook" 
                value={adminContact.Facebook}
                name="Facebook" onChange={handleInput} />
            </Form.Item>
            <Form.Item // Form Item (Submit Button)
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  borderRadius: 10,
                  borderColor: "",
                  paddingLeft: 30,
                  paddingRight: 30,
                  marginLeft: 30,
                }}
              >
                Update Contact
              </Button>
            </Form.Item>
          </Form>
  );
};
export default AdminContactDetail;