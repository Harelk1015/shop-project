import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import classes from './AuthForm.module.css';
import cookie from 'js-cookie';

const DeleteAccount = () => {
  const router = useRouter();
  const passwordInputRef = useRef();

  const updateinfoHandler = (event) => {
    const token = cookie.get('token');

    event.preventDefault();

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyAb_3ykSmonuiEDdSwg0WDpQmE5cqaY2o4',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: token,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => {
        cookie.remove('token');
        router.push('/');
      if (res.ok) {
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
      <h1>Are you sure you want to delete your account?</h1>
      <form onSubmit={updateinfoHandler}>
        <div className={classes.actions}>
          <button>Delete</button>
        </div>
      </form>
    </section>
  );
};

export default DeleteAccount;
