import { Card, List, Avatar } from "antd";

import "../styles/recomendations.css";

const Recomendation = () => {
	const data = [
		{
			title: "Yohanes Samuel",
		},
		{
			title: "Amanuel Zerihun",
		},
		{
			title: "Yabsera Daniel",
		},
	];
	return (
		<Card
			title="Recomendations"
			extra={<a href="#">More</a>}
			bordered={true}
			style={{
				width: "100%",
				textAlign: "left",
				marginTop: 30,
				marginRight: 10,
				marginLeft: 10,
			}}
		>
			<List
				itemLayout="horizontal"
				dataSource={data}
				renderItem={(item) => (
					<List.Item>
						<List.Item.Meta
							avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
							title={<a href="https://ant.design">{item.title}</a>}
							description="Very professional and well versed in the field. would be a greate addition to your team"
						/>
					</List.Item>
				)}
			/>
		</Card>
	);
};

export default Recomendation;
