import React, { useEffect, useState } from "react";
import { List, Avatar, Space, Skeleton } from "antd";
import profileimage from "../assets/f.jpg";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
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
					{item == null ? (
						<>
							<Skeleton loading={true} active avatar></Skeleton>
							<Skeleton loading={true} active avatar></Skeleton>
							<Skeleton loading={true} active avatar></Skeleton>
						</>
					) : (
						<>
							<List.Item
								onClick={() => navigate("news", { state: { item } })}
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
									<IconText
										icon={StarOutlined}
										text="156"
										key="list-vertical-star-o"
									/>,
									<IconText
										icon={LikeOutlined}
										text="156"
										key="list-vertical-like-o"
									/>,
									<IconText
										icon={MessageOutlined}
										text="2"
										key="list-vertical-message"
									/>,
								]}
								extra={
									<img
										width="272"
										alt="logo"
										src={
											"http://localhost:8000/uploads/NewsPictures/" + item.image
										}
									/>
								}
							>
								<List.Item.Meta
									style={{
										textAlign: "left",
									}}
									avatar={<Avatar src={mainimage} />}
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
	);
};

export default Newscard;
