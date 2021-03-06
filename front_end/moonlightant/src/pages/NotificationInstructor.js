import React, { useEffect, Component, useState } from "react";
import {
  Input,
  Menu,
  Modal,
  Skeleton,
  List,
  message,
  Button,
  Avatar,
} from "antd";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { SendTimeExtension, SevenK } from "@mui/icons-material";

// Introduce submenu components
const SubMenu = Menu.SubMenu;
const { Search } = Input;

const NotificationInstructor = () => {
  const [visible, setVisible] = useState(true);
  const [state, setState] = useState();
  const [loading, setLoading] = useState(true);
  const idL = localStorage.getItem("auth_id");

  const [isModalVisible, setIsModalVisible] = useState(false);
	const [ids,setIds]=useState({id:''})
	let iduserget;
  const showModal = (id) => {
    console.log(id)
    setIsModalVisible(true);
	setIds({id:id});


  };

  const handleOk = (id) => {
    setIsModalVisible(false);
	deleteNotification(id)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
	
  };
  useEffect(() => {
    axios.get(`api/showInstructorNotification/${idL}`).then((response) => {
      setState(response.data.notification);
      console.log(response.data.notification);
      setLoading(false);
    });
  }, []);

  const seen = (id) => {
    const data = {
      seen_status: "True",
    };

    axios.put(`/api/seenNotification/${id}`, data).then((res) => {
      if (res.data.status === 200) {
        message.success("Notification in seen box");
        axios.get(`api/showInstructorNotification/${idL}`).then((response) => {
          setState(response.data.notification);
          console.log(response.data.notification);
          setLoading(false);
        });
      } else {
        message.error("Notification not added in seen");
      }
    });
  };

  const deleteNotification = (id) => {
    axios.delete(`/api/deleteNotification/${id}`).then((res) => {
      if (res.data.status === 200) {
        message.success("Notification has been deleted");
        axios.get(`api/showInstructorNotification/${idL}`).then((response) => {
          setState(response.data.notification);
          console.log(response.data.notification);
          setLoading(false);
        });
      } else {
        message.error("Notification not deleted");
      }
    });
  };
  const getAllInstructor = (value) => {
		setLoading(true);
		return axios.get(`api/showInstructorNotification/${idL}`).then((response) => {
			setState(response.data.notification);
			setLoading(false);
		});
	};
  const onSearch = (value) => {
		setState(
			state.filter((i) => {
				return i.name.includes(value);
			})
		);
	};

  return (
    <div>
      <Modal title="Delete Notification" visible={isModalVisible}
	 onOk={()=>handleOk(ids.id)}
	  onCancel={handleCancel}>
	Do You Want to Delete The Notification
  </Modal>
  <Search
					placeholder="Search by Name"
					allowClear
					onChange={(value)=>{return value==""?null:getAllInstructor()}}
					enterButton="Search"
					size="large"
					style={{ padding: "40px 20px" }}
					onSearch={onSearch}
				/>
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
                      avatar={
                        <Avatar
                          src={
                            "http://localhost:8000/uploads/ProfilePicture/" +
                            item.image
                          }
                        />
                      }
                      title={
                        
                        <p
                          style={{
                            marginLeft: "0em",
                          }}
                        >
                          <a >{item.name}{" "}</a><span>{item.created_at}</span><br/><br/>
                          {item.notificationTitle}
                        </p>
                      }
                      description={item.notificationDetail}
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
                          onClick={() => seen(item.id)}
                          key="list-loadmore-edit"
                          icon={<CheckCircleOutlined />}
                        />,
                        <Button
                          type="text"
                          onClick={()=>showModal(item.id)}
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
export default NotificationInstructor;
