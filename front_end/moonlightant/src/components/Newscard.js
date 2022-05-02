import React, { useEffect, useState } from "react";
import { List, Avatar, Space } from "antd";
import profileimage from "../assets/f.jpg";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import mainimage from "../assets/p.jpg";
import "../styles/newsCard.css";
import axios from "axios";
const Newscard = (props) => {
	const IconText = ({ icon, text }) => (
		<Space>
			{React.createElement(icon)}
			{text}
		</Space>
	);
	const [state, setState] = useState();
	useEffect(() => {
		axios.get("api/newsfeed").then((response) => {
			setState(response.data.newsdata);
		});
	}, []);
	const listData = [];
	for (let i = 0; i < 23; i++) {
		listData.push({
			href: mainimage,
			title: `Addis ababa science and technology`,
			avatar: profileimage,
			description: "Wed,01/02/2022",
			content:
				"We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
		});
	}
	return (
		<List
			itemLayout="vertical"
			size="large"
			pagination={{
				onChange: (page) => {
					console.log(page);
				},
				pageSize: 7,
			}}
			dataSource={state}
			renderItem={(item) => (
				<List.Item
					style={{
						boxShadow: "9px 10px 5px 0px rgba(0,0,0,0.09)",

						textAlign: "left",
						backgroundColor: "white",
						margin: "10px 0",
						borderRadius: 10,
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
					extra={<img width="272" alt="logo" src={mainimage} />}
				>
					<List.Item.Meta
						style={{ textAlign: "left" }}
						avatar={<Avatar src={mainimage} />}
						title={<a href={item.href}>Addis Ababa University</a>}
						description="Wed,01/02/2022"
					/>
					{item.body}
				</List.Item>
			)}
		/>
	);
};

export default Newscard;
