import React from "react";
import { Card, Avatar } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import food from "../assets/man.jpg";
const ProfileDetail = () => {
	return (
		<Card
			title=""
			style={{
				marginTop: 30,
				marginRight: 10,
				marginLeft: 10,
				width: 250,
				position: "fixed",
				height: 500,
				borderRadius: 10,
				backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs8XGHyMmmTM7yi39nHzdGsfyCU7xl0_LwRQ&usqp=CAU")`,
			}}
		>
			<Avatar
				size={{
					xs: 24,
					sm: 32,
					md: 40,
					lg: 64,
					xl: 70,
					xxl: 100,
				}}
				src={food}
				style={{ zIndex: 10 }}
			/>
			<Card
				type="inner"
				bordered={false}
				style={{
					marginTop: -10,
					marginRight: -25,
					marginLeft: -25,
				}}
			>
				<h3>Jane Doe</h3>
				<span style={{ color: "gray" }}>Developer</span>
			</Card>
			<Card
				type="inner"
				title="Experience"
				extra={<a href="#">More</a>}
				style={{
					marginTop: -10,
					marginRight: -25,
					marginLeft: -25,
					paddingBottom: 20,
					textAlign: "left",
				}}
			>
				<h4>Berbera</h4>
				<span style={{ color: "gray" }}>developer</span>
			</Card>
			<Card
				type="inner"
				title="Skills"
				extra={<a href="#">More</a>}
				style={{
					marginTop: -10,
					marginRight: -25,
					marginLeft: -25,
					paddingBottom: 20,
					textAlign: "left",
				}}
			>
				<p style={{ color: "gray" }}>#developer</p>
				<p style={{ color: "gray" }}>#React</p>
				<p style={{ color: "gray" }}>#java</p>
			</Card>
		</Card>
	);
};
export default ProfileDetail;
