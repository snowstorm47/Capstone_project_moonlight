import { Card, List, Avatar } from "antd";
import { useState,useEffect } from "react";
import axios from "axios";
import "../styles/recomendations.css";

const Recomendation = () => {
	const [recommend, setRecommend] = useState();
	const id = localStorage.getItem('auth_id');
	useEffect(() => {
		axios.get(`/api/getRecommendation/${id}`).then((res) => {
		  if (res.data.status === 200) {
			setRecommend(res.data.recommendation);
		  } else {
			console.log("couldnt retrieve data");
		  }
		});
	  }, []);
	return (
		
		<Card
			title="Recommendations"
			// extra={<a href="#">More</a>}
			bordered={true}
			className="cards"
			style={{
				width: 320,
				position: "fixed",
				textAlign: "left",
				marginTop: 30,
				borderRadius: 10,
				marginRight: 10,
				marginLeft: 10,
			}}
		>
			<List
				itemLayout="horizontal"
				dataSource={recommend}
				renderItem={(item) => (
					<><List.Item>
						<List.Item.Meta
							avatar={<Avatar src={"http://localhost:8000/uploads/ProfilePicture/" +
								item.image[0].image} />}
							title={<span>{item.recommendation.name}</span>}
							description={item.recommendation.recomendationDetail} />
							{/* <Collapse defaultActiveKey={['1']} ghost>
							<Panel header="This is panel header 1" key="1">
								<p>{item.recommendation.recomendationDetail}</p>
							</Panel>
						</Collapse> */}
					</List.Item>
					</>
				)}
			/>
		</Card>
	);
};

export default Recomendation;
