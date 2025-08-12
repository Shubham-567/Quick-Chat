import "./Login.css";
import assets from "../../assets/assets";
import { useState } from "react";

const Login = () => {
  const [currState, setCurrState] = useState("Sign Up");
  const [showPass, setShowPass] = useState(false);

  return (
    <div className='login'>
      <img src={assets.logo_big} alt='logo' className='logo' />

      <form className='login-form'>
        <h2>{currState}</h2>

        {currState === "Sign Up" ? (
          <input
            type='text'
            placeholder='Username'
            required
            className='form-input'
          />
        ) : null}

        <input
          type='email'
          required
          placeholder='Email address'
          className='form-input'
        />
        <input
          type={showPass ? "password" : "text"}
          placeholder='Password'
          required
          className='form-input'
        />

        <button type='submit'>
          {currState === "Sign Up" ? "Create an Account" : "Login"}
        </button>

        <div className='showPass'>
          <input
            type='checkbox'
            onChange={() => setShowPass(!showPass)}
            id='showPass'
          />
          <label htmlFor='showPass'>Show Password</label>
        </div>

        <div className='login-term'>
          <input type='checkbox' id='agree' />
          <label htmlFor='agree'>
            Agree to the term of use & privacy policy.
          </label>
        </div>

        <div className='login-forgot'>
          {currState === "Sign Up" ? (
            <p className='login-toggle'>
              Already have an account{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          ) : (
            <p className='login-toggle'>
              Don't have an account{" "}
              <span onClick={() => setCurrState("Sign Up")}>Click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
