import { Form, Input, Checkbox, Upload, message, TextArea , Button} from "antd";
import {
  UploadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { React, useState } from "react";
import axios from "axios";

// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }

// function beforeUpload() {
  // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  // if (!isJpgOrPng) {
  //   message.error('You can only upload JPG/PNG file!');
  // }
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isLt2M) {
  //   message.error('Image must smaller than 2MB!');
  // }
  // return isJpgOrPng && isLt2M;
// }


// const theme = createTheme();

const NotificationAdd = () => {
  const [notification, setNotification] = useState({
    notificationTitle: "",
    notificationDetail: "",
    notificationImage: "",
    error_list: [],
  });

  const [message, setMessage] = useState(null);
  const [failMessage, setFailMessage] = useState(null);

  // const [state, setState] = useState('');
  const { TextArea } = Input;
  // const onChangeTextArea = ({ target: { value } }) => {
  //   setState({ value });
  // };

  // const { value } = state;
  // const [load, setLoad] = useState(false);

  // load = {
  //   loading: false,
  // };
  const data = {
    notificationTitle: notification.notificationTitle,
    notificationDetail: notification.notificationDetail,
    notificationImage: notification.notificationImage,
    user_id: localStorage.getItem('auth_id')
  };
  const notificationSubmit = (data, e) => {
    // e.preventDefault();
    // e.persist();
    console.log("start");
    

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("api/postNotification", data).then((res) => {
        if (res.data.status === 200) {
          setMessage(res.data.message);
          console.log("post successful");
        } 
        else {
          setNotification({
            ...notification,
            error_list: res.data.validation_errors,
          });
          setFailMessage(res.data.message);
          console.log("inside else");
        }
      });
    });
  };

  const handleInput = (e) => {
    e.persist();
    setNotification({ ...notification, [e.target.name]: e.target.value });
  };

  // const { loading, imageUrl } = load;
  //   const uploadButton = (
  //     <div>
  //       {loading ? <LoadingOutlined /> : <PlusOutlined />}
  //       <div style={{ marginTop: 8 }}>Upload image or video</div>
  //     </div>
  //   );

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
      onFinish={notificationSubmit}
      autoComplete="off"
    >
      <div style={{color:"green"}}>{message}</div>
		  <div style={{color:"red"}}>{failMessage}</div>
      <Form.Item
        label="Notification Title"
        rules={[
          {
            required: true,
            message: 'Please input your notification title!',
          },
        ]}
      >
        <Input 
        type= "text"
        id="notificationTitle"
        name="notificationTitle"
        value={notification.notificationTitle}
        onChange={handleInput}/>
         <span style={{color:"red"}}>{notification.error_list.notificationTitle}</span>
      </Form.Item>

      <Form.Item
        label="Notification Detail"
        rules={[
          {
            required: true,
            message: 'Please input your notification detail!',
          },
        ]}
      >
        <TextArea
          autoSize={{ minRows: 3, maxRows: 8 }}
          onChange={handleInput}
          name="notificationDetail"
          value={notification.notificationDetail}
          id="notificationDetail"
        />
         <span style={{color:"red"}}>{notification.error_list.notificationDetail}</span>
        </Form.Item>
        <Form.Item
          label="Notification Image"
          rules={[
            {
              required: true,
              message: 'Please input your notification image!',
            },
          ]}
        >
         <TextArea
        margin="normal"
        required
        name="notificationImage"
        onChange={handleInput}
        value={notification.notificationImage}
        id="notificationImage"
        autoSize={{ minRows: 3, maxRows: 8 }}

      />
      <span style={{color:"red"}}>{notification.error_list.notificationImage}</span>
      
      </Form.Item>
    {/* <Form.Item
      style={{
        marginLeft:"6em"
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
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
        </Form.Item> */}
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Post Notification
        </Button>
      </Form.Item>
    </Form>

    ////////////////////////////////////
    // <ThemeProvider theme={theme}>
		// 	<Container component="main" maxWidth="xs">
		// 		<CssBaseline />
		// 		<Box
		// 			sx={{
		// 				marginTop: 8,
		// 				marginBottom: 12,
		// 				display: "flex",
		// 				flexDirection: "column",
		// 				alignItems: "center",
		// 			}}
		// 		>
		// 			{/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}> */}
		// 				{/* <LockOutlinedIcon />
		// 			</Avatar> */}
		// 			<Typography component="h1" variant="h5">
		// 				Post Notification
		// 			</Typography>
    // <Box
    //   component="form"
    //   onSubmit={notificationSubmit}
    //   noValidate
    //   sx={{ mt: 1 }}
    // >
    //   <div style={{color:"green"}}>{message}</div>
		// 	<div style={{color:"red"}}>{failMessage}</div>
    //   <TextField
    //     margin="normal"
    //     required
    //     fullWidth
    //     id="notificationTitle"
    //     label="Notification Title"
    //     name="notificationTitle"
    //     onChange={handleInput}
    //     value={notification.notificationTitle}
    //     autoFocus
    //   />
    //   <span style={{color:"red"}}>{notification.error_list.notificationTitle}</span>
    //   <TextField
    //     margin="normal"
    //     required
    //     fullWidth
    //     name="notificationDetail"
    //     label="Notification Detail"
    //     onChange={handleInput}
    //     value={notification.notificationDetail}
    //     id="notificationDetail"
    //   />
    //   <span style={{color:"red"}}>{notification.error_list.notificationDetail}</span>
    //   <TextField
    //     margin="normal"
    //     required
    //     fullWidth
    //     name="notificationImage"
    //     label="Notification Image"
    //     onChange={handleInput}
    //     value={notification.notificationImage}
    //     id="notificationImage"
    //   />
    //   <span style={{color:"red"}}>{notification.error_list.notificationImage}</span>
    //   <Button type="submit" variant="contained" sx={{ mt: 6, mb: 1 }}>
    //     Post Notification
    //   </Button>
    // </Box>
    // </Box>
		// 	</Container>
		// </ThemeProvider>
  );
};

export default NotificationAdd;
