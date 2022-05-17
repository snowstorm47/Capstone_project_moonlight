import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { DatePicker, Space,Col} from "antd";

const EditEmploymentHistory = ({parentToChild}) => {
  const [employmentList, setEmploymentList] = useState({
    companyName: "",
    position: "",
    startDate: "",
    endDate: "",
    user_id:"",
    id:""
  });

  useEffect(() => {
    // axios.get('/sanctum/csrf-cookie').then(res => {
    axios.get(`/api/getEmploymentHistory/${parentToChild}`).then((res) => {
      if (res.data.status === 200) {
        setEmploymentList(res.data);
        console.log(employmentList);
      } else {
        console.log("couldnt retrieve data");
      }
    });
  }, []);

  const editEmployment = (id) => {
    const data = {
      companyName: employmentList.companyName,
      position: employmentList.position,
      startDate: employmentList.startDate,
      endDate: employmentList.endDate,
      user_id: localStorage.getItem("auth_id")
    };

    axios.get("/sanctum/csrf-cookie").then((res) => {
      console.log("inside csrf");

      axios.put(`/api/editEmploymentHistory/${id}`, data).then((res) => {
        if (res.data.status === 200) {
          console.log("History edited");
        } else {
          console.log("History not edited");
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
      onFinish={()=>editEmployment(employmentList.id)}
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
           
        </Form.Item><br/>

        <Form.Item>
        <Col span={100}>
          <Input 
          placeholder="Position"
          name="position"
          onChange={handleInput}
          value={employmentList.position} />
          </Col>
        </Form.Item>

        <Form.Item>
          <Space direction="horizontal" size={12} style={{ padding: 10 }}>
          <input
              type="date"
              name="startDate"
              format={"m/d/Y"}
              onChange={handleInput}
              value={employmentList.startDate}
              className="form-control"
            />
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
          </Space>
        </Form.Item>
      </Space>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Edit Employment History
        </Button>
      </Form.Item>
    </Form>
  );
};
export default EditEmploymentHistory;
