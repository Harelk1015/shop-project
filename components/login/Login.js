import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import classes from './AuthForm.module.css';
import cookie from 'js-cookie';

const AuthForm = () => {
  const router = useRouter();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const sendToLogin = () => {
    router.push('/register');
  };

  const LoginHandler = (event) => {
    event.preventDefault();

    const eneteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAb_3ykSmonuiEDdSwg0WDpQmE5cqaY2o4',
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
    )
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            if (data && data.error && data.error.message) {
              setErrorMessage(data.error.message);
            }
          });
        }
      })
      .then((data) => {
        if (data) {
          cookie.set('token', data.idToken, {expires: 1/24})
          router.push('/profile')
        }
      //   fetch("/auth", {
      //     method: "post",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ token: "ABCD" }),
      //   });
      });
  };

  return (
    <section className={classes.auth}>
      <h1>Sign In</h1>
      <form onSubmit={LoginHandler}>
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
          {!isLoading && <button>Login</button>}
          <button
            type="button"
            className={classes.toggle}
            onClick={sendToLogin}
          >
            Create New Account
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
