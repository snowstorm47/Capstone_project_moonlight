import "../styles/newsDetail.css";
import mainimage from "../assets/p.jpg";
import { useLocation } from "react-router-dom";
import { Avatar, Card } from "antd";
import Newscard from "../components/Newscard";
import { useEffect, useState } from "react";
import axios from "axios";

const NewsDetail = () => {
	const { state } = useLocation();
	return (
		<div className="newsDetailContainer">
			<div className="leftnewsDetail">
				<h1 className="newsdetailTitle">{state.item.title}</h1>
				<Card bordered={false} className="newscard">
					<Avatar
						size="large"
						src={
							"http://localhost:8000/uploads/NewsPictures/" + state.item?.profile
						}
					/>
					<a
						href={state.item.href}
						style={{
							paddingLeft: "5px",
							color: "black",
							fontSize: "15px",
							fontWeight: "bold",
						}}
					>
						{state.item.institutionName}
					</a>
					<p style={{ color: "gray" }}>{state.item.created_at}</p>
				</Card>
				<img
					width="50%"
					alt="image"
					src={"http://localhost:8000/uploads/NewsPictures/" + state.item.image}
				/>

				<p className="newsdetailBody">{state.item.body}</p>
			</div>
			<div width="40%"></div>
		</div>
	);
};

export default NewsDetail;
