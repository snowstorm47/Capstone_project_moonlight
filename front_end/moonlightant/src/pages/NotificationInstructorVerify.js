import React, { useEffect, useState } from "react";
import {
	List,
	Avatar,
	Space,
	Skeleton,
	Button,
	message,
	Modal,
	Input,
} from "antd";
import { DeleteOutlined, CheckSquareOutlined, ConsoleSqlOutlined } from "@ant-design/icons";
import ".//../styles/newsCard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const { Search } = Input;

const NotificationInstructorVerify = () => {
	const [visible, setVisible] = useState(true);
	const [notificationId, setNotificationId] = useState();
	const [verifyId, setVerifyId] = useState();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isModalVisible1, setIsModalVisible1] = useState(false);
	const [ids, setIds] = useState({ id: "", user_id: "" });
	const [senderids, setsenderIds] = useState({ id: ""});
	let iduserget;
	const showModal = (user_id,id) => {
		setIsModalVisible(true);
		console.log(isModalVisible);
		setIds({ id: id, user_id: user_id });
		setNotificationId(id);
	};

	const handleOk = (id) => {
		setIsModalVisible(false);
		deleteInstructor(id);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	const showModal1 = (id, notificationid) => {
		setIsModalVisible1(true);
		console.log(isModalVisible);
		setsenderIds({ id: id });
		setVerifyId(notificationid);
	};

	const handleOk1 = (id) => {
		console.log(id)
		setIsModalVisible1(false);
		verify(id,verifyId);
	};

	const handleCancel1 = () => {
		setIsModalVisible1(false);
	};
	const navigate = useNavigate();
	const [state, setState] = useState();
	const [loading, setLoading] = useState(true);
	const id = localStorage.getItem("auth_id");
	useEffect(() => {
		axios.get(`api/showInstructorVerifyNotification/${id}`).then((response) => {
			setState(response.data.notification);
			setIds(response.data.sender_id);
			setsenderIds(response.data.sender_id);
			setLoading(false);
		});
	}, []);

	const verify = (id) => {
		console.log(id)
		axios.put(`api/verifyInstructor/${id}?notificationId=${verifyId}`).then((response) => {
			message.success("Instructor Verified");
			axios.get(`api/showInstructorVerifyNotification/${localStorage.getItem("auth_id")}`).then((response) => {
				setState(response.data.notification);
				console.log(response.data.notification);
				setLoading(false);
			});
			setLoading(false);
		});
	};
	const deleteInstructor = (id) => {
		axios.delete(`/api/deleteVerifyInstructor?sender_id=${id}&id=${notificationId}`).then((res) => {
			if (res.data.status === 200) {
				message.success("Instructor deleted");
				axios.get(`api/showInstructorVerifyNotification/${localStorage.getItem("auth_id")}`).then((response) => {
					setState(response.data.notification);
					console.log(response.data.notification);
					setLoading(false);
				});
			} else {
				message.error("Instructor not deleted");
			}
		});
	};

	const getAllInstructor = (value) => {
		setLoading(true);
		return axios.get(`api/viewNotificationRecieved/${id}`).then((response) => {
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
			<Modal
				title="Delete Instructor"
				visible={isModalVisible}
				onOk={() => handleOk(ids.user_id)}
				onCancel={handleCancel}
			>
				Do You Want to Delete The Instructor
			</Modal>
			<Modal
				title="Verify Instructor"
				visible={isModalVisible1}
				onOk={() => handleOk1(senderids.id)}
				onCancel={handleCancel1}
			>
				Do You Want to Verify The Instructor
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
											//   avatar={
											//     <Avatar
											//       src={
											//         "http://localhost:8000/uploads/ProfilePicture/" +
											//         item.image
											//       }
											//     />
											//   }
											title={
												<p
													style={{
														marginLeft: "0em",
													}}
												>
													{item.notificationTitle}{" "}
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
													style={{
														width: "20px",
													}}
													onClick={() => showModal1(item.sender_id,item.id)}
													key="list-loadmore-more"
													icon={<CheckSquareOutlined />}
												/>,
												<Button
													type="text"
													//   onClick={() => deleteHiringCompany(item.id,item.user_id)}
													onClick={() => showModal(item.sender_id,item.id)}
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

export default NotificationInstructorVerify;
