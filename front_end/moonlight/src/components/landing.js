import '../styles/landing.css';
import '../styles/footer.css'; 
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
import image1 from '../assets/image4.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image5.jpg';



const Landing = () => {
    return ( 
        <div className="body1">

          <Carousel className = 'carousel' fade>
             <Carousel.Item>
    <img width={900} height={500} 
      className="d-block w-100"
      src={image1}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
            <Carousel.Item>
    <img width={900} height={500} 
      className="d-block w-100"
      src={image2}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
        </Carousel.Item>
            <Carousel.Item>
              <img width={900} height={500}  src={image3} alt="..." className='d-block w-100' />
              <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img width={900} height={500} src={image4} alt="..." className='d-block w-100' />
              <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
            </Carousel.Item>

          </Carousel>

          

  

<Row className='cards'> 

  <Col xs={6} md={4}>
  <Card>
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora pariatur reprehenderit ducimus, recusandae facere quaerat. Natus in atque eligendi, repellat magnam, neque reiciendis at delectus tempore, sint cumque rerum quam.
      </Card.Text>
    </Card.Body>
  </Card>
</Col>

<Col xs={6} md={4}>
  <Card>
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem unde est repudiandae qui modi. Aspernatur non ea, laudantium, laboriosam eius voluptatum deleniti porro, magnam debitis quisquam dolor corporis voluptas atque.
      </Card.Text>
    </Card.Body>
  </Card>
  </Col>

  <Col xs={6} md={4}>
  <Card>
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
       Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam tenetur maiores excepturi voluptatibus temporibus. Sunt facere maxime amet esse eius, nostrum mollitia non debitis quibusdam adipisci dolor cumque! Provident, sunt!
      </Card.Text>
    </Card.Body>
  </Card>
</Col>

</Row>

</div> 
     );
}
 
export default Landing;