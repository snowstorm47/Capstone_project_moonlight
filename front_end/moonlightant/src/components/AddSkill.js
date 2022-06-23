import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";

const  AddSkill = () =>{
    
    const [skillList, setSkillList] = useState({
        skill: "",
        user_id:"",
        error_List:[]
    });

    const addSkill = (e) => {
      
        const data = {
         skill: skillList.skill,
         user_id: localStorage.getItem("auth_id")
        }
  console.log(skillList.skill);
      axios.get("/sanctum/csrf-cookie").then((res) => {
        console.log("inside csrf");
  
        axios.post(`/api/addSkill`, data).then((res) => {
          if (res.data.status === 200) {
            message.success('Skill Added')
          } else {
            setSkillList({
              ...skillList,
              error_list: res.data.validation_errors,
            });
            message.error('Skill Add Failed')
          }
        });
      }, []);
      setSkillList({ ...skillList, skill: ""});
    };

    const handleInput = (e) => {
        // e.persist();
        setSkillList({ ...skillList, [e.target.name]: e.target.value });
      };

    return(
        <Form
          onFinish={addSkill}
          >
          <Form.Item>
              <Input
                name="skill"
                onChange={handleInput}
                value={skillList.skill}
              />
             <span style={{color:"red"}}>{skillList.error_list?.skill}</span>
              </Form.Item>
              <Form.Item>
              <Button type="primary" htmlType="submit" style={{marginTop: '1em', borderRadius: "80px"}}>
                  Add Skill
              </Button>
          </Form.Item>
          </Form>
    )
}
export default AddSkill;