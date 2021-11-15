import classes from './Profile.module.css';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { useEffect, useState } from 'react';

const Profile = () => {
    const [name, setName] = useState();
    
    useEffect(() => {
      const token = cookie.get('token');
    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAb_3ykSmonuiEDdSwg0WDpQmE5cqaY2o4',
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
      return res.json().then((info) => {
          if (info.users) {
              setName(info.users[0].displayName);
          } else {
              return
          }
      });
    });
  }, [name]);

  let text;
  if (!!name) {
    text = name;
  } else {
    text = '';
  }

  const router = useRouter();
  return (
    <section className={classes.auth}>
      {text && <h1>{` Hello ` + text}</h1>}
      <div className={classes.actions}>
        <button
          onClick={() => {
            router.push('/updateinfo');
          }}
          className={classes.button}
        >
          update profile info
        </button>
        <button
          onClick={() => {
            router.push('/restpassword');
          }}
          className={classes.button}
        >
          rest password
        </button>
        <button  onClick={() => {
            router.push('/deleteaccount');
          }} className={classes.button}>delete account</button>
      </div>
    </section>
  );
};

export default Profile;
