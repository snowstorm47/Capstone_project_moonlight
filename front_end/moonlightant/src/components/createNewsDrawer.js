import React, { useState } from "react";
import { Drawer, Button, Upload, Popover } from "antd";
import { Form, Input } from "antd";
import { UploadOutlined, InboxOutlined, SendOutlined } from "@ant-design/icons";
import "../styles/newscreate.css";

const NewsDrawer = () => {
	const [visible, setVisible] = useState(false);
	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 },
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
	const onFinish = (values) => {
		console.log("Rceived values of form: ", "values");
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
				title="Create News"
				placement="right"
				onClose={onClose}
				visible={visible}
			>
				<Form
					{...layout}
					name="nest-messages"
					style={{
						display: "flex",
						flexDirection: "column",
					}}
					onFinish={onFinish}
				>
					<Form.Item name={["user", "Title"]} required>
						<label required>Title</label>
						<Input />
					</Form.Item>
					<Form.Item name={["user", "Body"]} required>
						<label>Body</label>
						<Input.TextArea size="large" style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item>
						<Form.Item
							name="dragger"
							valuePropName="fileList"
							getValueFromEvent={normFile}
						>
							<Upload.Dragger
								name="files"
								action="/upload.do"
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
						onClick={onClose}
						style={{ width: "100%" }}
					>
						Submit
						<SendOutlined />
					</Button>
				</Form>
			</Drawer>
		</>
	);
};

export default NewsDrawer;
