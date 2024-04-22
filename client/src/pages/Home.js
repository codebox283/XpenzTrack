import '../styles/Home.css';
import Hero from '../assets/Hero.jpg';

const Home = () => {
  return (
    <div className='Home'>
      <div className="Navbar">
        <div className="Logo">
            <h3>XPENZ<br></br>TRACK</h3>
        </div>
        <div className='Buttons'>
            <button>Sign Up</button>
            <button>Log In</button>
        </div>
      </div>

      <div className='Hero'>
        <div className='HeroLeft'>
            <h1>Empower Your Finances</h1>
            <p>Revolutionize Your Financial Journey, Redefine Your Success with XpenZ!</p>
            <button>Get Started</button>
        </div>
        <div className='HeroRight'>
            <img src={Hero} alt=''></img>
        </div>
      </div>
    </div>
  );
}

export default Home;
