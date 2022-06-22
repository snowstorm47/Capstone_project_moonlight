import { Form, Input, Button, Checkbox, Upload, message, Modal } from "antd";
import {
  UploadOutlined,
  InboxOutlined,
  EditOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import {Image } from "antd";
import axios from "axios";

const EditInstitutionProfilePicture = ({ parentToChild }) => {
  const [profilePicture, setProfilePicture] = useState({
    image: "",
    error_list:[]
  });
  const id = localStorage.getItem("auth_id");

  useEffect(() => {
    // axios.get('/sanctum/csrf-cookie').then(res => {
    axios.get(`/api/getInstitutionProfilePicture/${id}`).then((res) => {
      if (res.data.status === 200) {
        setProfilePicture(res.data);
      } else {
        console.log("couldnt retrieve data");
      }
    });
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    const fData = new FormData();
    fData.append("image", profilePicture.image);
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/updateInstitutionProfile/${id}`, fData).then((response) => {
        if (response.data.status === 200) {
            
          message.success("Picture updated succesfully");
          setIsModalVisible(false);
          axios.get(`/api/getInstitutionProfilePicture/${id}`).then((res) => {
            if (res.data.status === 200) {
              setProfilePicture(res.data);
            } else {
              console.log("couldnt retrieve data");
            }
          });
        } else {
          setProfilePicture({
            ...profilePicture,
            error_list: response.data.validation_errors,
          });
          message.error("Picture was not updated. Please try again");
        }
      });
    });
  };
  const handleInput = (e) => {
    setProfilePicture({ ...profilePicture, [e.target.name]: e.target.value });
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
      <div className="image1" >
        <Image
          width={250}
          height={250}
          src={
            "http://localhost:8000/uploads/ProfilePicture/" +
            profilePicture.image
          }
          name="image"
          style={{
             borderRadius: "100%", alignContent: "left",marginTop:"0rem"}}
        />
      </div>
      <Button
        type="text"
        style={{
          marginLeft: "0rem",
          marginTop: "-4rem",
        }}
        icon={<EditOutlined 
            style={{ cursor: "pointer" }}
            onClick={()=>showModal()}
            />}
      />
    <Modal
        title="Edit your profile image"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
        name="dynamic_form_nest_item"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={() => handleSubmit()}
        autoComplete="off"
        method="POST"
      >
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
                setProfilePicture({
                  ...profilePicture,
                  image: e.fileList[0].originFileObj,
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
            <span style={{color:"red"}}>{profilePicture.error_list?.image}</span>
          </Form.Item>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Update Profile Image
          </Button>
        </Form.Item>
      </Form>
      </Modal>
      
    </>
  );
};

export default EditInstitutionProfilePicture;
