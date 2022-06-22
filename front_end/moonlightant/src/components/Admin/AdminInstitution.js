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
import "../../styles/newsCard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ContentCutOutlined } from "@mui/icons-material";

const AdminInstitution = () => {
	const [visible, setVisible] = useState(true);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isModalVisible1, setIsModalVisible1] = useState(false);
	const [ids, setIds] = useState({ id: "", user_id: "" });
	const [senderids, setsenderIds] = useState({ id: ""});
	let iduserget;
	const showModal = (id, user_id) => {
		setIsModalVisible(true);
		console.log(isModalVisible);
		setIds({ id: id, user_id: user_id });
	};

	const handleOk = (id) => {
		setIsModalVisible(false);
		deleteInstitution(id);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	const showModal1 = (id, user_id) => {
		setIsModalVisible1(true);
		console.log(isModalVisible);
		setsenderIds({ id: id });
	};

	const handleOk1 = (id) => {
		console.log(id)
		setIsModalVisible1(false);
		verify(id);
	};

	const handleCancel1 = () => {
		setIsModalVisible1(false);
	};
	const navigate = useNavigate();
	const [state, setState] = useState();
	const [loading, setLoading] = useState(true);
	const id = localStorage.getItem("auth_id");
	useEffect(() => {
		axios.get(`api/viewInstitutionNotification/${id}`).then((response) => {
			setState(response.data.notification);
			setIds(response.data.sender_id);
			setsenderIds(response.data.sender_id);
			setLoading(false);
		});
	}, []);

	const verify = (id) => {
		console.log(id)
		axios.put(`api/verifyInstitution?sender_id=${id}`).then((response) => {
			message.success("Institution Verified");
			axios
				.delete(`/api/deleteVerifyNotification?sender_id=${id}`)
				.then((res) => {
					if (res.data.status === 200) {
						message.success('Notification Deleted')
						axios
							.get(`api/viewInstitutionNotification/${id}`)
							.then((response) => {
								setState(response.data.notification);
								setIds(response.data.sender_id);
								setsenderIds(response.data.sender_id);
								setLoading(false);
							});
					} else {
						message.error("Notification not deleted");
					}
				});
			setLoading(false);
		});
	};
	const deleteInstitution = (id) => {
		axios.delete(`/api/deleteinstitution?sender_id=${id}`).then((res) => {
			if (res.data.status === 200) {
				message.success("Institution deleted");
				axios.get(`api/viewInstitutionNotification/${id}`).then((response) => {
					setState(response.data.notification);
					console.log(response.data.notification);
					setLoading(false);
				});
			} else {
				message.error("Institution not deleted");
			}
		});
	};

	return (
		<div>
			<Modal
				title="Delete Institution"
				visible={isModalVisible}
				onOk={() => handleOk(ids.id)}
				onCancel={handleCancel}
			>
				Do You Want to Delete The Institution
			</Modal>
			<Modal
				title="Verify Institution"
				visible={isModalVisible1}
				onOk={() => handleOk1(senderids.id)}
				onCancel={handleCancel1}
			>
				Do You Want to Verify The Institution
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
													onClick={() => showModal1(item.sender_id)}
													key="list-loadmore-more"
													icon={<CheckSquareOutlined />}
												/>,
												<Button
													type="text"
													//   onClick={() => deleteHiringCompany(item.id,item.user_id)}
													onClick={() => showModal(item.sender_id)}
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

export default AdminInstitution;
