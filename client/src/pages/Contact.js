import '../styles/Home.css';
import ContactImg from '../assets/Contact.jpg';
import Navbar from '../components/Navbar';

const Contact = () => {
    return (
        <div className='ContactSection'>
          {/* <Navbar /> */}
        <div className='ContactLeft'>
          <h1>Let's Talk! <br /> WOOF!</h1>
          <p>You can ask us questions about our app, and we will be happy to answer you!</p>
          <button>Contact Us</button>
        </div>
        <div className='ContactRight'>
          <img src={ContactImg} alt='' />
        </div>
      </div>
    );
}

export default Contact;