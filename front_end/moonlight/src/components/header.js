import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import '../styles/header.css';
const Header = () => {
    return ( 
        <div className="body">
            <Navbar variant="light">
             <Container>
                <Navbar.Brand to="/landing">Moonlight</Navbar.Brand>
                    <Nav className="me-auto">
                       
                        <Link to="/landing" className="home_link">Home</Link>
                         <Link to="/news" className="news_link">News Feed</Link>
                         <Link to="/notification" className="notification_link">Notifications</Link>
                         <Link to="/about" className="about_link">About</Link>
                         <Link to="/contact" className='contact_link'>Contact Us</Link>

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