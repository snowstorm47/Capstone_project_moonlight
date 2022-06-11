// import React, { useState, useEffect ,useRef} from "react";
// import { Row, Col, Layout } from "antd";
// import { Form, Input, Button, Typography,Upload } from "antd";
// import { Select } from "antd";
// import { Avatar, Image } from "antd";
// import { UserOutlined,EditOutlined} from "@ant-design/icons";
// import { Divider } from "antd";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// // import '/App.css';

// const { Option } = Select;

// function AdminAboutus() {

    
//   const [success, setSuccess] = useState();
//   const [editAboutus, setEditAboutus] = useState({
//     ourVision: "",
//     ourVisionDetail: "",
//     ourMission: "",
//     ourMissionDetail: "",
//     ourTeam: "",
//     ourTeamDetail: "",
//     TitleOne: "",
//     TitleOneDetail: "",
//     TitleTwo: "",
//     TitleTwoDetail: "",
//     TitleThree: "",
//     TitleThreeDetail: "",
//     image:"",
//     TitleOneImage:"",
//     TitleTwoImage:"",
//     TitleThreeImage:"",
//     error_list: [],
//   });


//   const id = localStorage.getItem("auth_id");

//   //
//   useEffect(() => {
//     axios.get(`/api/aboutus`).then((res) => {
//       if (res.data.status === 200) {
//         setEditAboutus(res.data.aboutus[0]);
//          console.log(res.data.aboutus[0]);
//         console.log(editAboutus);
//       } else {
//         console.log("couldnt retrieve data");
//       }
//     });
//   }, []);

//   const navigate = useNavigate();

//   const handleInput = (e) => {
//     // e.persist();
//     setEditAboutus({ ...editAboutus, [e.target.name]: e.target.value });
//   };

//   const updateAboutus = (e) => {
//     console.log("update");
//     // e.preventDefault();
//     const fData = new FormData();
// 		fData.append("image", editAboutus.image);
// 		fData.append("ourVision", editAboutus.ourVision);
// 		fData.append("ourVisionDetail", editAboutus.ourVisionDetail);
// 		fData.append("ourMission", editAboutus.ourMission);
// 		fData.append("ourMissionDetail", editAboutus.ourMissionDetail);
// 		fData.append("ourTeam", editAboutus.ourTeam);
// 		fData.append("ourTeamDetail", editAboutus.ourTeamDetail);
// 		fData.append("TitleOne", editAboutus.TitleOne);
// 		fData.append("TitleOneDetail", editAboutus.TitleOneDetail);
// 		fData.append("TitleTwo", editAboutus.TitleTwo);
// 		fData.append("TitleTwoDetail", editAboutus.TitleTwoDetail);
// 		fData.append("TitleThree", editAboutus.TitleThree);
// 		fData.append("TitleThreeDetail", editAboutus.TitleThreeDetail);
// 		fData.append("TitleOneImage", editAboutus.TitleOneImage);
// 		fData.append("TitleTwoImage", editAboutus.TitleTwoImage);
// 		fData.append("TitleThreeImage", editAboutus.TitleThreeImage);
//     const id = 1;
//     axios.get("/sanctum/csrf-cookie").then((res) => {
//       console.log("inside csrf");

//       axios.put(`/api/editaboutus/${id}`, fData).then((res) => {
//         if (res.data.status === 200) {
//           setSuccess("Your profile has been updated Succcessfully");
//           navigate("/");
//           console.log(success);
//         } else {
//           console.log("inside else");
//           setEditAboutus({
//             ...editAboutus,
//             error_list: res.data.validation_errors,
//           });
//           console.log(res.data.validation_errors);
//         }
//       });
//     }, []);
//   };

//   <Avatar icon={<UserOutlined />} />;
//   return (
//     <Row className="row1" style={{ backgroundColor: "#f0f2f5", margin: "3em" }}>
//       <span>{success}</span>

//       <Col
//         className="row3"
//         span={9}
//         style={{ marginRight: "-10em",
//         marginLeft: "0.5em",
//         paddingRight: "1em",
//         textAlign: "left"}}
//       >
//         <Form 
//         onFinish={updateAboutus}
//         style={{background:"#ffffff",
//         marginTop:"2rem",
//           paddingLeft:"1rem",
//           paddingRight:"1rem",
//           paddingTop:"1rem",
//           paddingBottom:"1rem",
//           textAlign:"left",
//           marginBottom:"2rem",
//         borderRadius:"1rem"
//       }}
//         >
//           <Divider>Edit About Us</Divider>

//           <Col>
//             <Form.Item label="Our Vision" 
//             style={{width: "77%", borderRadius: "50px"}}>
//               <Input
                
//                 name="ourVision"
//                 onChange={handleInput}
//                 value={editAboutus.ourVision}
//               />
//             </Form.Item>
//             <Form.Item label="Our Vision Detail" 
//             style={{width: "77%", borderRadius: "50px"}}>
//               <Input.TextArea
                
