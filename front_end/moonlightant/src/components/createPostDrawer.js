import React, { useState } from "react";
import { Drawer, Button, Upload, Popover, Card, message } from "antd";
import { Form, Input } from "antd";
import { UploadOutlined, InboxOutlined, SendOutlined } from "@ant-design/icons";
import "../styles/newscreate.css";
import axios from "axios";

const PostDrawer = () => {
	const [visible, setVisible] = useState(false);
	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 },
	};
	// const fData = new formData();

	const [news, setNews] = useState({
		body: "",
		id: "1",
		image: "",
	});
	const handleInput = (e) => {
		setNews({ ...news, [e.target.name]: e.target.value });
	};
	const handleSubmit = async () => {
		console.log(news);
		const fData = new FormData();
		fData.append("image", news.image);
		fData.append("body", news.body);
		fData.append("id", localStorage.getItem("auth_id"));
		axios.get("/sanctum/csrf-cookie").then((response) => {
			axios.post("api/createPost", fData).then((response) => {
				console.log(response);
				if (response.data.message == "success") {
					message.info("Post created succesfully");
					onClose();
				} else {
					message.error("Post was not created. Please try again");
				}
			});
		});

		setNews({ ...news, body: "" });
	};
	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	const normFile = (e) => {
		console.log("Upload event:", e);

		if (Array.isArray(e)) {
			return e;
		}

		return e && e.fileList;
	};

	return (
		<>
			<Popover content="create news">
				<Button
					type="primary"
					style={{
						position: "fixed",
						bottom: 30,
					}}
					icon={<UploadOutlined />}
					onClick={showDrawer}
					shape="circle"
					size="large"
					className="openButton"
				></Button>
			</Popover>

			<Drawer
				title="Create Post"
				placement="right"
				onClose={onClose}
				visible={visible}
			>
				<Card bordered={false}>
					<Form
						name="nest-messages"
						method="POST"
						style={{
							display: "flex",
							flexDirection: "column",
						}}
					>
						{/* <Form.Item name={["user", "Title"]} required>
							<label required>Title</label>
							<Input name="title" value={news.title} onChange={handleInput} />
						</Form.Item> */}
						<Form.Item name={["user", "Body"]} required>
							<label>Body</label>
							<Input.TextArea
								size="large"
								name="body"
								value={news.body}
								onChange={handleInput}
								style={{ width: "100%" }}
							/>
						</Form.Item>
						<Form.Item>
							<Form.Item
								name="dragger"
								valuePropName="fileList"
								getValueFromEvent={normFile}
							>
								<Upload.Dragger
									name="image"
									type="file"
									multiple={false}
									onChange={(e) =>
										setNews({ ...news, image: e.fileList[0].originFileObj })
									}
									style={{ width: "100%" }}
								>
									<p className="ant-upload-drag-icon">
										<InboxOutlined />
									</p>
									<p className="ant-upload-text">
										Click or drag file to this area to upload
									</p>
								</Upload.Dragger>
							</Form.Item>
						</Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							onClick={() => {
								handleSubmit();
							}}
							style={{ width: "100%" }}
						>
							Submit
							<SendOutlined />
						</Button>
					</Form>
				</Card>
			</Drawer>
		</>
	);
};

export default PostDrawer;
