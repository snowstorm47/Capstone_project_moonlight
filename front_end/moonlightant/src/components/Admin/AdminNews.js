import React, { useEffect, useState } from "react";
import { List, Avatar, Space, Skeleton, Button, Modal, message } from "antd";
import {
	MessageOutlined,
	LikeOutlined,
	StarOutlined,
	CloseOutlined,
} from "@ant-design/icons";
import "../../styles/newsCard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminNews = () => {
	const { width } = window.innerWidth;
	const navigate = useNavigate();
	const IconText = ({ icon, text }) => (
		<Space>
			{React.createElement(icon)}
			{text}
		</Space>
	);
	const [state, setState] = useState();
	const [loading, setLoading] = useState(true);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [ids, setIds] = useState({ id: "" });
	const showModal = (id) => {
		setIsModalVisible(true);
		console.log(isModalVisible);
		setIds({ id: id });
	};

	const handleOk = (id) => {
		setIsModalVisible(false);
		deleteNews(id);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	useEffect(() => {
		axios.get("api/newsfeed").then((response) => {
			setState(response.data.newsdata);
			setLoading(false);
		});
	}, []);

	const deleteNews = (id) => {
		console.log(id);
		axios.delete(`/api/deleteNews/${id}`).then((res) => {
			if (res.data.status === 200) {
				message.success("News deleted");
				axios.get("api/newsfeed").then((response) => {
					setState(response.data.newsdata);
					setLoading(false);
				});
			} else {
				message.error("News not deleted");
			}
		});
	};

	return (
		<>
			<Modal
				title="Delete News"
				visible={isModalVisible}
				onOk={() => handleOk(ids.id)}
				onCancel={handleCancel}
			>
				Do You Want to Delete The News
			</Modal>
			<Input.Search
				style={{ marginBottom: "5rem" }}
				size="middium"
				placeholder="Search by name"
				enterButton
			/>
			<List
				itemLayout="vertical"
				size="large"
				pagination={{
					onChange: (page) => {
						console.log(page);
					},
					pageSize: 5,
				}}
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
								<List.Item
									//onClick={() => navigate("news", { state: { item } })}
									style={{
										boxShadow: "9px 10px 5px 0px rgba(0,0,0,0.09)",
										textAlign: "left",
										backgroundColor: "white",
										margin: "10px 0",
										borderRadius: 10,
										width: "100%",
										aspectRatio: 2 / 0.78,
									}}
									key={item.id}
									actions={[
										<Button
											type="text"
											onClick={() => deleteNews(item.id)}
											key="list-loadmore-more"
											icon={<CloseOutlined />}
										/>,
									]}
									extra={
										<img
											width="272"
											alt="logo"
											src={
												"http://localhost:8000/uploads/NewsPictures/" +
												item.image
											}
										/>
									}
								>
									<List.Item.Meta
										style={{
											textAlign: "left",
										}}
										// avatar={<Avatar src={mainimage} />}
										title={<a href={item.href}>{item.institutionName}</a>}
										description={item.created_at}
									/>
									<div
										style={{
											height: "100px",
											overflow: "hidden",
											textOverflow: "ellipsis",
										}}
									>
										{item.body}
									</div>
								</List.Item>
							</>
						)}
					</>
				)}
			/>
		</>
	);
};

export default AdminNews;
