import React,{ useEffect, Component, useState } from "react";
import { Skeleton, List, Modal,message, Button,Input} from "antd";
import {  DeleteOutlined,} from "@ant-design/icons";
import axios from "axios";
const { Search } = Input;

const NotificationSeen = () => {
  const [visible, setVisible] = useState(true);
  const [state, setState] = useState();
	const [loading, setLoading] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);
	const [ids,setIds]=useState({id:'',user_id:''})
	let iduserget;
  const showModal = (id) => {
    setIsModalVisible(true);
	console.log(isModalVisible);
	setIds({id:id})


  };

  const handleOk = (id) => {
    setIsModalVisible(false);
	deleteNotification(id)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
	
  };
  const idL = localStorage.getItem('auth_id');
	useEffect(() => {
		axios.get(`api/viewSeenNotification/${idL}`).then((response) => {
			setState(response.data.notification);
      console.log(response.data.notification);
			setLoading(false);
		});
	}, []);

  const deleteNotification =(id) =>{
    axios.delete(`/api/deleteNotification/${id}`).then((res) => {
        if (res.data.status === 200) {
          message.success("Notification has been deleted");
          axios.get(`api/viewSeenNotification/${idL}`).then((response) => {
            setState(response.data.notification);
            setLoading(false);
          });
        } else {
          message.error("Notification not deleted");            
        }
      });
  }
  const getAllSeen = (value) => {
		setLoading(true);
		return axios.get(`api/viewSeenNotification/${idL}`).then((response) => {
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
					onChange={(value)=>{return value==""?null:getAllSeen()}}
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
						<><></><List.Item
                    style={{
                      marginBottom: "1em"
                    }}
                  >
                    <List.Item.Meta
                      extra={
                        <img
                          width="27"
                          alt="logo"
                          src={
                            "http://localhost:8000/uploads/NotificationPicture/" + item.notificationImage
                          }
                        />
                      }
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
                        onClick={()=>showModal(item.id)}
                        key="list-loadmore-more"
                          icon={<DeleteOutlined />}
                        />
                      ]}
                    ></List.Item>
                  </List.Item></>
            
            
            )}
          </>
        )}
        />
        ) : null}
     </div>
  );
};
export default NotificationSeen;
