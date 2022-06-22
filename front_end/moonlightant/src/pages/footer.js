import { Footer } from "antd/lib/layout/layout";
import { Col, Divider, Row } from 'antd';
import { LinkedinOutlined, TwitterOutlined, FacebookOutlined, InstagramOutlined  } from "@ant-design/icons"
const Footerd = () => {
    return ( 
        <Footer
        style={{
            textAlign: "center",
            padding: "10px 5px",
            paddingBottom:"1px",
            
            
        }}
    >
        <Row gutter={24}>
            <Col className="first_col" span={8}>
            <div>
               
                <ul style={{listStyleType:"none"}}>
                <li><p> <p style={{color:"Red",fontSize:"20px"}}>Moonlight</p> Creates a community for everyone<br/> and gives everyone a chance in the real world <br/> making it the leading technology in society</p></li>           
                </ul>

            </div>
            </Col>
            <Col className="second_col" span={5}>
            <div>
                
                <ul style={{listStyleType:"none"}}>
                <li> <h3>Service</h3> </li>
                <li><a href="#" style={{textDecoration:"none" , color:"black"}}>Feedback</a></li>
                <li><a href="#" style={{textDecoration:"none" , color:"black"}}>Report</a></li>
                <li><a href="#" style={{textDecoration:"none" , color:"black"}}>Contact Us</a></li>                  
                </ul>
            </div>
            </Col>
    
            <Col className="third_col" span={5}>
            <div>
               
                <ul style={{listStyleType:"none"}}>
                <li> <h3 style={{color:"black"}}>Reach us</h3> </li>
               <li> Reach us using +251922164757 <br/> or contact us through the provided socials</li>
              
                </ul>
            </div>
            </Col>
            <Col classname="icons_col" span={6}>
                <div style={{marginTop:"2rem", fontSize:"2rem"}}>
                <LinkedinOutlined
                style={{marginLeft:"1rem",marginRight:"1rem"}}/>
                <TwitterOutlined
                style={{marginRight:"1rem"}}
                 />
                <FacebookOutlined
                style={{marginRight:"1rem"}}
                 />
                <InstagramOutlined
                style={{marginRight:"1rem"}}
                 />
                </div>
            </Col>
        </Row>
        <Divider  style={{textAlign:"center", color:"gray", fontSize:"0.7rem"}}>Copyright Reserved | Moonlight &copy; | 2022 </Divider>
       
    </Footer>
     );
}
 
export default Footerd;