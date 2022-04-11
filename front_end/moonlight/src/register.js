import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBContainer, CDBSelect } from 'cdbreact';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import image from './image3.jpg';


import 'bootstrap/dist/css/bootstrap.css';
import './register.css'
const Register = () => {
  
    const [option] = useState([
    {
      text: 'Institution',
      value: '1',
    },
    {
      text: 'Student',
      value: '2',
    },
    {
      text: 'Hiring Company',
      value: '3',
    },
  ]);

    return (


<div className="body" style={{backgroundImage:`url(${image})`,  backgroundSize: 'cover', maxHeight: 'fit-content',  }}>

 <CDBContainer className="d-flex">
      <CDBCard className="card1">
        <CDBCardBody className="mx-4">
          <div className="text-center">
            <p className="h2" > Sign up </p>
          </div>
          <div className="select">
            <CDBSelect options={option} selected="Sign up as" className="select" />
          </div>
          <label htmlFor="defaultRegisterName" className="text-muted m-0">
            Enter Name 
          </label>
          <CDBInput id="defaultRegisterName" className="mt-n3" type="text" />
          <label htmlFor="defaultRegisterEmail" className="text-muted m-0">
            Your email
          </label>
          <CDBInput id="defaultRegisterEmail" className="mt-n3" type="email" />
          <label htmlFor="defaultRegisterPassword" className="text-muted m-0">
            Your password
          </label>
          <CDBInput id="defaultRegisterPasswordConfirm" className="mt-n3" type="email" />
          <label htmlFor="defaultRegisterPassword" className="text-muted m-0" placeholder='confirm password'>
            Confirm Your password
          </label>
          <CDBInput id="defaultRegisterPassword" className="mt-n3" type="email" />
          <Link to="/login" style={{textDecoration:'none'}}>
            <CDBBtn type="submit" color="warning" circle className="btn-block-register">
            Register
          </CDBBtn>
        </Link>
        </CDBCardBody>
      </CDBCard>
    </CDBContainer>
</div>

     );
}
 
export default Register;