import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import './header.css';
const Header = () => {
    return ( 
        <div className="body">
            <Navbar bg="light" variant="light">
             <Container>
                <Navbar.Brand to="/landing">Moonlight</Navbar.Brand>
                    <Nav className="me-auto">
                        
                        <Nav.Link to="/landing">Home</Nav.Link>
                         <Nav.Link to="/news">News Feed</Nav.Link>
                         <Nav.Link to="/notification">Notifications</Nav.Link>
                         <Nav.Link to="/about">About</Nav.Link>
                         <Nav.Link to="/contact">Contact Us</Nav.Link>
                         <Link to="/register" className='sign'>
                         Sign up
                         </Link>
                         <Link to="/login" className='log'>
                             Login
                         </Link>
                    </Nav>
             </Container>
            </Navbar>
        </div>
     );
}
 
export default Header;