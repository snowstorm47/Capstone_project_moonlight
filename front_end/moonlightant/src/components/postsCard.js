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
const PostCard = ({ state }) => {
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
							src={
								"http://localhost:8000/uploads/NewsPictures/" +
								item.postdata.image
							}
							style={{ padding: 10 }}
						/>
					}
					actions={[
						<ShareAltOutlined key="share" />,
						<HeartOutlined key="like" />,
						<EllipsisOutlined key="ellipsis" />,
					]}
				>
					<Card bordered={false}>{item.postdata.body}</Card>
					<Meta
						avatar={
							<Avatar
								src={
									"http://localhost:8000/uploads/ProfilePicture/" +
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

export default PostCard;
