import "./Login.css";
import assets from "../../assets/assets";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [currState, setCurrState] = useState("Sign Up");
  const [showPass, setShowPass] = useState(false);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currState === "Sign Up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    login(currState === "Sign Up" ? "signup" : "login", {
      fullname,
      email,
      password,
    });
  };

  return (
    <div className='login'>
      <img src={assets.logo_big} alt='logo' className='logo' />

      <form className='login-form'>
        <h2>{currState}</h2>

        {currState === "Sign Up" ? (
          <input
            type='text'
            placeholder='Fullname'
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
            className='form-input'
          />
        ) : null}

        <input
          type='email'
          required
          placeholder='Email address'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='form-input'
        />
        <input
          type={showPass ? "text" : "password"}
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='form-input'
        />

        <button type='submit' onClick={(e) => onSubmitHandler(e)}>
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
