import React, { useState } from "react";
import { InboxOutlined} from "@ant-design/icons";
import { Form, Input, Button, Upload,message } from "antd";
import axios from "axios";

const  AddCertificate = () =>{
    
    const [certificate, setCertificate] = useState({
        certificate: "",
        description: "",
        error_list:[]
    });
    const id = localStorage.getItem("auth_id");

    const addCertificate = () => {
      const fd = new FormData();
      fd.append("certificate", certificate.certificate);
      fd.append("description", certificate.description);
      fd.append("user_id", id);
      console.log(fd);
      axios.post(`/api/addCertificate`, fd).then((res) => {
        if (res.data.status === 200) {
          message.success("Certificate added");
        } else {
          setCertificate({
            ...certificate,
            error_list: res.data.validation_errors,
          });
          message.error("Certificate not added");
        }
      });
      setCertificate({ ...certificate, certificate: "", description: "" });
    };

    const handleInput = (e) => {
        // e.persist();
        setCertificate({ ...certificate, [e.target.name]: e.target.value });
      };
      const normFile = (e) => {
        console.log("Upload event:", e);
    
        if (Array.isArray(e)) {
          return e;
        }
    
        return e && e.fileList;
      };

    return(
        <Form 
			method="POST"
			onFinish={addCertificate}>
            <Form.Item>
              <label required style={{fontWeight:"bold"}}>Certificate Description</label>
              <Input
                name="description"
                onChange={handleInput}
                value={certificate.description}
              />
             <span style={{color:"red"}}>{certificate.error_list?.description}</span>
            </Form.Item>
            <Form.Item
              name="certificate"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload.Dragger
                name="certificate"
                type="file"
                multiple={false}
                onChange={(e) =>
                  setCertificate({
                    ...certificate,
                    certificate: e.fileList[0].originFileObj,
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
             <span style={{color:"red"}}>{certificate.error_list?.certificate}</span>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginTop: "1em", borderRadius: "80px" }}
              >
                Add Certificate
              </Button>
            </Form.Item>
          </Form>
    )
}
export default AddCertificate;