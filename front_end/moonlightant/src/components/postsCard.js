import React, { useEffect, useState } from "react";
import { Card, Avatar } from "antd";
import {
	HeartOutlined,
	EllipsisOutlined,
	ShareAltOutlined,
} from "@ant-design/icons";
import profileimage from "../assets/f.jpg";
import axios from "axios";

const { Meta } = Card;
const PostCard = () => {
	const [state, setState] = useState();
	useEffect(() => {
		axios.get("api/posts").then((response) => {
			setState(response.data.postdata);
		});
	}, []);
	return (
		<>
			{state?.map((item) => (
				<Card
					style={{
						width: "80%",
						textAlign: "left",
						alignSelf: "center",
						borderRadius: 10,
						marginBottom: 30,
					}}
					cover={
						<img
							alt="example"
							src={"http://localhost:8000/uploads/NewsPictures/" + item.image}
							style={{ padding: 10 }}
						/>
					}
					actions={[
						<ShareAltOutlined key="share" />,
						<HeartOutlined key="like" />,
						<EllipsisOutlined key="ellipsis" />,
					]}
				>
					<Card bordered={false}>{item.body}</Card>
					<Meta
						avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
						title={item.name}
						description="Addis Ababa University"
					/>
				</Card>
			))}
		</>
	);
};

export default PostCard;
