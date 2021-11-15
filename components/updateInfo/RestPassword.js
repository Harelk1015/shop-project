import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import classes from './AuthForm.module.css';
import cookie from 'js-cookie';

const RestPassword = () => {
  const router = useRouter();
  const passwordInputRef = useRef();

  const updateinfoHandler = (event) => {
    const token = cookie.get('token');

    const enteredPassword = passwordInputRef.current.value;

    event.preventDefault();

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAb_3ykSmonuiEDdSwg0WDpQmE5cqaY2o4',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: token,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => {
      console.log(res);
      if (res.ok) {
        return res.json().then((data) => {
          cookie.set('token', data.idToken);
          router.push('/profile');
        });
      } else {
        return res.json().then((data) => {
          if (data && data.error && data.error.message) {
            alert(data.error.message);
          }
        });
      }
    });
  };

  return (
    <section className={classes.auth}>
      <h1>Restart Password</h1>
      <form onSubmit={updateinfoHandler}>
        <div className={classes.control}>
          <label htmlFor="password">New Password</label>
          <input
            ref={passwordInputRef}
            type="password"
            id="password"
            required
          />
        </div>
        <div className={classes.actions}>
          <button>Update</button>
        </div>
      </form>
    </section>
  );
};

export default RestPassword;
