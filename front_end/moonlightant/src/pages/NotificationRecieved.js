import React, { useEffect, Component, useState } from "react";
import { Layout, Menu, Space, Skeleton, List, message ,Button } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import { SendTimeExtension, SevenK } from "@mui/icons-material";

// Introduce submenu components
const SubMenu = Menu.SubMenu;

const NotificationRecieved = () => {
  const [visible, setVisible] = useState(true);
  const [state, setState] = useState();
  const [loading, setLoading] = useState(true);

  const id = localStorage.getItem("auth_id");

  useEffect(() => {
    axios.get(`api/viewNotificationRecieved/${id}`).then((response) => {
      setState(response.data.notification);
      console.log(response.data.notification);
      setLoading(false);
    });
  }, []);

  const seen = (id) => {
    const data = {
        seen_status: 'True'
    }
    
            axios.put(`/api/seenNotification/${id}`, data).then((res) => {
          if (res.data.status === 200) {
			message.success("Notification in seen box");
            console.log(res.data.result);
            window.location = "/Notification";
          } else {
            message.error("Notification not added in seen");            
          }
        });
      }

      const deleteNotification =(id) =>{
        axios.delete(`/api/deleteNotification/${id}`).then((res) => {
            if (res.data.status === 200) {
              message.success("Notification has been deleted");
              console.log(res.data.result);
            } else {
              message.error("Notification not deleted");            
            }
          });
      }

  return (
    <div>
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
                      extra={
                        <img
                          width="27"
                          alt="logo"
                          src={
                            "http://localhost:8000/uploads/NotificationPicture/" +
                            item.notificationImage
                          }
                        />
                      }
                      title={
                        <a
                          href="#"
                          style={{
                            marginLeft: "0em",
                          }}
                        >
                          {item.notificationTitle}
                        </a>
                      }
                      description={item.notificationDetail}
                      style={{
                        textAlign: "left",
                      }}
                    />
                    <br />
                    <br />
                    <div
                      style={{
                        marginTop: "5em",
                      }}
                    >
                      {item.created_at}
                    </div>
                    <List.Item
                      actions={[
                        <Button
                         type="text" 
                         onClick={() => seen(item.id)} 
                         key="list-loadmore-edit"
                          icon={<CheckOutlined />}
                        />,
                        <Button 
                        type="text"
                        onClick={() => deleteNotification(item.id)} 
                        key="list-loadmore-more"
                          icon={<CloseOutlined />}
                        />
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
export default NotificationRecieved;
