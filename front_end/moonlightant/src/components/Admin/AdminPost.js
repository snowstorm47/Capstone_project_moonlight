import React, { useEffect, useState } from "react";
import { Card, Modal, Avatar, Button, message, Input } from "antd";
import {
	HeartOutlined,
	EllipsisOutlined,
	ShareAltOutlined,
	CloseOutlined,
} from "@ant-design/icons";
import axios from "axios";
import PostCard from "../postsCard";
import Search from "antd/lib/transfer/search";

const { Meta } = Card;
const AdminPost = () => {
	const [state, setState] = useState();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [ids, setIds] = useState({ id: "" });
	const showModal = (id) => {
		setIsModalVisible(true);
		console.log(isModalVisible);
		setIds({ id: id });
	};

	const handleOk = (id) => {
		setIsModalVisible(false);
		deletePost(id);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	useEffect(() => {
		axios.get("api/posts").then((response) => {
			setState(response.data.postdata);
		});
	}, []);

	const deletePost = (id) => {
		console.log(id);
		axios.delete(`/api/deletePost/${id}`).then((res) => {
			if (res.data.status === 200) {
				message.success("Post deleted");
				axios.get("api/posts").then((response) => {
					setState(response.data.postdata);
				});
			} else {
				message.error("Post not deleted");
			}
		});
	};
	return (
		<>
			<Modal
				title="Delete Post"
				visible={isModalVisible}
				onOk={() => handleOk(ids.id)}
				onCancel={handleCancel}
			>
				Do You Want to Delete The Post
			</Modal>
			{state?.map((item) => (
				<Card
					style={{
						boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
						width: "80%",
						textAlign: "left",
						alignSelf: "center",
						borderRadius: 10,
						marginBottom: 30,
					}}
					cover={
						<img
							alt="example"
							src={
								"http://localhost:8000/uploads/NewsPictures/" +
								item.postdata?.image
							}
							style={{ padding: 10 }}
						/>
					}
					actions={[
						<Button
							type="text"
							onClick={() => showModal(item.id)}
							key="list-loadmore-more"
							icon={<CloseOutlined />}
						/>,
					]}
				>
					<Card bordered={false}>{item.postdata.body}</Card>
					<Meta
						avatar={
							<Avatar
								src={
									"http://localhost:8000/uploads/ProfileImage/" +
									item.profileImage[0]?.image
								}
							/>
						}
						title={item.postdata.name}
						description={item.postdata.email}
					/>
				</Card>
			))}
		</>
	);
};

export default AdminPost;
