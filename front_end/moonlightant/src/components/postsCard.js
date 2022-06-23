import {
	Card,
	Avatar,
} from "antd";
import {
	EllipsisOutlined,
	HeartOutlined,
	ShareAltOutlined,
	UserAddOutlined,
	UserOutlined,
} from "@ant-design/icons";

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
					
				>
					<Card bordered={false}>{item.postdata.body}</Card>
					<Meta
						avatar={
							<Avatar
								src={
									"http://localhost:8000/uploads/ProfilePicture/" +
									item.profileImage[0]?.image
								}
								icon={<UserOutlined/>}
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
