import "../styles/newsDetail.css";
import mainimage from "../assets/p.jpg";

const NewsDetail = (props) => {
	console.log(props);
	return (
		<div className="newsDetailContainer">
			<img width="60%" alt="logo" src={mainimage} />
			<h1>{props.body}</h1>
		</div>
	);
};

export default NewsDetail;
