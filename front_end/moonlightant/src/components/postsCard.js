import React, { useEffect, useState } from "react";
import { Card, Avatar, Divider,Image } from "antd";
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
	const [postImage,setPostImage] = useState();
	useEffect(() => {
		axios.get("api/posts").then((response) => {
			setState(response.data.data);
			setPostImage(response.data.data.firstPicture);
			console.log(response.data.data);
		});
	}, []);
	// useEffect(() => {
	// 	axios.get(`api/getPostPicture/${id}`).then((response) => {
	// 		setPicture(response.data.image);
	// 	});
	// }, []);
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
							src={"http://localhost:8000/uploads/PostPicture/" + item.firstPicture?.image}
							style={{ padding: 10 }}
						/>
						
					}
					actions={[
						<ShareAltOutlined key="share" />,
						<HeartOutlined key="like" />,
						<EllipsisOutlined key="ellipsis" />,
					]}
				>
					<Image.PreviewGroup>
					{item.postPicture.map((item) => (
					<>
						<Image
							alt="example"
							width={100}
							src={"http://localhost:8000/uploads/PostPicture/" + item.image}
							style={{ 
								// width:"25%",
								height:"60px",
								marginTop: "0.1rem",
								marginLeft: "0.5rem",
								marginRight: "0.5rem",
								paddingLeft:"0.5rem"
							}}
						/>
					</>
				))}
				</Image.PreviewGroup>
				<Divider></Divider>
					<Card bordered={false}>{item.postdata.body}</Card>
					<Meta
						avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
						title={item.user[0].name}
						description="Addis Ababa University"
					/>
				</Card>
			))}
		</>
	);
};

export default PostCard;
