import { Card, Avatar } from "antd";
import {
	HeartOutlined,
	EllipsisOutlined,
	ShareAltOutlined,
} from "@ant-design/icons";
import profileimage from "../assets/f.jpg";

const { Meta } = Card;
const postCard = () => {
	return (
		<Card
			style={{
				width: "80%",
				textAlign: "left",
				alignSelf: "center",
				borderRadius: 10,
				marginBottom: 30,
			}}
			cover={<img alt="example" src={profileimage} style={{ padding: 10 }} />}
			actions={[
				<ShareAltOutlined key="share" />,
				<HeartOutlined key="like" />,
				<EllipsisOutlined key="ellipsis" />,
			]}
		>
			<Card bordered={false}>
				<span>
					new real estate near bole medhanaialem, very happy with the purchase
				</span>
			</Card>
			<Meta
				avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
				title="jane doe"
				description="Addis Ababa University"
			/>
		</Card>
	);
};

export default postCard;
