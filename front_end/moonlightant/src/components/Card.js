import { Card, Avatar } from "antd";
import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
} from "@ant-design/icons";
import profileimage from "../assets/f.jpg";
const { Meta } = Card;

const NewsCard = () => {
	return (
		<Card
			hoverable
			size="small"
			bordered
			style={{ width: 300 }}
			cover={<img alt="example" src={mainimage} />}
			actions={[
				<SettingOutlined key="setting" />,
				<EditOutlined key="edit" />,
				<EllipsisOutlined key="ellipsis" />,
			]}
		>
			<Meta
				avatar={<Avatar src={profileimage} />}
				title="Addis Ababa Science and technology"
				description="Contrary to popular belief, Lorem Ipsum is not simply random text..."
			/>
		</Card>
	);
};

export default NewsCard;
