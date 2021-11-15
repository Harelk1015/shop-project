import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const router = useRouter();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const sendToLogin = () => {
    router.push('/login');
  };

  const RegisterHandler = (event) => {
    event.preventDefault();

    const eneteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAb_3ykSmonuiEDdSwg0WDpQmE5cqaY2o4',
      {
        method: 'POST',
        body: JSON.stringify({
          email: eneteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => {
      setIsLoading(false);
      console.log(res)
      if (res.ok) {
      } else {
        return res.json().then((data) => {
          console.log(data)
            console.log(data.error.message);
          
        });
      }
    });
  };

  return (
    <section className={classes.auth}>
      <h1>Sign Up</h1>
      <form onSubmit={RegisterHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={emailInputRef} type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            ref={passwordInputRef}
            type="password"
            id="password"
            required
          />
        </div>
        {errorMessage && <p className={classes.control}>{errorMessage}</p>}
        {isLoading && <p className={classes.control}>Loading...</p>}
        <div className={classes.actions}>
          {!isLoading && <button>Create Account</button>}
          <button
            type="button"
            className={classes.toggle}
            onClick={sendToLogin}
          >
            Login with existing account
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
