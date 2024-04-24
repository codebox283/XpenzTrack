import '../styles/Home.css';
import Hero from '../assets/Hero.jpg';
import Ad from '../assets/4.jpg';
import F2 from '../assets/F2.jpg'

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

      <div className='Features'>
        <div className='F1'>
          <h2>Real Time Expense Tracking</h2>
          <p>Track your expenses in real-time along the way.</p>
        </div>
        <div className='F2'>
          <h2>Expense Categorization</h2>
          <p>Categorise  your expenses to manage them efficiently.</p>
        </div>
        <div className='F3'>
          <h2>Goal Setting</h2>
          <p>Set financial goals and progress tracking to help you stay motivated.</p>
        </div>
        <div className='F4'>
          <h2>Data Visualization</h2>
          <p> View your expense data in various formats, including charts, graphs, and tables, to gain deeper insights into your financial health</p>
        </div>
      </div>

      <div className="Advert">
        {/* <h1>ACHIEVE YOUR GOALS WITH XPENZ TRACK</h1> */}
        <div>
          <img src={Ad} alt=''></img>
        </div>
      </div>

      <div className='Features'>
        <div className='F1'>
          <h2>Real Time Expense Tracking</h2>
          <p>Track your expenses in real-time along the way.</p>
        </div>
        <div className='F2'>
          <h2>Expense Categorization</h2>
          <p>Categorise  your expenses to manage them efficiently.</p>
        </div>
        <div className='F3'>
          <h2>Goal Setting</h2>
          <p>Set financial goals and progress tracking to help you stay motivated.</p>
        </div>
        <div className='F4'>
          <h2>Data Visualization</h2>
          <p> View your expense data in various formats, including charts, graphs, and tables, to gain deeper insights into your financial health</p>
        </div>
      </div>

      <div className='Testimonials'>
        <div className='TL'>
          <img src={F2} alt=''></img>
        </div>
        <div className='TR'>
          <p>XpenZ changed the game for me! Its user-friendly interface and smart features helped me take control of my finances like never before. Thanks to XpenZ, I've redefined my financial success and couldn't be happier!</p>
          <br></br>
          <p>John Doe</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
