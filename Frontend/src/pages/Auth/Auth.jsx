import "./Auth.css";
import {
  EyeIcon,
  EyeOffIcon,
  GithubIcon,
  GoogleIcon,
  LoadingIcon,
  LockIcon,
  LogoIcon,
  MailIcon,
  UserIcon,
} from "../../lib/Icons";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
const Auth = () => {
  const [currState, setCurrState] = useState("Sign Up");
  const [showPass, setShowPass] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isPending } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isPending) {
      return;
    }

    login(currState === "Sign Up" ? "signup" : "login", {
      fullName,
      email,
      password,
    });
  };

  return (
    <section className='login'>
      <div className='login-container'>
        <div className='left'>
          <h2>
            <LogoIcon className='text-primary size-10' />
            Quick Chat
          </h2>
          <p>
            Connect, collaborate, and create with the power of AI. Your new
            intelligent chat experience awaits.
          </p>
        </div>
        <div className='right'>
          <h3>
            {currState === "SignUp" ? "Create Your Account" : "Welcome Back"}
          </h3>
          <p>
            {currState === "SignUp"
              ? "Join the next generations of chat."
              : "Login to continue your conversations."}
          </p>

          <div className='auth-providers'>
            <button>
              <GoogleIcon className='size-6' /> Continue with Google
            </button>
            <button>
              <GithubIcon className='size-6' />
              Continue with GitHub
            </button>
          </div>

          <div className='divider'>
            <hr />
            <span>OR</span>
            <hr />
          </div>

          <div className='input-wrapper'>
            {currState === "SignUp" && (
              <div className='input-container'>
                <label htmlFor='fullname'>Full Name</label>
                <div className='input'>
                  <UserIcon className='size-5 text-muted' />
                  <input
                    type='text'
                    id='fullname'
                    placeholder='Alex Ray'
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className='input-container'>
              <label htmlFor='email'>Email</label>
              <div className='input'>
                <MailIcon className='size-5 text-muted' />
                <input
                  type='email'
                  id='email'
                  placeholder='Alex.Ray@example.com'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className='input-container'>
              <label htmlFor='password'>Password</label>
              <div className='input'>
                <LockIcon className='size-5 text-muted' />
                <input
                  type={showPass ? "password" : "text"}
                  id='password'
                  placeholder={showPass ? "*********" : "Example-Pass@123"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className='show-pass'
                  onClick={() => setShowPass(!showPass)}>
                  {showPass ? (
                    <EyeIcon className='size-5' />
                  ) : (
                    <EyeOffIcon className='size-5' />
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            type='submit'
            className={
              isPending ? "cursor-not-allowed primary-btn" : "primary-btn"
            }
            disabled={isPending}
            onClick={(e) => handleSubmit(e)}>
            {isPending ? (
              <span>
                <LoadingIcon className='size-4 text-primary-foreground animate-spin inline mr-2' />
                Please Wait...
              </span>
            ) : currState === "SignUp" ? (
              "Create an Account"
            ) : (
              "Login"
            )}
          </button>

          <p className='auth-switch'>
            {currState === "SignUp"
              ? "Already have an account?"
              : "Don't have an account?"}
            <button
              onClick={() =>
                setCurrState(currState === "SignUp" ? "Login" : "SignUp")
              }>
              {currState === "SignUp" ? "Login Here" : "Create Account"}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Auth;
