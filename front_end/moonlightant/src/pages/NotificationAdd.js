import { Form, Input, Button, Checkbox, Upload, message } from "antd";
import {
	UploadOutlined,
	InboxOutlined,
	SendOutlined,
	LoadingOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const NotificationAdd = () => {
	const [notification, setNotification] = useState({
		notificationTitle: "",
		notificationDetail: "",
		sender_id: localStorage.getItem("auth_id"),
		reciever_id: 2,
		seen_status: "False",
		notificationImage: "",
	});

	const handleInput = (e) => {
		setNotification({ ...notification, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		console.log(notification);
		const fData = new FormData();
		fData.append("notificationImage", notification.notificationImage);
		fData.append("notificationTitle", notification.notificationTitle);
		fData.append("notificationDetail", notification.notificationDetail);
		fData.append("sender_id", notification.sender_id);
		fData.append("reciever_id", notification.reciever_id);
		fData.append("seen_status", notification.seen_status);
		console.log("notificcation", notification);
		console.log(fData, "top.....");
		axios.get("/sanctum/csrf-cookie").then((response) => {
			axios.post("api/postNotification", fData).then((response) => {
				console.log(response);
				if (response.data.status === 200) {
					message.success("Notification created succesfully");
				} else {
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
			</Form.Item>

			<Form.Item>
				<Input.TextArea
					placeholder="Notification Title"
					size="large"
					name="notificationDetail"
					value={notification.notificationDetail}
					onChange={handleInput}
					style={{ width: "100%" }}
					required
				/>
			</Form.Item>
			<Form.Item>
				<Form.Item
					name="dragger"
					valuePropName="fileList"
					getValueFromEvent={normFile}
				>
					<Upload.Dragger
						name="notificationImage"
						type="file"
						multiple={false}
						onChange={(e) =>
							setNotification({
								...notification,
								notificationImage: e.fileList[0].originFileObj,
							})
						}
						style={{ width: "100%" }}
					>
						<p className="ant-upload-drag-icon">
							<InboxOutlined />
						</p>
						<p className="ant-upload-text">
							Click or drag file to this area to upload
						</p>
					</Upload.Dragger>
				</Form.Item>
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit" style={{ width: "100%" }}>
					Create Notification <SendOutlined />
				</Button>
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
