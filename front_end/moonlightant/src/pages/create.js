import { Form, Input, Button, Checkbox, Space, Select, Divider } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import '../App.css';

const SignUp = () => {
  const first = 0;
  let arr;
  const navigate = useNavigate();
  const [institutions, setinstitutions] = useState([]);
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
  useEffect(() => {
    axios.get("/sanctum/csrf-cookie").then(async (res) => {
      console.time();
      axios.get(`/api/institutions`).then((res) => {
        if (res.data.status === 200) {
          arr = res.data.data;
          console.log(arr, "...");
          console.timeEnd();
          console.log(
            `nononono ${setinstitutions(res.data.data)}`,
            { institutions },
            res.data.data
          );
        } else {
        }
      });
    });
  }, []);
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
            if (localStorage.getItem("auth_position") === "Institution") {
              const fData = new FormData();
              fData.append("notificationTitle", "Institution Has Registered ");
              fData.append(
                "notificationDetail",
                "Please Verify " + localStorage.getItem("auth_name")
              );
              fData.append("sender_id", localStorage.getItem("auth_id"));
              fData.append("reciever_id", 3);
              fData.append("seen_status", "False");
              axios.get("/sanctum/csrf-cookie").then((response) => {
                axios.post("api/postNotification", fData).then((response) => {
                  console.log(response);
                  if (response.data.status === 200) {
                    message.success("Notification created succesfully");
                  } else {
                    message.error(
                      "Notification was not created. Please try again"
                    );
                  }
                });
              });
            }
            axios
            .get(`api/checkCreateProfile?id=${localStorage.getItem("auth_id")}`)
            .then((response) => {
              localStorage.setItem('first',response.data.first) ;
			  if (localStorage.getItem('first') == 0) {
				if (localStorage.getItem("auth_position") === "Student") {
				  navigate("/createprofile");
				} else if (
				  localStorage.getItem("auth_position") === "Institution"
				) {
				  navigate("/createprofileinstitution");
				} else if (localStorage.getItem("auth_position") === "Instructor") {
          axios.get(`api/checkVerifyInstructor/${localStorage.getItem("auth_id")}`).then((response) => {
            localStorage.setItem('verify',response.data.verified);
          });
				  navigate("/createprofileinstructor");
				} else if (
				  localStorage.getItem("auth_position") === "Hiring Company"
				) {
				  navigate("/createprofilehiring");
				}
			  } else if (localStorage.getItem('first') == 1){
				navigate("/newsfeed");
			  }
            });
          
            // swal("Success", res.data.message, "success");
            navigate("/newsfeed");
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
    <div
      style={{
        width: "100%",
        display: "flex",
        height: 640,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          backgroundColor: "white",
          width: "auto",
          height: "auto",
          boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          padding: 40,
          display: "flex",
          flexDirection: "column",
          borderRadius: 25,
          fontFamily: "sans-serif",
        }}
      >
        <Divider>
          <h1>Sign Up</h1>
        </Divider>
        <Form
          name="basic"
          size="small"
          style={{
            display: "flex",
            flexDirection: "column",
            width: 300,
            fontWeight: "bold",
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onFinish={registerSubmit}
        >
          {/* <div style={{ color: "green" }}>{message}</div>
					<div style={{ color: "red" }}>{failMessage}</div> */}

          <Form.Item label="Sign Up as: ">
            <Select
              labelInValue
              style={{ width: "90%", alignSelf: "flex-start" }}
              labelPosition="top"
              name="position"
              // value={registerInput.position}
              onChange={(e) => {
                setRegister({ ...registerInput, position: e.value });
                console.log(registerInput);
              }}
            >
              <Option value=""></Option>
              <Option value="Student">Student</Option>
              <Option value="Instructor">Instructor</Option>
              <Option value="Hiring Company">Hiring Company</Option>
              <Option value="Institution">Institution</Option>
              {<span style={{color:"red"}}>{registerInput.error_list.position}</span>}
            </Select>
          </Form.Item>
          <Form.Item
            style={{ display: "flex" }}
            labelCol={{ span: 24 }}
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              placeholder="Enter your email"
              name="email"
              type="email"
              onChange={handleInput}
              value={registerInput.email}
            />
              {<span style={{color:"red"}}>{registerInput.error_list.email}</span>}
          </Form.Item>
          {registerInput.position == "Institution" ? (
            <Form.Item
              style={{}}
              placeholder="Choose your institution"
              labelCol={{ span: 24 }}
              label="Choose Institution"
              rules={[
                {
                  required: true,
                  message: "Please choose your institution!",
                },
              ]}
            >
              <Select
                labelInValue
                style={{ alignSelf: "flex-start" }}
                labelPosition="top"
                name="name"
                // value={registerInput.position}
                onChange={(e) => {
                  setRegister({ ...registerInput, name: e.value });
                  console.log(registerInput);
                }}
              >
                {institutions?.map((item) => {
                return <Option value={item.institutionName}>
                    {item.institutionName}
                  </Option>}
                )}
              </Select>
              {<span style={{color:"red"}}>{registerInput.error_list.name}</span>}
            </Form.Item>
          ) : (
            <Form.Item
              style={{}}
              placeholder="Enter your full name"
              labelCol={{ span: 24 }}
              label="Full Name"
              rules={[
                {
                  required: true,
                  message: "Please input your Full Name!",
                },
              ]}
            >
              <Input
                type="text"
                name="name"
                onChange={handleInput}
                value={registerInput.name}
              />
              {<span style={{color:"red"}}>{registerInput.error_list.name}</span>}
            </Form.Item>
          )}

          <Form.Item
            labelCol={{ span: 24 }}
            style={{}}
            placeholder="Enter your password"
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
              {<span style={{color:"red"}}>{registerInput.error_list.password}</span>}
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            style={{}}
            placeholder="Confirm your password"
            label="Confirm Password"
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
            ]}
          >
            <Input.Password name="confirmPassword" onChange={handleInput} />

            <div style={{ color: "red" }}>{registerInput.confirm_error}</div>
          </Form.Item>
          {/* <Form.Item
						labelCol={{ span: 24 }}
						name="remember"
						valuePropName="checked"
					>
						<Checkbox style={{}}>Remember me</Checkbox>
					</Form.Item> */}
          <Form.Item labelCol={{ span: 24 }} style={{}}>
            <Button type="primary" style={{ width: "100%" }} htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginTop: "auto" }}
        viewBox="0 0 1440 320"
      >
        <path
          fill="#0099ff"
          fill-opacity="1"
          d="M0,128L60,122.7C120,117,240,107,360,112C480,117,600,139,720,128C840,117,960,75,1080,48C1200,21,1320,11,1380,5.3L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default SignUp;
