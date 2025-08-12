import "./Login.css";
import assets from "../../assets/assets";

const Login = () => {
  return (
    <div className='login'>
      <img src={assets.logo_big} alt='logo' className='logo' />

      <form className='login-form'>
        <h2>Sign Up</h2>

        <input
          type='text'
          placeholder='Username'
          required
          className='form-input'
        />
        <input
          type='email'
          required
          placeholder='Email address'
          className='form-input'
        />
        <input
          type='password'
          placeholder='Password'
          required
          className='form-input'
        />

        <button type='submit'>Sign Up</button>

        <div className='login-term'>
          <input type='checkbox' />
          <p>Agree to the term of use & privacy policy.</p>
        </div>

        <div className='login-forgot'>
          <p className='login-toggle'>
            Already have an account <span>Click here</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
