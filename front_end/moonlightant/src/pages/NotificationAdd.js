import { Form, Input, Button, Checkbox, Upload, message } from "antd";
import {
	UploadOutlined,
	LoadingOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result));
	reader.readAsDataURL(img);
}

function beforeUpload(file) {
	const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
	if (!isJpgOrPng) {
		message.error("You can only upload JPG/PNG file!");
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error("Image must smaller than 2MB!");
	}
	return isJpgOrPng && isLt2M;
}

const onFinish = (values) => {
	console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
	console.log("Failed:", errorInfo);
};

const NotificationAdd = () => {
	const [state, setState] = useState("");
	const { TextArea } = Input;
	const onChangeTextArea = ({ target: { value } }) => {
		setState({ value });
	};

	const { value } = state;
	const [load, setLoad] = useState(false);

	// load = {
	//   loading: false,
	// };

	const handleChange = (info) => {
		if (info.file.status === "uploading") {
			setLoad({ loading: true });
			return;
		}
		if (info.file.status === "done") {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, (imageUrl) =>
				setLoad({
					imageUrl,
					loading: false,
				})
			);
		}
	};

	const { loading, imageUrl } = load;
	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload image or video</div>
		</div>
	);
	const navigate = useNavigate();
	return (
		<Form
			name="basic"
			labelCol={{
				span: 8,
			}}
			wrapperCol={{
				span: 16,
			}}
			initialValues={{
				remember: true,
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Form.Item
				label="Notification Title"
				name="notificationTitle"
				rules={[
					{
						required: true,
						message: "Please input your notification title!",
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Notification Detail"
				name="notificationDetail"
				rules={[
					{
						required: true,
						message: "Please input your notification detail!",
					},
				]}
			>
				<TextArea
					value={value}
					onChange={onChangeTextArea}
					placeholder="Notification Detail"
					autoSize={{ minRows: 3, maxRows: 8 }}
				/>
			</Form.Item>
			<Form.Item
				style={{
					marginLeft: "6em",
				}}
			>
				<Upload
					name="avatar"
					listType="picture-card"
					className="avatar-uploader"
					showUploadList={false}
					action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
					beforeUpload={beforeUpload}
					onChange={handleChange}
				>
					{imageUrl ? (
						<img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
					) : (
						uploadButton
					)}
				</Upload>
			</Form.Item>
			<Form.Item
				wrapperCol={{
					offset: 8,
					span: 16,
				}}
			>
				<Button
					type="primary"
					onClick={navigate("advancedSearch")}
					htmlType="submit"
				>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};

export default NotificationAdd;
