import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, List, Modal, Space } from "antd";
import axios from "axios";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";

const SocialMediaLink = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idLink, setIdLink] = useState();
  const [link, setLink] = useState();
  const showModal = (id) => {
    setIsModalVisible(true);
    setIdLink(id);
    
  };
  useEffect(() => {
    // axios.get('/sanctum/csrf-cookie').then(res => {
    axios.get(`/api/getSocialMediaLinkSingle/${idLink}`).then((res) => {
      if (res.data.status === 200) {
        setLink(res.data.socialMediaLink);
        console.log(res.data.socialMediaLink)
        console.log(idLink);
      } else {
        console.log("couldnt retrieve data");
      }
    });
  }
  , [idLink]);
  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [visible, setVisible] = useState(true);

  const [socialMediaLink, setSocialMediaLink] = useState([
    {
      link: "",
      user_id: "",
    },
  ]);
  const [socialMediaLinkList, setSocialMediaLinkList] = useState([]);

  const [addSocialMediaLink, setAddSocialMediaLink] = useState({
    link: "",
    user_id: "",
  });

  const addLink = (e) => {
    const data = {
      link: addSocialMediaLink.link,
      user_id: localStorage.getItem("auth_id"),
    };
    console.log(socialMediaLink.link);
    axios.get("/sanctum/csrf-cookie").then((res) => {
      console.log("inside csrf");

      axios.post(`/api/addSocialMediaLink`, data).then((res) => {
        if (res.data.status === 200) {
          console.log("link added");
        } else {
          console.log("link not added");
        }
      });
    }, []);
  };

  const deleteSocialMediaLink = (id, e) => {
    axios.get("/sanctum/csrf-cookie").then((res) => {
      console.log("inside csrf");

      axios.delete(`/api/deleteSocialMediaLink/${id}`).then((res) => {
        if (res.data.status === 200) {
          console.log("link deleted");
        } else {
          console.log("link not deleted");
        }
      });
    }, []);
  };

  
  const id = localStorage.getItem("auth_id");
  useEffect(() => {
    // axios.get('/sanctum/csrf-cookie').then(res => {
    axios.get(`/api/getSocialMediaLink/${id}`).then((res) => {
      if (res.data.status === 200) {
        setSocialMediaLink(res.data);
        setSocialMediaLinkList(res.data.socialMediaLink);
        console.log(socialMediaLinkList.link);
      } else {
        console.log("couldnt retrieve data");
      }
    });
  }, []);

  

  const handleInput = (e) => {
    // e.persist();
    setAddSocialMediaLink({
      ...addSocialMediaLink,
      [e.target.name]: e.target.value,
    });
    setLink( e.target.value);
  };

  //   const handleClick = () => {
  //     window.open({socialMediaLink.link});
  //   };

  const editSocialMediaLink = (id) => {
    const data = {
      link: link,
      user_id: localStorage.getItem("auth_id"),
    };
    console.log(id)
    axios.get("/sanctum/csrf-cookie").then((res) => {
      console.log("inside csrf");

      axios.put(`/api/editSocialMediaLink/${id}`, data).then((res) => {
        if (res.data.status === 200) {
          console.log("Link edited");
        } else {
          console.log("Link not edited");
        }
      });
    }, []);
  };

  return (
    <div style={{flexDirection:"column"}}>
      
      {socialMediaLinkList.map((item) => (
        <Space>
          <a
            key={item.id}
            href={item.link}
            style={{
              color: "black",
              borderRadius: 100,
              border: 0,
              margin: 2,
              backgroundColor: "#ffffff",
            }}
          >
            {item.link}
          </a>
          <Button
            type="text"
            key={item.id}
            icon={<EditOutlined />}
            onClick={() => {showModal(item.id);
            }}
          />
          ,
          <Button
            type="text"
            onClick={() => deleteSocialMediaLink(item.id)}
            icon={<CloseOutlined size="2px" />}
          />
          
        </Space>
      ))}
<br />

      <Form onFinish={addLink}>
        <Form.Item>
          <Input
            name="link"
            onChange={handleInput}
            value={addSocialMediaLink.link}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Link
          </Button>
        </Form.Item>
      </Form>
      <Modal
        className="modal"
        title="Edit Social Media Link"
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form
          onFinish={() => editSocialMediaLink(idLink)}
          autoComplete="off"
          title="Social Media Link"
        >
          <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
            <Form.Item>
              <Input
                key={idLink}
                placeholder="Link"
                name="link"
                onChange={handleInput}
                value={link}
              />
            </Form.Item>
            <br />
          </Space>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Edit Link
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default SocialMediaLink;
