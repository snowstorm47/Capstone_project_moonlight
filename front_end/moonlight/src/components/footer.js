import '../styles/footer.css';

const Footer = () => {
    return ( 


           <section className="footer">
      {/* <hr className="footer-seperator" /> */}
      {/* <section className="footer-social-media">
        <a href="/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </section> */}
      <section className="footer-info">
        <section className="footer-info-left">
          <section className="footer-info__name">
              Address
          </section>
          <section className="footer-info__returns">
            Addis Ababa Science and Technology University
          </section>        
        </section>
        <section className="footer-info-center">
          <section className="footer-info__email">
            Contact
          </section>
          <section className="footer-info__terms">
            Email: ICNP@gmail.com
            <br />
            Phone: +251999999999
          </section>
        </section>
        <section className="footer-info-right">
          <section className="footer-info__number">
            Links
          </section>
          <section className="footer-info__contact">
            FaceBook
            <br />
            Twitter
            <br />
            WhatsApp
          </section>
        </section>
      </section>
      <hr className="footer-seperator" />
      <section className="copy">
          Copyright
      </section>
    </section>


     );
}
 
export default Footer;