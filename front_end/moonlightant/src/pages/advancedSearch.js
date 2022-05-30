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
import { EyeFilled, EyeOutlined } from "@ant-design/icons";
import axios from "axios";

const AdvancedSearch = () => {
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
	const [state, setState] = useState({
		name: "John Doe",
		image: "https://joeschmoe.io/api/v1/random",
	});
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
					console.log("found...", searchResults);
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
		axios
			.get(
				`/api/advancedSearch?skill=${search.skill}&position=${search.position}&gpa=${search.gpa}&institution=${search.institution}`
			)
			.then((res) => {
				if (res.data.status === 200) {
					setSearchResults(res.data.data);
					console.log("found...", searchResults);
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
						e.preventDefault();
						setSearch({ ...search, skill: e.target.value });
						console.log(search);
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
						console.log(search);
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
						console.log(search);
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
						console.log(search);
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
						console.log(e);
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
						console.log(search);
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
						console.log(search);
					}}
				>
					<Radio value="Graduated" style={{ color: "white" }}>
						Graduated
					</Radio>
					<Radio value="Student" style={{ color: "white" }}>
						Student
					</Radio>
				</Radio.Group>
			</Sider>

			<Content
				style={{
					margin: "40px 40px",
					padding: 24,
					background: "#fff",
					minHeight: 280,
				}}
			>
				<div className="personInfoCard">
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
								avatar={<Avatar src={state.image} alt="A" size={64} />}
								title={state.name}
								description="This is the description"
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
							<button
								style={{
									color: "white",
									borderRadius: 100,
									border: 0,
									margin: 2,
									backgroundColor: "#0080ff",
								}}
							>
								#Laravel
							</button>
							<button
								style={{
									color: "white",
									borderRadius: 100,
									border: 0,
									margin: 2,
									backgroundColor: "#0080ff",
								}}
							>
								#react
							</button>
							<button
								style={{
									color: "white",
									borderRadius: 100,
									border: 0,
									margin: 2,
									backgroundColor: "#0080ff",
								}}
							>
								#Firestore
							</button>
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
									{" "}
									Addis Ababa Science and Technology
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
								<span style={{ color: "gray" }}> Software Engineering</span>
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
								<span style={{ color: "gray" }}> 3.2</span>
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
							<span
								style={{ fontSize: "15px", fontWeight: "bold", color: "black" }}
							>
								Berbera
							</span>
							<br />
							<span style={{ color: "gray" }}>Software developer</span>
						</div>
					</div>
				</div>
				<div className="searchResultContainer">
					<h1 style={{}}>Results</h1>

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
								<List.Item key={item.id}>
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
											value={item.id}
											onChange={(e) => {
												selected.push(item.id);
												if (e.target.checked) {
													selected.push(item.id);
												} else {
													selected.splice(selected.indexOf(e.target.value), 1);
												}

												console.log("hello,,,", typeof e.target.value);
											}}
										/>
										<Meta
											style={{ textAlign: "left", alignSelf: "flex-start" }}
											avatar={<Avatar src={state.image} />}
											title={item.name}
											description={item.email}
										/>
										<button
											onClick={() =>
												setState({
													name: item.name,
													image: state.image,
												})
											}
											style={{
												borderRadius: "100px",
												border: "0px",
												backgroundColor: "white",
												marginLeft: "auto",
											}}
										>
											{item.name === state.name ? (
												<EyeOutlined
													style={{
														color: "white",
														padding: 4,
														backgroundColor: "#0080ff",
														borderRadius: "100Px",
													}}
													value={item.name}
													onclick={() => {
														setState(item.name);
													}}
												/>
											) : (
												<EyeOutlined
													style={{ padding: 4 }}
													value={item.name}
													onclick={() => setState(item.name)}
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
