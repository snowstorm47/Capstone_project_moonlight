import React, { useEffect, Component, useState } from "react";
import {
  Modal,
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

const AdminContact = () => {
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
  const [contactus, setContactus] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    message: "",
  });
  const showModal = (id, user_id) => {
    setIsModalVisible(true);
    console.log(isModalVisible);
    setIds({ id: id, user_id: user_id });
  };

  const handleOk = (id) => {
    setIsModalVisible(false);
    deleteMessage(id);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
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

  useEffect(() => {
    axios.get(`/api/showmessage`).then((res) => {
      if (res.data.status === 200) {
        setState(res.data.message);
      } else {
        console.log("failed to fetch");
      }
    });
  }, []);

  const deleteMessage = (id) => {
    axios.delete(`/api/deletemessage?id=${id}`).then((res) => {
      if (res.data.status === 200) {
        message.success("Message has been deleted");
        axios.get(`/api/showmessage`).then((res) => {
          if (res.data.status === 200) {
            setState(res.data.message);
          } else {
            console.log("failed to fetch");
          }
        });
      } else {
        message.error("Message not deleted");
      }
    });
  };

  return (
    <div>
      <Modal
        title="Delete Message"
        visible={isModalVisible}
        onOk={() => handleOk(ids.id)}
        onCancel={handleCancel}
      >
        Do You Want to Delete The Message
      </Modal>
          {visible ? (
            <List
              itemLayout="horizontal"
              dataSource={state}
              renderItem={(item) => (
                <>
                  {item == null ? (
                    <>
                      <Skeleton loading={true} active avatar></Skeleton>
                      <Skeleton loading={true} active avatar></Skeleton>
                      <Skeleton loading={true} active avatar></Skeleton>
                    </>
                  ) : (
                    <>
                      <></>
                      <List.Item
                        style={{
                          marginBottom: "1em",
                        }}
                      >
                        <List.Item.Meta
                          title={
                            <p
                              style={{
                                marginLeft: "0em",
                              }}
                            >
                              {item.name} <span>{item.created_at}</span>
                              <br />
                            </p>
                          }
                          description={
                            <p>
                              {item.email}
                              {" , "}
                              {item.phoneNumber}
                              <br />
                              Message: {"  "}
                              {item.message}
                            </p>
                          }
                          style={{
                            textAlign: "left",
                          }}
                        />
                        <br />
                        <br />

                        <List.Item
                          actions={[
                            <Button
                              type="text"
                              onClick={() => showModal(item.id)}
                              key="list-loadmore-more"
                              icon={<DeleteOutlined />}
                            />,
                          ]}
                        ></List.Item>
                      </List.Item>
                    </>
                  )}
                </>
              )}
            />
          ) : null}
    </div>
  );
};
export default AdminContact;
