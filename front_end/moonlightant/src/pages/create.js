import { Form, Input, Button, Checkbox, Space, Select } from "antd";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ConsoleSqlOutlined } from "@ant-design/icons";
const { Option } = Select;

const SignUp = () => {
  const first = 0;
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [position, setPosition] = useState("");
  const [failMessage, setFailMessage] = useState(null);
  const [registerInput, setRegister] = useState({
    email: "",
    password: "",
    name: "",
    position: "",
    confirmPassword: "",
    error_list: [],
    confirm_error: "",
  });

  const handleInput = (e) => {
    // e.persist();

    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  };
  // const handleInputPosition = (e) => {
  //   // e.persist();
  //   console.log(e)
  //   setRegister({ position: e});
  //   console.log(registerInput.position);
  // };

  const registerSubmit = (e) => {
    console.log(registerInput.email);
    console.log(registerInput.position);
    console.log(registerInput.password);
    console.log(registerInput.name);
    // e.preventDefault();

    const data = {
      email: registerInput.email,
      password: registerInput.password,
      position: registerInput.position,
      name: registerInput.name,
    };

    const confirmPassword = registerInput.confirmPassword;
    if (confirmPassword === registerInput.password) {
      axios.get("/sanctum/csrf-cookie").then((res) => {
        console.log("inside csrf");
        axios.post("/api/register", data).then((res) => {
          if (res.data.status === 200) {
            localStorage.setItem("auth_token", res.data.token);
            localStorage.setItem("auth_email", res.data.email);
            localStorage.setItem("auth_name", res.data.name);
            localStorage.setItem("auth_id", res.data.id);
            localStorage.setItem("auth_position", res.data.position);
            localStorage.setItem("auth_profile", 0);
            console.log("after auth_token");
            setMessage(res.message);
            if(localStorage.getItem("auth_position")==="Institution")
            {
              const fData = new FormData();
                fData.append("notificationTitle", "Institution Has Registered ");
                fData.append("notificationDetail", "Please Verify "+ localStorage.getItem('auth_name'));
                fData.append("sender_id", localStorage.getItem('auth_id'));
                fData.append("reciever_id", 3);
                fData.append("seen_status", 'False');
              axios.get("/sanctum/csrf-cookie").then((response) => {
                axios.post("api/postNotification", fData).then((response) => {
                  console.log(response);
                  if (response.data.status === 200) {
                    message.success("Notification created succesfully");
                  } else {
                    message.error("Notification was not created. Please try again");
                  }
                });
              });
            }
            console.log(res.data.message);
            console.log(first);
            // swal("Success", res.data.message, "success");
            navigate("/signin", { state: { first } });
          } else {
            console.log("inside else");
            setFailMessage(res.data.message);
            setRegister({
              ...registerInput,
              error_list: res.data.validation_errors,
            });
          }
        });
      });
    } else {
      setRegister({
        ...registerInput,
        confirm_error: "passwords are not the same",
      });
    }
  };

  return (
    <div className="space-align-container">
      <div className="space-align-center">
        <Space className="space-align-center">
          <Form
            style={{ paddingTop: "3rem" }}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 20,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            onFinish={registerSubmit}
          >
            <div style={{ color: "green" }}>{message}</div>
            <div style={{ color: "red" }}>{failMessage}</div>
            <Form.Item label="Sign Up as: ">
              <select
                labelInValue
                // defaultValue={{ value: 'Student' }}
                style={{ width: "15rem" }}
                name="position"
                onChange={handleInput}
                value={registerInput.position}
              >
                <option value=""></option>
                <option value="Student">Student</option>
                <option value="Instructor">Instructor</option>
                <option value="Hiring Company">Hiring Company</option>
                <option value="Institution">Institution</option>
              </select>
            </Form.Item>
            <Form.Item
              style={{
                paddingTop: "2rem",
                paddingRight: "2rem",
                width: "27rem",
              }}
              label="Email"
              
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input 
              name="email"
              onChange={handleInput}
              value={registerInput.email}
              />
              {/* <span style={{color:"red"}}>{registerInput.error_list.email}</span> */}
            </Form.Item>

            <Form.Item
              style={{ paddingTop: "2rem", width: "25rem" }}
              label="Full Name"
              
              rules={[
                {
                  required: true,
                  message: "Please input your Full Name!",
                },
              ]}
            >
              <Input
              name="name"
              onChange={handleInput}
              value={registerInput.name}
               />
              {/* <span style={{color:"red"}}>{registerInput.error_list.name}</span> */}
            </Form.Item>

            {/* <Space className='space-align-center'> */}
            <Form.Item
              style={{ paddingTop: "2rem", width: "25 rem" }}
              label="Password"
              
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
              name="password"
              onChange={handleInput}
              value={registerInput.password}
               />
              {/* <span style={{color:"red"}}>{registerInput.error_list.password}</span> */}
            </Form.Item>

            <Form.Item
              style={{ paddingTop: "2rem", width: "25 rem" }}
              label="Confirm Password"
              
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
              ]}
            >
              <Input.Password 
              name="confirmPassword"
              onChange={handleInput}
              />
              {/* <div style={{color:"red"}}>{registerInput.error_list.password}</div> */}
              <div style={{ color: "red" }}>{registerInput.confirm_error}</div>
            </Form.Item>
            {/* </Space> */}

            <Form.Item
              // style={{alignItems:'center', paddingRight:'5rem'}}
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox style={{ paddingRight: "5rem", paddingTop: "2rem" }}>
                Remember me
              </Checkbox>
            </Form.Item>

            <Form.Item
              style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </div>
    </div>
  );
};

export default SignUp;
