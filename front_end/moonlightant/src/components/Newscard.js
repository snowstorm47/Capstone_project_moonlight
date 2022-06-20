import React, { useEffect, useState } from "react";
import { List, Avatar, Space, Skeleton } from "antd";
import profileimage from "../assets/f.jpg";
import { MessageOutlined, LikeOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";
import mainimage from "../assets/p.jpg";
import "../styles/newsCard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Newscard = ({ state, loading }) => {
	const { width } = window.innerWidth;
	const navigate = useNavigate();

	const IconText = ({ icon, text }) => (
		<Space>
			{React.createElement(icon)}
			{text}
		</Space>
	);

	return (
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
					<>
						<List.Item
							onClick={() => navigate("news", { state: { item } })}
							style={{
								boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
								textAlign: "left",
								backgroundColor: "white",
								margin: "10px 0",
								borderRadius: 10,
								width: "100%",
								aspectRatio: 2 / 0.78,
							}}
							key={item.id}
							// actions={[
							// 	<IconText
							// 		icon={StarOutlined}
							// 		text="156"
							// 		key="list-vertical-star-o"
							// 	/>,
							// 	<IconText
							// 		icon={LikeOutlined}
							// 		text="156"
							// 		key="list-vertical-like-o"
							// 	/>,
							// 	<IconText
							// 		icon={MessageOutlined}
							// 		text="2"
							// 		key="list-vertical-message"
							// 	/>,
							// ]}
							extra={
								<div
									style={{
										height: "100%",
										width: "auto",
										maxWidth: 272,
										alignItems: "center",
										justifyContent: "center",
										display: "flex",
									}}
								>
									<img
										style={{
											maxHeight: "100%",
											maxWidth: "100%",
										}}
										alt="logo"
										src={
											"http://localhost:8000/uploads/NewsPictures/" + item.image
										}
									/>
								</div>
							}
						>
							<List.Item.Meta
								style={{
									textAlign: "left",
									overflow: "hidden",

								}}
								avatar={<Avatar size="large"	src={
									"http://localhost:8000/uploads/ProfilePicture/" +
									item?.profile
								}
								icon={<UserOutlined />} />}
								title={
									<a href={item.href} style={{  }}>
										{item.institutionName}
									</a>
								}
								description={item.created_at}
							/>
							<div
								style={{
									height: 106,
									overflow: "hidden",
									textOverflow: "ellipsis",
								}}
							>
								{item.body}
							</div>
						</List.Item>
					</>
				</>
			)}
		/>
	);
};

export default Newscard;
