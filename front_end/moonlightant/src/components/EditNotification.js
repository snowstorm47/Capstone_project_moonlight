import { Form, Input, Button, message } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";

const EditNotification = ({parentToChild}) => {

  const [notification, setNotification] = useState({
    notificationTitle: "",
    id:"",
    notificationDetail: "",
    error_list:[]
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
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.put(`api/updateNotification/${id}`, data)
        .then((response) => {
          console.log(response);
          if (response.data.status === 200) {
            message.success("Notification updated succesfully");
          } else {
            setNotification({
              ...notification,
              error_list: response.data.validation_errors,
            });
            message.error("Notification was not updated. Please try again");
          }
        });
    });

  };
  const handleInput = (e) => {
    setNotification({ ...notification, [e.target.name]: e.target.value });
  };

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
        <span style={{color:"red"}}>{notification.error_list?.notificationTitle}</span>

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
        <span style={{color:"red"}}>{notification.error_list?.notificationDetail}</span>
      </Form.Item>
      
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
