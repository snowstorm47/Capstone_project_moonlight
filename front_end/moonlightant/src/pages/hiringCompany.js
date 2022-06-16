import {
	Button,
	Card,
	Carousel,
	Col,
	Popover,
	Row,
	AutoComplete,
	Avatar,
	List,
	Modal,
	message,
	Form,
} from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import illustration from "../assets/hiringillustration.png";
import { Input, Space } from "antd";
import { flexbox } from "@mui/system";
import axios from "axios";
import Meta from "antd/lib/card/Meta";
import { useNavigate } from "react-router-dom";
// import Ripple from "../components/ripple";

const { Search } = Input;

const popoverContent = (
	<div>
		<p>Please Click Here For a More Advanced Search Result.</p>
	</div>
);

const HiringCompany = () => {
	const [notification, setNotification] = useState({
		notificationTitle: "",
		notificationDetail: "",
		sender_id: localStorage.getItem("auth_id"),
		reciever_id: "",
		seen_status: "False",
	});

	const handleInput = (e) => {
		setNotification({ ...notification, [e.target.name]: e.target.value });
	};
	const [loading, setLoading] = useState(false);
	const handleSubmit = async () => {
		setLoading(true);
		console.log(notification);
		const fData = new FormData();
		fData.append("notificationTitle", notification.notificationTitle);
		fData.append("notificationDetail", notification.notificationDetail);
		fData.append("sender_id", notification.sender_id);
		fData.append("reciever_id", notification.reciever_id);
		fData.append("seen_status", notification.seen_status);
		console.log("notificcation", notification);
		console.log(fData, "top.....");
		axios.get("/sanctum/csrf-cookie").then((response) => {
			axios.post("api/postNotification", fData).then((response) => {
				if (response.data.status === 200) {
					setLoading(false);
					setVisible(false);
					setNotification({
						...notification,
						notificationTitle: "",
						notificationDetail: "",
					});
					message.success("Notification created succesfully");
				} else {
					message.error("Notification was not created. Please try again");
				}
			});
		});
	};

	const [options, setOptions] = useState([]);
	const [result, setResult] = useState();
	const [state, setState] = useState();

	const navigate = useNavigate();

	useEffect(() => {
		axios.get(`/api/advancedSearch`).then((res) => {
			if (res.data.status === 200) {
				setResult(res.data.data);
			} else {
			}
		});
	}, []);
	const handleSearch = (value) => {
		console.log(value, "...");
		axios
			.get(`/api/advancedSearch`)
			.then((res) => {
				if (res.data.status === 200) {
					return res.data.data;
				} else {
				}
			})
			.then((data) => {
				setResult(
					data.filter((item) => {
						item.skill.map((skillObj) => skillObj.skill).includes(value);
					})
				);
			});
	};
	const [search, setSearch] = useState("");
	const [visible, setVisible] = useState(false);
	const talkClicked = (item) => {
		setVisible(true);
		setState(item);
		setNotification({ ...notification, reciever_id: item.user.id });
	};
	const onSelect = (value) => {
		console.log("onSelect", value);
	};

	return (
		<div>
			<div className="topContainer" style={{ marginBottom: "5erm" }}>
				<div className="wordCaroselContainer" style={{ marginBottom: "2erm" }}>
					<div>
						<Carousel
							style={{ width: "auto", marginleft: "20px", display: "flex" }}
							autoplay
							dots={false}
							effect="fade"
						>
							<Card bordered={false} className="homeCard">
								<h1 style={{ color: "black" }}>
									Stay connected to your community
								</h1>
								<span>
									we offer multiple convinient ways of connecting you with the
									community you learned and grew up with by using either news,
									posts from fellow students or notifications
								</span>
							</Card>
							<Card bordered={false} className="homeCard">
								<h1 style={{ color: "black" }}>
									Find jobs best suited for you
								</h1>
								<span>
									Employers accross the country will have access to your profile
									through our advanced filtering method for better
									compatability.
								</span>
							</Card>
							<Card bordered={false} className="homeCard">
								<h1 style={{ color: "black" }}>
									Get the latest news from Institutions
								</h1>
								<span>
									Get news from multiple institutions located in different
									cities accross the country with the option to filter it to
									your personal institution of choice.
								</span>
							</Card>
							{/* <Ripple/> */}
						</Carousel>

						{/*               
               <div style={{marginBottom:"5rem"}}>
                <Space direction="vertical" style={{ width: "50rem", marginBottom:'15rem'}}>
               
                </Space>
                </div> */}
					</div>
				</div>

				<div className="image" style={{ paddingBottom: "5rem" }}>
					<img
						src={illustration}
						className="illustration"
						alt=""
						style={{ height: "22rem", width: "22rem", marginBottom: "5rem" }}
					/>
				</div>
			</div>
			<div
				style={{
					width: "100%",
					display: "flex",
					flex: 1,
					flexDirection: "row",
					flexWrap: "wrap",
					alignItems: "flex-start",
				}}
			>
				<Row
					style={{
						width: "100%",
						justifyContent: "center",
						position: "relative",
					}}
				>
					<Input.Search
						style={{ width: "60rem" }}
						size="middium"
						placeholder="Search using skill"
						enterButton
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						onSearch={(e) => handleSearch(e)}
					/>

					<Popover content={popoverContent} title="Advanced Search">
						<Button
							type="primary"
							onClick={() => navigate("advancedSearch")}
							style={{ marginRight: "auto", marginRight: 0 }}
						>
							{" "}
							Advanced Search
						</Button>
					</Popover>
				</Row>
				<List
					grid={{
						gutter: 16,
						column: 4,
					}}
					pagination={true}
					dataSource={result}
					renderItem={(item) => (
						<List.Item>
							<Card
								style={{
									width: "20rem",
									margin: 40,
									boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
								}}
							>
								<Avatar
									src={
										"http://localhost:8000/uploads/ProfilePicture/" +
										item.student[0]?.image
									}
									icon={<UserOutlined />}
									alt="A"
									size={80}
								/>
								<Meta
									style={{ textAlign: "left", width: "auto" }}
									title={item.user.name}
									description={item.user?.email}
								/>
								<div
									style={{
										paddingTop: 20,
										paddingBottom: 20,
										alignItems: "flex-start",
									}}
								>
									{item.skill?.map((item) => {
										return (
											<button
												style={{
													color: "white",
													borderRadius: 100,
													border: 0,
													margin: 2,
													backgroundColor: "#0080ff",
												}}
											>
												#{item.skill}
											</button>
										);
									})}
								</div>
								<Button
									type="primary"
									onClick={() => talkClicked(item)}
									style={{ width: "100%" }}
								>
									Talk
								</Button>
							</Card>
						</List.Item>
					)}
				/>

				<Modal
					visible={visible}
					title={"Send " + state?.user.name + " a notification"}
					footer={false}
					onCancel={() => setVisible(false)}
				>
					<Form
						name="basic"
						labelCol={{
							span: 8,
						}}
						wrapperCol={{
							span: 16,
						}}
						onFinish={() => handleSubmit()}
						// autoComplete="off"
						method="POST"
					>
						<Form.Item>
							<Input
								placeholder="Notification Title"
								name="notificationTitle"
								value={notification.notificationTitle}
								onChange={handleInput}
								required
							/>
						</Form.Item>

						<Form.Item>
							<Input.TextArea
								placeholder="Notification Detail"
								size="large"
								name="notificationDetail"
								value={notification.notificationDetail}
								onChange={handleInput}
								style={{ width: "100%" }}
								required
							/>
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								style={{ width: "100%" }}
								htmlType="submit"
								loading={loading}
							>
								Create Notification <SendOutlined />
							</Button>
						</Form.Item>
					</Form>
				</Modal>
				{/* <div style={{ width: "30%", backgroundColor: "red", height: 100 }}>
					{" "}
				</div> */}
			</div>
		</div>
	);
};

export default HiringCompany;
