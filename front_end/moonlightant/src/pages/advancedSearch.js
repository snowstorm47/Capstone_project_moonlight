import React, { useEffect, useState } from "react";
import "../styles/AdvancedSearch.css";
import { useNavigate } from "react-router-dom";
import {
	Avatar,
	Badge,
	Card,
	Checkbox,
	Col,
	Divider,
	InputNumber,
	Layout,
	List,
	Menu,
	Radio,
	Row,
	Select,
	Skeleton,
	Slider,
} from "antd";
import Sider from "antd/lib/layout/Sider";
import { Content } from "antd/lib/layout/layout";
import Search from "antd/lib/transfer/search";
import Meta from "antd/lib/card/Meta";
import InfiniteScroll from "react-infinite-scroll-component";
import { EyeFilled, EyeOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";

const AdvancedSearch = () => {
	const [count, setCount] = useState(0);
	const sendNotification = () => {
		selected.forEach((item) => {
			console.log(item);
		});
	};
	const filter = () => {
		setCount(count + 1);
		axios
			.get(`/api/advancedSearch`)
			.then((res) => {
				if (res.data.status === 200) {
					setSearchResults(res.data.data);
				} else {
					console.log("inside else");
				}
			})
			.then(() => {
				setSearchResults(
					searchResults.filter((item) => {
						setSearchResults(item.student[0]?.GPA);
						if (
							item.skill
								.map((skillObj) => skillObj.skill)
								.includes(search.skill) ||
							item.student[0]?.GPA >= search.gpa ||
							item.student[0]?.institution_id === search.institution
						) {
							return true;
						} else {
							return false;
						}
					})
				);
			});
	};
	const [search, setSearch] = useState({
		skill: "",
		gpa: "",
		institution: "",
		department: "",
		college: "",
		experience: "",
		educationStatus: "",
		position: "",
	});
	const [college, setCollege] = useState([{ departmentName: "-none-" }]);
	const [department, setDepartment] = useState([{ departmentName: "-none-" }]);
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [state, setState] = useState();
	const [searchResults, setSearchResults] = useState();
	const [data, setData] = useState([]);
	const [institutions, setinstitutions] = useState([
		{ institutionName: "Addis Ababa Science & Technology University" },
		{ institutionName: "Bahirdar university" },
		{ institutionName: "Bulehora University" },
		{ institutionName: "Unity college" },
		{ institutionName: "Addis Ababa University" },
	]);
	const selected = [];

	const loadMoreData = () => {
		if (loading) {
			return;
		}
		setLoading(true);
		axios
			.get(`/api/advancedSearch?skill=&position=&gpa=&institution=`)
			.then((res) => {
				if (res.data.status === 200) {
					setSearchResults(res.data.data);
				} else {
					console.log("inside else");
				}
			})
			.catch(() => {
				setLoading(false);
			});
		// .then((res) => res.json())
		// .then((body) => {
		// 	setData([...data, ...body.results]);

		// 	setLoading(false);
		// })
	};

	useEffect(() => {
		console.log(searchResults);
		axios
			.get(
				`/api/advancedSearch?skill=${search.skill}&position=${search.position}&gpa=${search.gpa}&institution=${search.institution}`
			)
			.then((res) => {
				if (res.data.status === 200) {
					setSearchResults(res.data.data);
				} else {
					console.log("inside else");
				}
			});
	}, [search]);

	useEffect(() => {
		console.log("updated.....");
		axios.get("/sanctum/csrf-cookie").then((res) => {
			axios.get(`/api/institutions`).then((res) => {
				if (res.data.status === 200) {
					setinstitutions(res.data.data);
				} else {
					console.log("inside else");
				}
			});
			axios.get(`/api/College`).then((res) => {
				if (res.data.status === 200) {
					setCollege(res.data.data);
				} else {
					console.log("inside else");
				}
			});
			axios.get(`/api/Department`).then((res) => {
				if (res.data.status === 200) {
					setDepartment(res.data.data);
				} else {
					console.log("inside else");
				}
			});
		}, []);
	}, []);
	return (
		<Layout style={{ display: "flex", flexDirection: "row" }}>
			<Sider
				width={256}
				scrollable
				style={{
					minHeight: "90vh",
					backgroundColor: "#0080ff",
					padding: "10px 10px",
					overflowY: "hidden",
				}}
			>
				<div
					style={{
						height: "32px",
						background: "rgba(255,255,255,.2)",
						color: "black",
						margin: "16px",
					}}
				>
					Search
				</div>
				<Search
					placeholder="search a skill"
					onChange={(e) => {
						setSearch({ ...search, skill: e.target.value });
					}}
					enterButton="Search"
				/>
				<Divider orientation="left" style={{ color: "white" }}>
					Experience
				</Divider>
				<InputNumber
					min={0}
					max={20}
					value={search.experience}
					onChange={(e) => {
						setSearch({ ...search, experience: e });
					}}
					style={{ margin: "0 16px" }}
				/>
				<Divider orientation="left" style={{ color: "white" }}>
					Academics
				</Divider>
				<strong
					style={{
						alignItems: "flex-start",
						color: "white",
						fontWeight: "bold",
						fontSize: "12px",
					}}
				>
					GPA
				</strong>

				<Slider
					style={{ color: "white" }}
					min={0}
					max={4}
					step={0.1}
					value={search.gpa}
					onChange={(e) => {
						setSearch({ ...search, gpa: e });
					}}
					marks={{
						0: "0",
						1: "1",
						2: "2",
						3: "3",
						4: "4",
					}}
				/>
				<Select
					style={{ width: "100%", margin: "5px" }}
					placeholder="Institution"
					value={search.institution}
					onChange={(e) => {
						setSearch({ ...search, institution: e });
					}}
				>
					{institutions.map((item) => (
						<Select.Option style={{ width: "auto" }} value={item.id}>
							{item.institutionName}
						</Select.Option>
					))}
				</Select>
				<Select
					placeholder="college"
					onChange={(e) => {
						setSearch({ ...search, department: e });
					}}
					style={{ width: "45%", margin: "5px" }}
				>
					{college.map((item) => (
						<Select.Option style={{ width: "auto" }} value={item.id}>
							{item.departmentName}
						</Select.Option>
					))}
				</Select>
				<Select
					placeholder="Department"
					onChange={(e) => {
						e.preventDefault();
						setSearch({ ...search, field: e });
					}}
					style={{
						width: "45%",
						margin: "5px",
					}}
				>
					{department.map((item) => (
						<Select.Option style={{ width: "auto" }} value={item.id}>
							{item.departmentName}
						</Select.Option>
					))}
				</Select>
				<Radio.Group
					onChange={(e) => {
						setSearch({ ...search, educationStatus: e.target.value });
					}}
				>
					<Radio value="Graduated" style={{ color: "white" }}>
						Graduated
					</Radio>
					<Radio value="Student" style={{ color: "white" }}>
						Student
					</Radio>
				</Radio.Group>
				<button onClick={filter}>click</button>
			</Sider>
			{/* the content starts here */}
			<Content
				style={{
					margin: "40px 40px",
					padding: 24,
					background: "#fff",
					minHeight: 280,
				}}
			>
				{/* personal card here with info */}

				<div className="personInfoCard">
					{state ? (
						<>
							{" "}
							<div
								style={{
									backgroundColor: "white",
									padding: "20px",
									borderBottomRightRadius: "20px",
								}}
							>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
									}}
								>
									<Meta
										style={{ textAlign: "left", width: "auto" }}
										avatar={
											<Avatar
												src={
													"http://localhost:8000/uploads/ProfilePicture/" +
													state?.user.image
												}
												icon={<UserOutlined />}
												alt="A"
												size={64}
											/>
										}
										title={state ? state.user.name : "john doe"}
										description={state.user?.email}
									/>
									<button
										type=""
										style={{
											marginLeft: "auto",
											color: "white",
											padding: "5px 10px",
											borderRadius: "5px",
											border: 0,
											margin: 2,
											backgroundColor: "#0080ff",
										}}
									>
										View Profile
									</button>
								</div>
								<div style={{ textAlign: "left", paddingTop: "10px" }}>
									{state.skill.map((item) => {
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
							</div>
							<div
								style={{
									flexDirection: "row",
									display: "flex",
									justifyContent: "space-between",
									borderTopLeftRadius: "20px",
								}}
							>
								<div
									style={{
										width: "    45%",
										textAlign: "left",
										padding: "10px",
										fontFamily: "monospace",
									}}
								>
									{" "}
									<Divider
										orientation="left"
										style={{ width: "20px", color: "black" }}
									>
										Academics
									</Divider>
									<div style={{ padding: "10px 0px" }}>
										<span
											style={{
												fontSize: "15px",
												color: "black",
												fontWeight: "bold",
											}}
										>
											Institution
										</span>
										<br />
										<span style={{ color: "gray" }}>
											{
												institutions[state.student[0]?.institution_id - 1]
													?.institutionName
											}
										</span>
									</div>
									<div style={{ padding: "10px 0px" }}>
										<span
											style={{
												fontSize: "15px",
												color: "black",
												fontWeight: "bold",
											}}
										>
											Department
										</span>
										<br />
										<span style={{ color: "gray" }}>
											{" "}
											College of Electrical and Mechanical engineering
										</span>
									</div>
									<div style={{ padding: "10px 0px" }}>
										<span
											style={{
												fontSize: "15px",
												color: "black",
												fontWeight: "bold",
											}}
										>
											Major
										</span>
										<br />
										<span style={{ color: "gray" }}>
											{" "}
											{state.student[0]?.major}
										</span>
									</div>
									<div style={{ padding: "10px 0px" }}>
										<span
											style={{
												fontSize: "15px",
												color: "black",
												fontWeight: "bold",
											}}
										>
											GPA
										</span>
										<br />
										<span style={{ color: "gray" }}>
											{state.student[0]?.GPA}
										</span>
									</div>
								</div>
								<div
									style={{
										width: "45%",
										textAlign: "left",
										padding: "10px",
										fontFamily: "sans-serif",
									}}
									bordered={false}
								>
									<Divider
										orientation="left"
										style={{ width: "20px", color: "black" }}
									>
										Experience
									</Divider>
									{state.history.map((history) => {
										return (
											<>
												<span
													style={{
														fontSize: "15px",
														fontWeight: "bold",
														color: "black",
													}}
												>
													{history.companyName}
												</span>
												<br />
												<span style={{ color: "gray" }}>
													{history.position}
												</span>
												<br />
											</>
										);
									})}
								</div>
							</div>
						</>
					) : (
						<p>it worrks</p>
					)}
				</div>

				<div className="searchResultContainer">
					<div
						style={{
							display: "flex",

							zIndex: 10,
							width: "100%",
							backgroundColor: "blue",
							position: "sticky",
							textAlign: "center",
						}}
					>
						<h1 style={{}}>Results</h1>
						<button onClick={sendNotification}>send</button>
					</div>

					<InfiniteScroll
						dataLength={data.length}
						next={loadMoreData}
						style={{ paddingTop: "20px" }}
						hasMore={data.length < 50}
						loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
						endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
						scrollableTarget="scrollableDiv"
					>
						<List
							dataSource={searchResults}
							renderItem={(item) => (
								<List.Item key={item.user.id}>
									<List.Item.Meta />
									<div
										style={{
											width: "100%",
											display: "flex",
											flexDirection: "row",
										}}
									>
										<Checkbox
											style={{ paddingLeft: "10px", paddingRight: "20px" }}
											value={item.user.id}
											onChange={(e) => {
												if (e.target.checked) {
													selected.push(item.user.id);
												} else {
													selected.splice(selected.indexOf(e.target.value), 1);
												}

												console.log("hello,,,", selected);
											}}
										/>
										<Meta
											style={{ textAlign: "left", alignSelf: "flex-start" }}
											avatar={
												<Avatar
													src={
														"http://localhost:8000/uploads/ProfilePicture/" +
														item.student[0]?.image
													}
													icon={<UserOutlined />}
												/>
											}
											icon={<UserOutlined />}
											title={item.user.name}
											description={item.user.email}
										/>
										<button
											onClick={() => setState(item)}
											style={{
												borderRadius: "100px",
												border: "0px",
												backgroundColor: "white",
												marginLeft: "auto",
											}}
										>
											{item.user.name === state?.user.name ? (
												<EyeOutlined
													style={{
														color: "white",
														padding: 4,
														backgroundColor: "#0080ff",
														borderRadius: "100Px",
													}}
													value={item}
													onClick={() => {
														setState(item);
													}}
												/>
											) : (
												<EyeOutlined
													style={{ padding: 4 }}
													value={item.user.name}
													onclick={() => setState(item)}
												/>
											)}
										</button>
									</div>
								</List.Item>
							)}
						/>
					</InfiniteScroll>
				</div>
			</Content>
		</Layout>
	);
};

export default AdvancedSearch;
