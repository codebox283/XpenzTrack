import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import Logo from '../assets/expense..png'
import Hero from '../assets/Hero.jpg';
import Contact from '../assets/Contact.jpg';
import Instagram from '../assets/instagram.svg';
import LinkedIn from '../assets/linkedin-in.svg';
import GitHub from "../assets/github.svg";
import Testimonials from '../components/Testimonials';
import FactSlideshow from '../components/FactSlideShow';

const TYPING_SPEED = 150; 
const DELETING_SPEED = 100; 

class Typer extends React.Component {
  state = {
    text: '',
    isDeleting: false,
    loopNum: 0,
    typingSpeed: TYPING_SPEED
  }

  componentDidMount() {
    this.handleType();
  }

  handleType = () => {
    const { dataText } = this.props;
    const { isDeleting, loopNum, text, typingSpeed } = this.state;
    const i = loopNum % dataText.length;
    const fullText = dataText[i];

    this.setState({
      text: isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1),
      typingSpeed: isDeleting ? DELETING_SPEED : TYPING_SPEED
    });

    if (!isDeleting && text === fullText) {
      setTimeout(() => this.setState({ isDeleting: true }), 500);
    } else if (isDeleting && text === '') {
      this.setState({
        isDeleting: false,
        loopNum: loopNum + 1
      });
    }

    setTimeout(this.handleType, typingSpeed);
  };

  render() {
    return (
      <span id='cursor-container'>
        {this.state.text}
        <span id="cursor"></span>
      </span>
    );
  }
}


const Home = () => {
  const typingText = [
    "FINANCES",
    "EXPENSES",
    "GOALS",
    "SAVINGS",
    "LIFE!"
  ];

  return (
    <div className='Home'>
      <div className="Navbar">
        <div className="NavLogo">
          <img src={Logo} alt="Logo"/>
        </div>
        <div className='NavbarButtons'>
          <Link to='/signup'><button className='btn1'>Sign Up</button></Link>
          <Link to='/login'><button className='btn2'>Log In</button></Link>
        </div>
      </div>

      <div className='Hero'>
        <div className='HeroLeft'>
          <h1>EMPOWER YOUR <br/> 
            <Typer dataText={typingText} />
          </h1>
          <p>
            Revolutionize Your Financial Journey, Redefine Your Success with 
            <b> XPENZ TRACK</b>!&nbsp;
          </p>
          <Link to='/signup'><button>Get Started</button></Link>
        </div>
        <div className='HeroRight'>
          <img src={Hero} alt='' />
        </div>
      </div>

      <div className='Features'>
        <div className='F1'>
          <h2>Real Time Expense Tracking</h2>
          <p>Track your expenses in real-time along the way.</p>
        </div>
        <div className='F2'>
          <h2>Expense Categorization</h2>
          <p>Categorise your expenses to manage them efficiently.</p>
        </div>
        <div className='F3'>
          <h2>Goal Setting</h2>
          <p>Set financial goals and progress tracking to help you stay motivated.</p>
        </div>
        <div className='F4'>
          <h2>Data Visualization</h2>
          <p>View your expense data in various formats, including charts, graphs, and tables, to gain deeper insights into your financial health</p>
        </div>
      </div>

      <FactSlideshow />
      <Testimonials />

      <div className='ContactSection'>
        <div className='ContactLeft'>
          <h1>Let's Talk! <br /> WOOF!</h1>
          <p>You can ask us questions about our app, and we will be happy to answer you!</p>
          <button>Contact Us</button>
        </div>
        <div className='ContactRight'>
          <img src={Contact} alt='' />
        </div>
      </div>

      <div className='Footer'>
        <div className="FootTop">
          <div className='FTL'>
            <img src={Logo} alt=''></img>
            <p>Updates right to your inbox</p>
            <div className='Newsletter'>
              <input placeholder='Email Address' />
              <button>Send</button>
            </div>
          </div>
          
          <div className='FTR'>
            <ul className='Links'>
              <li>Our Story</li>
              <li>FAQ</li>
              <li>Contact</li>
            </ul>
            <ul className='Links'>
              <li>Services</li>
              <li>Track Money</li>
              <li>Save Money</li>
            </ul>
            <ul className='Links'>
              <li>Source</li>
              <li>GitHub</li>
              <li>Team</li>
            </ul>
          </div>
        </div>

        <div className='FootBot'>
          <span>
            <p>© 2024 XPENZTRACK</p>
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
          </span>
          <span>
            <img src={Instagram} alt='' />
            <img src={LinkedIn} alt='' />
            <img src={GitHub} alt='' />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;
