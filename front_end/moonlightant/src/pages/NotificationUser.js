import React,{ useEffect, Component, useState } from "react";
import { Button, message, Skeleton, List,Modal } from "antd";
import {
  EditOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import axios from "axios";
import EditNotification from "../components/EditNotification";
const NotificationUser = () => {
  const [visible, setVisible] = useState(true);
  const [state, setState] = useState();
	const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idNotification, setIdNotification] = useState(true);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const id = localStorage.getItem('auth_id');
	useEffect(() => {
		axios.get(`api/viewNotification/${id}`).then((response) => {
			setState(response.data.notification);
      console.log(response.data.notification);
			setLoading(false);
		});
	}, []);

  const deleteNotification =(id) =>{
    axios.delete(`/api/deleteNotification/${id}`).then((res) => {
        if (res.data.status === 200) {
          message.success("Notification has been deleted");
          console.log(res.data.result);
        } else {
          message.error("Notification not deleted");            
        }
        window.location.reload(false);
      });
  }

  const update = (id) => {

  }

  const showModal = () => {
    setIsModalVisible(true);
  };
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
                  <><></><List.Item
                    style={{
                      marginBottom: "1em"
                    }}
                  >
                    <List.Item.Meta
                      extra={<img
                        width="27"
                        alt="logo"
                        src={"http://localhost:8000/uploads/NotificationPicture/" + item.notificationImage} />}
                      title={<a
                        href="#"
                        style={{
                          marginLeft: "0em",
                        }}
                      >
                        {item.notificationTitle}
                      </a>}
                      description={item.notificationDetail}
                      style={{
                        textAlign: "left"
                      }} />
                    <br />
                    <br />
                    <div
                      style={{
                        marginTop: "5em"
                      }}
                    >{item.created_at}</div>
                    <List.Item
                      actions={[
                        <Button
                          type="text"
                          key="list-loadmore-edit"
                          icon={<EditOutlined />}
                          onClick={() => {
                            showModal();
                            setIdNotification(item.id);
                          } } />,
                        <Button
                          type="text"
                          onClick={() => deleteNotification(item.id)}
                          key="list-loadmore-more"
                          icon={<CloseOutlined />} />
                      ]}
                    ></List.Item>
                  </List.Item></>


                )}
              </>
            )} />
        ) : null}
        <Modal
          title="Edit Notification"
          visible={isModalVisible}
          onCancel={handleCancel}
        >
          <EditNotification parentToChild={idNotification} />
        </Modal>
     </div>
  );
};
export default NotificationUser;
