import React, { useEffect, useState } from "react";
import { Card, Avatar,Button, message,} from "antd";
import {
	HeartOutlined,
	EllipsisOutlined,
	ShareAltOutlined,
    CloseOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Meta } = Card;
const AdminPost = () => {
	const [state, setState] = useState();
	useEffect(() => {
		axios.get("api/posts").then((response) => {
			setState(response.data.postdata);
		});
	}, []);
    
    const deletePost = (id) => {
        console.log(id)
        axios.delete(`/api/deletePost/${id}`).then((res) => {
            if (res.data.status === 200) {
                message.success("Post deleted");
              } else {
                message.error("Post not deleted");
              }
        });
      };
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
                        
                        <Button
                        type="text"
                        onClick={() => deletePost(item.id)}
                        key="list-loadmore-more"
                        icon={<CloseOutlined />}
                      />,
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

export default AdminPost;
