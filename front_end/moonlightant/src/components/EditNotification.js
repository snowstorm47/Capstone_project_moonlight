import { Form, Input, Button, Checkbox, Upload, message } from "antd";
import {
  UploadOutlined,
  InboxOutlined,
  SendOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";

const EditNotification = ({parentToChild}) => {

  const [notification, setNotification] = useState({
    notificationTitle: "",
    id:"",
    notificationDetail: "",
    // notificationImage: "",
  });

  useEffect(() => {
    axios.get(`api/showNotification/${parentToChild}`).then((response) => {
        if(response.data.status === 200){
        setNotification(response.data);
        console.log(response.data);
        }
        else{
        console.log("couldnt retrieve data");

        }
    });
}, [parentToChild]);

  const handleSubmit = async (id) => {
    const data = {
      "notificationTitle" : notification.notificationTitle,
      "notificationDetail" : notification.notificationDetail
    }
    // const fData = new FormData();
    // fData.append("notificationImage", notification.notificationImage);
    // fData.append("notificationTitle", notification.notificationTitle);
    // fData.append("notificationDetail", notification.notificationDetail);
    // console.log(fData);
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.put(`api/updateNotification/${id}`, data)
        .then((response) => {
          console.log(response);
          if (response.data.status === 200) {
            message.success("Notification updated succesfully");
          } else {
            message.error("Notification was not updated. Please try again");
          }
        });
    });

  };
  const handleInput = (e) => {
    setNotification({ ...notification, [e.target.name]: e.target.value });
  };
//   const normFile = (e) => {
//     console.log("Upload event:", e);

//     if (Array.isArray(e)) {
//       return e;
//     }

//     return e && e.fileList;
//   };

  return (
    <Form
      name="dynamic_form_nest_item"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={()=>handleSubmit(notification.id)}
      autoComplete="off"
      method="POST"
    >
      <Form.Item>
        <Input
          name="notificationTitle"
          value={notification.notificationTitle}
          onChange={handleInput}
          required
        />
      </Form.Item>

      <Form.Item>
        {/* <label>Body</label> */}
        <Input.TextArea
          size="large"
          name="notificationDetail"
          value={notification.notificationDetail}
          onChange={handleInput}
          style={{ width: "100%" }}
          required
        />
      </Form.Item>
      {/* <Form.Item>
        <Form.Item
          name="dragger"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload.Dragger
            name="notificationImage"
            type="file"
            multiple={false}
            onChange={(e) =>
              setNotification({
                ...notification,
                notificationImage: e.fileList[0].originFileObj,
              })
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
      </Form.Item> */}
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Update Notification 
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditNotification;
