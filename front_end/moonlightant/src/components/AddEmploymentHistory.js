import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { message, Space } from "antd";

const AddEmploymentHistory = () => {
  const [employmentList, setEmploymentList] = useState({
    companyName: "",
    position: "",
    startDate: "",
    endDate: "",
    user_id:"",
    error_List:[]
  });
  const addEmployment = () => {
    const data = {
      companyName: employmentList.companyName,
      position: employmentList.position,
      startDate: employmentList.startDate,
      endDate: employmentList.endDate,
      user_id: localStorage.getItem("auth_id")
    };

    axios.get("/sanctum/csrf-cookie").then((res) => {
      console.log("inside csrf");

      axios.post(`/api/addEmploymentHistory`, data).then((res) => {
        if (res.data.status === 200) {
          message.success('Employment History Added');
        } else {
          setEmploymentList({
            ...employmentList,
            error_list: res.data.validation_errors,
          });
          message.error('Employment History Add Failed')
        }
      });
    }, []);
  };

  const handleInput = (e) => {
    // e.persist();
    setEmploymentList({ ...employmentList, [e.target.name]: e.target.value });
  };
  return (
    <Form
      name="dynamic_form_nest_item"
      onFinish={addEmployment}
      autoComplete="off"
      title="Employment History"
    >
      <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
        <Form.Item>
          <Input
           placeholder="Company Name"
           name="companyName"
          onChange={handleInput}
          value={employmentList.companyName}
           />
      <span style={{color:"red"}}>{employmentList.error_list?.companyName}</span>

        </Form.Item>

        <Form.Item>
          <Input 
          placeholder="Position"
          name="position"
          onChange={handleInput}
          value={employmentList.position} />
      <span style={{color:"red"}}>{employmentList.error_list?.position}</span>

        </Form.Item>

        <Form.Item>
          <Space direction="vertical" size={12} style={{ padding: 10 }}>
          <input
              type="date"
              name="startDate"
              format={"m/d/Y"}
              onChange={handleInput}
              value={employmentList.startDate}
              className="form-control"
            />
      <span style={{color:"red"}}>{employmentList.error_list?.startDate}</span>
          </Space>
        </Form.Item>
        <Form.Item>
          <Space direction="vertical" size={12} style={{ padding: 10 }}>
          <input
              type="date"
              name="endDate"
              format={"m/d/Y"}
              onChange={handleInput}
              value={employmentList.endDate}
              className="form-control"
            />
      <span style={{color:"red"}}>{employmentList.error_list?.endDate}</span>

          </Space>
        </Form.Item>
      </Space>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{borderRadius: "80px"}}>
          Add Employment History
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddEmploymentHistory;
