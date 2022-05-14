import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import axios from "axios";

const  AddSkill = () =>{
    
    const [skillList, setSkillList] = useState({
        skill: "",
        user_id:""
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
              console.log("skill added");
          } else {
            console.log("skill not added");
          }
        });
      }, []);
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
              <Button type="primary" htmlType="submit">
                  Add Skill
              </Button>
          </Form.Item>
          </Form>
    )
}
export default AddSkill;