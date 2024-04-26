import '../styles/Login.css';

const Login = () => {

    return (
        <div className='auth'>

            <div className='container'>
                <h2 className='header'>User Login</h2>
                <p className='header-text'>Hey,Enter your details to get sing in to your account</p>
                <form>
                <input type='text' placeholder='Enter Email/Phone No'  className='user-fild'></input><br></br>
                <input type='password' placeholder='Passcode' className='user-fild'></input><br></br>
                <input type='submit' className='submit-button'></input>
                </form>
                <p className='text-1'>Forgot password?</p>
                <p className='text-2'>Don't have an account? <a href='#..'>Request Now</a></p>
            </div>
        </div>

    );
}

export default Login;