//                 name="ourVisionDetail"
//                 onChange={handleInput}
//                 value={editAboutus.ourVisionDetail}
//               />
//             </Form.Item>
//           </Col>
//           <Col>
//             <Form.Item label="Our Mission" style={{ width: "76.5%", borderRadius: "50px" }}>
//               <Input
//                 style={{ marginLeft: "0.2em" }}
//                 name="ourMission"
//                 onChange={handleInput}
//                 value={editAboutus.ourMission}
//               />
//             </Form.Item>
//             <Form.Item label="Our Mission Detail" style={{ width: "76.5%", borderRadius: "50px" }}>
//               <Input.TextArea
//                 style={{ marginLeft: "0.2em" }}
//                 name="ourMissionDetail"
//                 onChange={handleInput}
//                 value={editAboutus.ourMissionDetail}
//               />
//             </Form.Item>
//           </Col>

//           <Col>
//             <Form.Item label="Our Team" style={{ width: "76.5%", borderRadius: "50px" }}>
//               <Input
//                 style={{ marginLeft: "0.2em" }}
//                 name="ourTeam"
//                 onChange={handleInput}
//                 value={editAboutus.ourTeam}//change this
//               />
//             </Form.Item>
//             <Form.Item label="Our Team Detail" style={{ width: "76.5%", borderRadius: "50px" }}>
//               <Input.TextArea
//                 style={{ marginLeft: "0.2em" }}
//                 name="ourTeamDetail"
//                 onChange={handleInput}
//                 value={editAboutus.ourTeamDetail}//change this
//               />
//             </Form.Item>
//           </Col>

//           <Col>
//             <Form.Item label="Title One" style={{ width: "76.5%", borderRadius: "50px" }}>
//               <Input
//                 style={{ marginLeft: "0.2em" }}
//                 name="TitleOne"
//                 onChange={handleInput}
//                 value={editAboutus.TitleOne}//change this
//               />
//             </Form.Item>
//             <Form.Item label="Title One Detail" style={{ width: "76.5%", borderRadius: "50px" }}>
//               <Input.TextArea
//                 style={{ marginLeft: "0.2em" }}
//                 name="TitleOneDetail"
//                 onChange={handleInput}
//                 value={editAboutus.TitleOneDetail}//change this
//               />
//             </Form.Item>
//             <Form.Item>
//             <Image
//           width={250}
//           height={250}
//           src={
//             "http://localhost:8000/uploads/AboutusPicture/" +
//             editAboutus.TitleOneImage
//           }
//           name="TitleOneImage"
//           style={{
//              borderRadius: "100%", alignContent: "left",marginTop:"0rem"}}
//         />
//         <Upload
//     //   action={"http://localhost:8000/uploads/AboutusPicture/" + editAboutus.TitleOneImage}
//       listType="picture"
//       className="upload-list-inline"
//     >
//         <Button
//         type="text"
//         style={{
//           marginLeft: "0rem",
//           marginTop: "-4rem",
//         }}
//         icon={<EditOutlined 
//         style={{ cursor: "pointer" }}
//             // onClick={()=>selectFile()}
//             />}
//       />
//     </Upload>
        
//             </Form.Item>
//           </Col>
//           <Col>
//             <Form.Item label="Title Two" style={{ width: "76.5%", borderRadius: "50px" }}>
//               <Input
//                 style={{ marginLeft: "0.2em" }}
//                 name="TitleTwo"
//                 onChange={handleInput}
//                 value={editAboutus.TitleTwo}//change this
//               />
//             </Form.Item>
//             <Form.Item label="Title Two Detail" style={{ width: "76.5%", borderRadius: "50px" }}>
//               <Input.TextArea
//                 style={{ marginLeft: "0.2em" }}
//                 name="TitleTwoDetail"
//                 onChange={handleInput}
//                 value={editAboutus.TitleTwoDetail}//change this
//               />
//             </Form.Item>
//           </Col>
//           <Col>
//             <Form.Item label="Title Three" style={{ width: "76.5%", borderRadius: "50px" }}>
//               <Input
//                 style={{ marginLeft: "0.2em" }}
//                 name="TitleThree"
//                 onChange={handleInput}
//                 value={editAboutus.TitleThree}//change this
//               />
//             </Form.Item>
//             <Form.Item label="Title Three Detail" style={{ width: "76.5%", borderRadius: "50px" }}>
//               <Input.TextArea
//                 style={{ marginLeft: "0.2em" }}
//                 name="TitleThreeDetail"
//                 onChange={handleInput}
//                 value={editAboutus.TitleThreeDetail}//change this
//               />
//             </Form.Item>
//           </Col>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" style={{ borderRadius: "80px", marginLeft: '0.7em', marginTop: '1em'}}>
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </Col>
//     </Row>
//   );
// }

// export default AdminAboutus;
