import { Form, Input, Button, Checkbox, Upload, message ,Select} from "antd";
import {
	UploadOutlined,
	InboxOutlined,
	SendOutlined,
	LoadingOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const NotificationAdd = () => {
	const [userList, setUserList] = useState([]);
	const [notification, setNotification] = useState({
		notificationTitle: "",
		notificationDetail: "",
		sender_id: localStorage.getItem("auth_id"),
		reciever_id: "",
		seen_status: "False",
		error_list:[]
	});

	const handleInput = (e) => {
		setNotification({ ...notification, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		
			axios.get(`/api/filterUser`).then((res) => {
				if (res.data.status === 200) {
				  setUserList(res.data.user);
				  console.log(res.data.user);
				}
			  });
		  },[]);

	const handleSubmit = async () => {
		console.log(notification);
		const data ={
			notificationTitle:notification.notificationTitle,
			notificationDetail:notification.notificationDetail,
			sender_id:localStorage.getItem('auth_id'),
			reciever_id: notification.reciever_id,
			seen_status: "False"
		}
		axios.get("/sanctum/csrf-cookie").then((response) => {
			axios.post("api/postNotification", data).then((response) => {
				console.log(response);
				if (response.data.status === 200) {
					message.success("Notification created succesfully");
				} else {
					setNotification({
						...notification,
						error_list: response.data.validation_errors,
					  });
					message.error("Notification was not created. Please try again");
				}
			});
		});

		setNotification({
			...notification,
			notificationTitle: "",
			notificationDetail: "",
			

		});
	};
	const navigate = useNavigate();

	const goToAdvancedSearch = async () => {
		notification.notificationDetail
			? navigate("advancedSearch", { state: { notification } })
			: message.info("please fill the notification title and discription");
	};
	let options = userList.map((item) => {
		return { value: item.id, label: item.name, key: item.id };
	  });

	  const handleInputUser = (e) => {
		// e.persist();
		console.log(e);
	
		setNotification({ ...notification,reciever_id: e });
	  };

	const normFile = (e) => {
		console.log("Upload event:", e);

		if (Array.isArray(e)) {
			return e;
		}

		return e && e.fileList;
	};

	return (
		<Form
			name="basic"
			labelCol={{
				span: 8,
			}}
			wrapperCol={{
				span: 16,
			}}
			onFinish={() => handleSubmit()}
			// autoComplete="off"
			method="POST"
		>
			<Form.Item>
				<Input
					placeholder="Notification Title"
					name="notificationTitle"
					value={notification.notificationTitle}
					onChange={handleInput}
					required
				/>
				<span style={{color:"red"}}>{notification.error_list?.notificationTitle}</span>

			</Form.Item>

			<Form.Item>
				<Input.TextArea
					placeholder="Notification Detail"
					size="large"
					name="notificationDetail"
					value={notification.notificationDetail}
					onChange={handleInput}
					style={{ width: "100%" }}
					required
				/>
				<span style={{color:"red"}}>{notification.error_list?.notificationDetail}</span>
			</Form.Item>
			<Form.Item style={{marginLeft:"-13rem"}}label="Choose the User">
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      ?.toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      ?.toLowerCase()
                      .localeCompare(optionB.children?.toLowerCase())
                  }
                  label="Choose a User"
                  style={{ marginLeft:"-6rem",padding: 0, width:"80%", 
                  borderRadius: "80px",
                  marginTop:"0rem",
                  marginLeft:"-8.4rem",
                  marginRight:"0rem"
                 }}
				 required
                  name="reciever_id"
                  onChange={handleInputUser}
                  value={notification.reciever_id}
                  options={options}
                />
              </Form.Item>
			<Form.Item>
				<Button type="primary" style={{ width: "100%" }} htmlType="submit">
					Create Notification <SendOutlined />
				</Button>
				<br />
				<a
					style={{ textDecoration: "underlined" }}
					onClick={goToAdvancedSearch}
				>
					Advanced Search
				</a>
			</Form.Item>
		</Form>
	);
};

export default NotificationAdd;
