import React from "react";
import { List, Avatar, Space } from "antd";
import profileimage from "../assets/f.jpg";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import mainimage from "../assets/p.jpg";
import "../styles/newsCard.css";
const Newscard = (props) => {
	const IconText = ({ icon, text }) => (
		<Space>
			{React.createElement(icon)}
			{text}
		</Space>
	);
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
				pageSize: 3,
			}}
			dataSource={listData}
			footer={
				<div>
					<b>ant design</b> footer part
				</div>
			}
			renderItem={(item) => (
				<List.Item
					style={{
						textAlign: "left",
						backgroundColor: "white",
						margin: "10px 0",
					}}
					key={item.title}
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
					extra={<img width={272} alt="logo" src={mainimage} />}
				>
					<List.Item.Meta
						style={{ textAlign: "left" }}
						avatar={<Avatar src={item.avatar} />}
						title={<a href={item.href}>{item.title}</a>}
						description={item.description}
					/>
					{item.content}
				</List.Item>
			)}
		/>
	);
};

export default Newscard;
