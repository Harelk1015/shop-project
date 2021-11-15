import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import classes from './AuthForm.module.css';
import cookie from 'js-cookie';

const Updateinfo = () => {
  const router = useRouter();
  const nameInputRef = useRef();
  const photoInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const updateinfoHandler = (event) => {
    const token = cookie.get('token');

    const enteredName = nameInputRef.current.value
    const enteredPhoto = photoInputRef.current.value

    event.preventDefault();

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAb_3ykSmonuiEDdSwg0WDpQmE5cqaY2o4',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: token,
          displayName: enteredName,
          photoUrl: enteredPhoto,
          deleteAttribute: [],
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => {
      setIsLoading(false);
      console.log(res);
      router.push('/profile')
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
      <h1>Update Info</h1>
      <form onSubmit={updateinfoHandler}>
        <div className={classes.control}>
          <label htmlFor="name">New Name</label>
          <input ref={nameInputRef} type="text" id="name" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="photo">New Photo</label>
          <input ref={photoInputRef} type="text" id="photo" required />
        </div>
        {/* {errorMessage && <p className={classes.control}>{errorMessage}</p>} */}
        {isLoading && <p className={classes.control}>Loading...</p>}
        <div className={classes.actions}>
          {!isLoading && <button>Update</button>}
        </div>
      </form>
    </section>
  );
};

export default Updateinfo;
