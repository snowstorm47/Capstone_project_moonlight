import React, { useEffect, useState } from "react";
import { List, Avatar, Space, Skeleton, Button,message,Modal} from "antd";
import { DeleteOutlined  } from "@ant-design/icons";
import "../../styles/newsCard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminHiring = () => {
	const [visible, setVisible] = useState(true);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [ids,setIds]=useState({id:'',user_id:''})
	let iduserget;
  const showModal = (id,user_id) => {
    setIsModalVisible(true);
	console.log(isModalVisible);
	setIds({id:id,user_id:user_id})


  };

  const handleOk = (id,user_id) => {
    setIsModalVisible(false);
	deleteHiringCompany(id,user_id)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
	
  };
	const navigate = useNavigate();
	const IconText = ({ icon, text }) => (
		<Space>
			{React.createElement(icon)}
			{text}
		</Space>
	);
    const [state, setState] = useState();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		axios.get("api/hiring").then((response) => {
			setState(response.data.hiring);
			setLoading(false);
		});
	}, []);

    const deleteHiringCompany = (id,user_id) => {
				
        axios.delete(`/api/deleteHiringCompany?id=${id}&user_id=${user_id}`).then((res) => {
            if (res.data.status === 200) {
                message.success("Hiring Company deleted");
				axios.get("api/hiring").then((response) => {
					setState(response.data.hiring);
					setLoading(false);
				});
              } else {
                message.error("Hiring Company not deleted");
              }
        });
      };

	
	return (
		<div>
	<Modal title="Delete Hiring Company" visible={isModalVisible}
	 onOk={()=>handleOk(ids.id,ids.user_id)}
	  onCancel={handleCancel}>
	Do You Want to Delete The Company
  </Modal>
      {visible ? (
        <List
          itemLayout="horizontal"
          dataSource={state}
          renderItem={(item) => (
            <>
              {item == null ? (
                <>
                  <Skeleton loading={true} active avatar></Skeleton>
                  <Skeleton loading={true} active avatar></Skeleton>
                  <Skeleton loading={true} active avatar></Skeleton>
                </>
              ) : (
                <>
                  <></>
                  <List.Item
                    style={{
                      marginBottom: "1em",
                    }}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={
                            "http://localhost:8000/uploads/ProfilePicture/" +
                            item.image
                          }
                        />
                      }
                      title={
                        
                        <p
                          style={{
                            marginLeft: "0em",
                          }}
                        >
                          <a >{item.name}{" "}</a>
                        </p>
                      }
                      description={item.email}
                      style={{
                        textAlign: "left",
                      }}
                    />
                    <br />
                    <br />
                    
                    <List.Item
                      actions={[
                        <Button
                          type="text"
                        //   onClick={() => deleteHiringCompany(item.id,item.user_id)}
						onClick={()=>showModal(item.id,item.user_id)}
                          key="list-loadmore-more"
                          icon={<DeleteOutlined />}
                        />,
                      ]}
                    ></List.Item>
                  </List.Item>
                </>
              )}
            </>
          )}
        />
      ) : null}
    </div>
	);
};

export default AdminHiring;
