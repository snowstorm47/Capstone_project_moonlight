import { Button } from 'bootstrap';
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBContainer, CDBSelect } from 'cdbreact';
import Form from 'react-bootstrap/Form';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/forgot.css';
const Forgot = () => {
    return ( 
        <div className="forgot_body">
        <CDBContainer className="d-flex align-items-center justify-content-center min-vh-100">
         <CDBCard style={{ width: '24rem', borderRadius: '20px', height: '23rem', border: 'none' }}>
           <CDBCardBody className="mx-4">
             <div className="text-center">
            <p className="h2 bold"> Reset Password </p>
            </div>

              <label htmlFor="defaultRegisterEmail" className="text-muted m-0">
                Your Name
              </label>
              <CDBInput id="defaultRegisterEmail" className="mt-n3" type="email" />
                <label htmlFor="defaultRegisterEmail" className="text-muted m-0">
                    Your email
                 </label>
                  <CDBInput id="defaultRegisterEmail" className="mt-n3" type="password" />
                  <CDBBtn type="submit" color="warning" circle className="btn-block-login mt-4 mx-auto">
                    Login
                  </CDBBtn>
                  {/* <Link to="/register" style={{}}>
                    Not Signed up yet?
                  </Link> */}

           </CDBCardBody>

         </CDBCard>

       </CDBContainer>

                       
{/* 
                        <Button variant='primary' type='submit'>
                            Reset
                        </Button> */}

        </div>
     );
}
 
export default Forgot;
