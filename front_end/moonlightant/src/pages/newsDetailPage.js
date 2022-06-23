import "../styles/newsDetail.css";
import mainimage from "../assets/p.jpg";
import { useLocation } from "react-router-dom";
import { Avatar, Card, Divider } from "antd";
import Newscard from "../components/Newscard";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";
import Sider from "antd/lib/layout/Sider";

const NewsDetail = () => {
	const { state } = useLocation();
	return (
		<div className="newsDetailContainer">
			<div className='divInside'style={{width:'100%',height:'100px',
			background:'rgb(0,0,0,0.5) !important',
			height:'100%',
			border:'1px solid black !important',
				backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs8XGHyMmmTM7yi39nHzdGsfyCU7xl0_LwRQ&usqp=CAU")`,
				 }}>
				<Card bordered={false} className="newscard">
					<Avatar
						size={75}
						src={
							"http://localhost:8000/uploads/NewsPictures/" + state.item?.profile
						}
						icon={<UserOutlined />} 

					/>
					<a
						href={state.item.href}
						style={{
							color:"white",
							paddingLeft: "5px",
		
							fontSize: "15px",
							fontWeight: "bold",
						}}
					>
						{state.item.institutionName}
					</a>

				</Card></div>
			<div style={{flexDirection:'row',marginLeft:'10%',paddingTop:'3em',display:'flex',}}>
			<div className="leftnewsDetail">
				
				<img
					width="100%"
					alt="image"
					src={"http://localhost:8000/uploads/NewsPictures/" + state.item.image}
				/>
				<h1 className="newsdetailTitle">{state.item.title}</h1>
				<h3 style={{}}>Created at</h3>
				<p style={{ color: "black"}}>{state.item.created_at.slice(0,10)}</p>
				<Divider orientation="left"></Divider>
				
				
				<div dangerouslySetInnerHTML={{__html:state.item.body}}></div>
			</div>

			
			</div>
		</div>
	);
};

export default NewsDetail;
