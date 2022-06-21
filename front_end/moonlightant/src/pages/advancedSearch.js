import React, { useEffect, useState } from "react";
import "../styles/AdvancedSearch.css";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Layout,
  List,
  Menu,
  message,
  Modal,
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
import {
  DownOutlined,
  EyeFilled,
  EyeOutlined,
  SendOutlined,
  UpOutlined,
  UserOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useLocation } from "react-router-dom";

const AdvancedSearch = (props) => {
  const notif = useLocation();
  const [count, setCount] = useState(0);
  const sendNotification = () => {
    setSendLoading(true);
    selected?.length >= 1
      ? selected?.forEach((item) => {
          console.log(item);
          const fData = new FormData();
          fData.append(
            "notificationImage",
            notif.state.notification.notificationImage
          );
          fData.append(
            "notificationTitle",
            notif.state.notification.notificationTitle
          );
          fData.append(
            "notificationDetail",
            notif.state.notification.notificationDetail
          );
          fData.append("sender_id", notif.state.notification.sender_id);
          fData.append("reciever_id", item);
          fData.append("seen_status", notif.state.notification.seen_status);
          axios.post("api/postNotification", fData).then((response) => {
            if (response.data.status === 200) {
              message.success("Notification sent succesfully");
            } else {
              message.error("Notification was not sent. Please try again");
            }
          });
        })
      : message.error("please select a user to send the notification to");
    setSendLoading(false);
  };
  const [loader, setLoader] = useState(false);
  const filter = () => {
    setLoader(!loader);
    axios
      .get(`/api/advancedSearch`)
      .then((res) => {
        if (res.data.status === 200) {
          return res.data.data;
        }
      })
      .then((data) => {
        setSearchResults(
          data.filter((item) => {
            if (
              (search.skill
                ? item.skill
                    .map((skillObj) => skillObj.skill)
                    .includes(search.skill)
                : true) &&
              (search.institution
                ? item.student[0]?.institution_id === search.institution
                : true) &&
              (search.department
                ? item.student[0]?.department === search.department
                : true) &&
              (search.endDate
                ? search.startDate === item.student[0].endDateClass
                : true)
            ) {
              return true;
            } else {
              return false;
            }
          })
        );
      })
      .finally(() => {
        setLoader(false);
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
    startDate: "",
    endDate: "",
  });
  const clear = () => {
    setSearch({
      skill: "",
      institution: "",
      department: "",
      college: "",
      experience: "",
      educationStatus: "",
      position: "",
      startDate: "",
      endDate: "",
    });

    axios
      .get(
        `/api/advancedSearch?skill=${search.skill}&position=${search.position}&gpa=${search.gpa}&institution=${search.institution}`
      )
      .then((res) => {
        if (res.data.status === 200) {
          setSearchResults(res.data.data);
        } else {
        }
      });
  };
  const [college, setCollege] = useState([{ departmentName: "-none-" }]);
  const [department, setDepartment] = useState([{ departmentName: "-none-" }]);
  const [sendloading, setSendLoading] = useState(false);
  const [view, setView] = useState(false);
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
  const [selected, setSelected] = useState([]);
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
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    axios
      .get(
        `/api/advancedSearch?skill=${search.skill}&position=${search.position}&gpa=${search.gpa}&institution=${search.institution}`
      )
      .then((res) => {
        if (res.data.status === 200) {
          setSearchResults(res.data.data);
        } else {
        }
      });
  }, []);

  useEffect(() => {
    axios.get("/sanctum/csrf-cookie").then((res) => {
      console.time();
      axios.get(`/api/institutions`).then((res) => {
        if (res.data.status === 200) {
          setinstitutions(res.data.data);
          console.log(institutions, res.data.data);
          console.timeEnd();
        } else {
        }
      });
      axios.get(`/api/College`).then((res) => {
        if (res.data.status === 200) {
          setCollege(res.data.data);
        } else {
        }
      });
      axios.get(`/api/Department`).then((res) => {
        if (res.data.status === 200) {
          setDepartment(res.data.data);
        } else {
        }
      });
    }, []);
  }, []);
  //modal logic
  const talkClicked = (item) => {
    selected >= 1
      ? setVisible(true)
      : message.info("Please pick a user by using the check box provided");
  };
  const [visible, setVisible] = useState(false);
  const [load, setLoad] = useState(false);

	const [notification, setNotification] = useState({
		notificationTitle: "",
		notificationDetail: "",
		sender_id: localStorage.getItem("auth_id"),
		reciever_id: "",
		seen_status: "False",
	});
	const profile=(position,id)=>{
		console.log(id);
		if (position=== "Student") {
			navigate("/StudentProfile",{state:{id}});
		} else if (position === "Institution") {
			navigate("/InstitutionProfile",{state:{id}})
		} else if (position === "Instructor") {
			navigate("/InstructorProfile",{state:{id}})
		} else if (position === "Hiring Company") {
			navigate("/HiringProfile",{state:{id}})
		}
	}
	const handleSubmit = async () => {
		setLoad(true);
		selected?.length >= 1
			? selected?.forEach((item) => {
					const fData = new FormData();
					fData.append("notificationTitle", notification.notificationTitle);
					fData.append("notificationDetail", notification.notificationDetail);
					fData.append("sender_id", notification.sender_id);
					fData.append("seen_status", notification.seen_status);
					fData.append("reciever_id", item);
					axios.post("api/postNotification", fData).then((response) => {
						if (response.data.status === 200) {
						} else {
							message.error("Notification was not sent. Please try again");
						}
					});
			  })
			: message.error("please select a user to send the notification to");
		message.success("Notification sent succesfully");
		setLoad(false);
		setVisible(false);
		setNotification({
			notificationTitle: "",
			notificationDetail: "",
			sender_id: localStorage.getItem("auth_id"),
			reciever_id: "",
			seen_status: "False",
		});
	};
	const handleInput = (e) => {
		setNotification({ ...notification, [e.target.name]: e.target.value });
	};
	return (
		<Layout style={{ display: "flex", flexDirection: "row" }}>
			<Modal
				visible={visible}
				title={"Send " + selected?.length + " users a notification"}
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
              loading={load}
            >
              Create Notification <SendOutlined />
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Sider
        width={256}
        scrollable
        style={{
          minHeight: "90vh",
          backgroundColor: "white",
          padding: "20px 10px",
          overflowY: "hidden",
        }}
      >
        <div
          style={{
            height: "32px",
            background: "rgba(255,255,255,.2)",
            color: "black",
            margin: "16px",
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          Search
          <a
            style={{ marginLeft: 10, fontWeight: "normal", right: 0 }}
            onClick={clear}
          >
            clear
          </a>
        </div>
        <Search
          placeholder="search a skill"
          value={search.skill}
          onChange={(e) => {
            setSearch({ ...search, skill: e.target.value });
          }}
          enterButton="Search"
        />
        <Divider orientation="left" style={{ color: "black" }}>
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

        <Divider orientation="left" style={{ color: "black" }}>
          Academics
        </Divider>

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
        <strong style={{ paddingTop: 10 }}>Date of graduation</strong>
        <DatePicker
          picker="year"
          value={search.endDate}
          format={"m/d/Y"}
          onChange={(e) => {
            console.log(e);
            setSearch({ ...search, educationStatus: e.date });
          }}
          style={{ width: "100%" }}
        />

        <Radio.Group
          style={{ paddingTop: 10, paddingBottom: 10 }}
          onChange={(e) => {
            setSearch({ ...search, educationStatus: e.target.value });
          }}
        >
          <Radio value="Graduated" style={{ color: "Black" }}>
            Graduated
          </Radio>
          <Radio value="Student" style={{ color: "Black" }}>
            Student
          </Radio>
        </Radio.Group>
        <br />
        <Button
          type="primary"
          onClick={filter}
          loading={loader}
          disabled={loader}
          style={{
            width: "100%",
            border: "none",
            backgroundColor: "#",
            height: "30",
          }}
        >
          search
        </Button>
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
							<div
								style={{
									animation: "fadeIn 500ms ease-out backwards",
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
										onClick={()=>profile(state.user?.position,state.user?.id)}
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
							{view ? (
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
							) : null}
							<Divider>
								<Button
									onClick={() => setView(!view)}
									style={{ borderRadius: 500 }}
								>
									View {view ? "Less" : "More"}
									{view ? <UpOutlined /> : <DownOutlined />}
								</Button>
							</Divider>
						</>
					) : (
						<p>User data will be shown here</p>
					)}
				</div>

        <div className="searchResultContainer">
          <div
            style={{
              paddingRight: 10,
              paddingLeft: 10,
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              width: "100%",
              position: "sticky",
              textAlign: "center",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            }}
          >
            <h1 style={{}}>Results</h1>

            <Button
              type="primary"
              loading={sendloading}
              style={{ display: "flex", marginLeft: "auto" }}
              onClick={
                localStorage.getItem("auth_position") == "Hiring Company"
                  ? talkClicked
                  : sendNotification
              }
            >
              Send Notification
            </Button>
          </div>
          <div style={{ overflowY: "auto", height: "100%", scrollbarWidth: 0 }}>
            <InfiniteScroll
              dataLength={data.length}
              next={loadMoreData}
              style={{ paddingTop: "20px" }}
              hasMore={loader}
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
                            const arr = selected;
                            arr?.push(item.user.id);
                            setSelected(arr);
                          } else {
                            const arr = selected;

                            arr.splice(arr.indexOf(e.target.value), 1);
                            setSelected(arr);
                          }
                          console.log(selected, "selected...");
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
        </div>
      </Content>
    </Layout>
  );
};

export default AdvancedSearch;
