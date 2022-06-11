
import {  Button, Card, Carousel, Col, Popover, Row, AutoComplete } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useState } from "react";
import illustration from "../assets/hiringillustration.png";
import { Input, Space } from 'antd';
// import Ripple from "../components/ripple";

const { Search } = Input;

const popoverContent = (
    <div>
      <p>Please Click Here For a More Advanced Search Result.</p>
    </div>
  );

const getRandomInt = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

const searchResult = (query) =>
  new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>
              Found {query} on{' '}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });

const HiringCompany = () => {


    const [options, setOptions] = useState([]);

    const handleSearch = (value) => {
      setOptions(value ? searchResult(value) : []);
    };
  
    const onSelect = (value) => {
      console.log('onSelect', value);
    };
  



    return ( 
        <div className="topContainer" style={{marginBottom:"5erm"}} >
        <div className="wordCaroselContainer" style={{marginBottom:"2erm"}}>
            <div>
            

                <Carousel
                    style={{ width: "auto", marginleft: "20px", display: "flex" }}
                    autoplay
                    dots={false}
                    effect="fade"
                >
                    <Card bordered={false} className="homeCard">
                        <h1 style={{ color: "black" }}>
                            Stay connected to your community
                        </h1>
                        <span>
                            we offer multiple convinient ways of connecting you with the
                            community you learned and grew up with by using either news,
                            posts from fellow students or notifications
                        </span>
                    </Card>
                    <Card bordered={false} className="homeCard">
                        <h1 style={{ color: "black" }}>
                            Find jobs best suited for you
                        </h1>
                        <span>
                            Employers accross the country will have access to your profile
                            through our advanced filtering method for better
                            compatability.
                        </span>
                    </Card>
                    <Card bordered={false} className="homeCard">
                        <h1 style={{ color: "black" }}>
                            Get the latest news from Institutions
                        </h1>
                        <span>
                            Get news from multiple institutions located in different
                            cities accross the country with the option to filter it to
                            your personal institution of choice.
                        </span>
                    </Card>
                    {/* <Ripple/> */}
                    
                </Carousel>
               

                <Row style={{marginTop:"6rem", justify:"center", position:"relative",}}>
             <Col span={12} pull={2}>
             <AutoComplete
      dropdownMatchSelectWidth={252}
      style={{ marginBottom:'15rem', width:"60rem" }}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
    >
      <Input.Search size="middium" placeholder="Search using skill" enterButton />
    </AutoComplete>
             </Col>


             <Col span={12} push={24} >
             <Popover content={popoverContent} title="Advanced Search">
             <Button type="primary" style={{marginLeft:"10rem",paddingBottom:"0.5rem"}}> Advanced Search</Button>
             </Popover>
             </Col>
                </Row>

                
                   
{/*               
               <div style={{marginBottom:"5rem"}}>
                <Space direction="vertical" style={{ width: "50rem", marginBottom:'15rem'}}>
               
                </Space>
                </div> */}
              
                
            </div>
        </div>

        <div className="image" style={{paddingBottom:'5rem'}}>
            
            <img src={illustration} className="illustration" alt=""  style={{height:'22rem',width:'22rem',marginBottom:'5rem'}}/>
        </div>
    </div>
     );
}
 
export default HiringCompany;