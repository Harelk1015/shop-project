import classes from './CartItem.module.css';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';

const CartItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price}`

  const addToCartHandler = () => {
    cartCtx.addItem({
      id: props.name,
      name: props.name,
      amount: 1,
      price: props.price
    });
  };
  const removeFromCartHandler = () => {
    console.log(props.name, props.price)

    cartCtx.removeItem({
      id: props.name,
      name: props.name,
      amount: 1,
      price: props.price
    });
     
  };
  

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={removeFromCartHandler}>−</button>
        <button onClick={addToCartHandler}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
