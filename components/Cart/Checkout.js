import { useRef } from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {
  const nameRef = useRef('');
  const streetRef = useRef('');
  const postalCodeRef = useRef('');
  const cityRef = useRef('');

  // const cartCtx = useContext(CartContext);

  const confirmHandler = (event) => {
    event.preventDefault();
  };

  async function sendInfoHandler() {
    const DeliveyInfo = {
      street: streetRef.current.value,
      name: nameRef.current.value,
      postalCode: postalCodeRef.current.value,
      city: cityRef.current.value,
    };

    const response = await fetch(
      'https://react-http-60990-default-rtdb.europe-west1.firebasedatabase.app/info.json',
      {
        method: 'POST',
        body: JSON.stringify({
          userInfo: DeliveyInfo,
          oderderdItems: cartCtx,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    console.log(data);

    streetRef.current.value = '';
    nameRef.current.value = '';
    postalCodeRef.current.value = '';
    cityRef.current.value = '';
  }

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button onClick={sendInfoHandler} className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
