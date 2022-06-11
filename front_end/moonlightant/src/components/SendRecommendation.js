import {Form, Input,  message, Col ,Button,Select} from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";

import "../styles/recomendations.css";

const SendRecomendation = () => {
    const [studentList, setStudentList] = useState([]);
    const [senderId, setSenderId]=useState();
    const [institutionId, setInstitutionId]=useState();
    const [recomendation, setRecomendation]= useState({
        recomendationDetail:"",
        sender_id:"",
    error_list: [],
    student_id:"",
    });

    const id = localStorage.getItem('auth_id');
    useEffect(() => {
        axios.get(`/api/getInstructorInstitutionId/${id}`).then((res) => {
          if (res.data.status === 200) {
            setInstitutionId(res.data.institution_id);
            setSenderId(res.data.sender_id[0].id);
            console.log(res.data.sender_id[0].id);
          }
        });
      }, [id]);

    useEffect(() => {
        console.log(senderId)
        axios.get(`/api/filterStudent/${institutionId}`).then((res) => {
          if (res.data.status === 200) {
            setStudentList(res.data.student);
          }
        });
      }, [senderId]);

    const recomend = (e) => {
        const data = {
            recomendationDetail: recomendation.recomendationDetail,
            sender_id: senderId,
            student_id:recomendation.student_id
        };

        axios.get("/sanctum/csrf-cookie").then((res) => {
            console.log("inside csrf");
      
            axios.post(`/api/sendRecommendation`, data).then((res) => {
              if (res.data.status === 200) {
                message.success("Your recommendation is successful");
              } else {
                console.log("inside else");
                setRecomendation({
                  ...recomendation,
                  error_list: res.data.validation_errors,
                });
                console.log(res.data.validation_errors);
              }
            });
          }, []);

          
    }

    let options = studentList.map((item) => {
      return { value: item.id, label: item.name, key: item.id };
    });

    const handleInputStudent = (e) => {
      // e.persist();
      console.log(e);
      setRecomendation({ student_id: e});
    };
    const handleInput = (e) => {
        // e.persist();
    setRecomendation({ ...recomendation, [e.target.name]: e.target.value });
      };

	return (
        <Form 
        style={{background:"#ffffff",
        marginTop:"2rem",
          paddingLeft:"1rem",
          paddingRight:"1rem",
          paddingTop:"1rem",
          paddingBottom:"1rem",
          textAlign:"left",
          marginBottom:"2rem",
        borderRadius:"1rem"
      }}
        onFinish={recomend}>
            <Col>
            <Form.Item 
            label="Recommendation" 
            style={{width: "35%", borderRadius: "50px"}}>
              <Input.TextArea
          autoSize={{ minRows: 2, maxRows: 4 }}
                name="recomendationDetail"
                onChange={handleInput}
                value={recomendation.recomendationDetail}
              />
          {/* <span style={{color:"red"}}>{editProfile.error_list.name}</span> */}
            </Form.Item>
          </Col>
          <Col>
          <Form.Item 
          label="Choose the Student"
                    >
              <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children?.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              ?.toLowerCase()
              .localeCompare(optionB.children?.toLowerCase())
          }
          label="Select a Student"
          style={{ padding: 10, width: "20%", borderRadius: "80px" }}
          name="student_id"
          onChange={handleInputStudent}
          value={recomendation.student_id}
          options={options}
        />
            </Form.Item>
          </Col>
          <Form.Item>
          <Button style={{borderRadius:"1rem"}} type="primary" htmlType="submit">
            Send recommendation
          </Button>
        </Form.Item>
            </Form>
	);
};

export default SendRecomendation;
