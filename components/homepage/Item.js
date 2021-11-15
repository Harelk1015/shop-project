import classes from './item.module.css';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';

const Item = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price}`;

  const addToCartHandler = () => {
    console.log(props.name, props.price);
    cartCtx.addItem({
      id: props.name,
      name: props.name,
      amount: 1,
      price: props.price,
    });
  };

  return (
    <>
      <div className={classes.item}>
        <img src={props.img} alt={props.title} />
        <h2 className={classes.p}>{props.name}</h2>
        <p>{price}$</p>
        <div className={classes.button}>
          <button onClick={addToCartHandler}>Add To Cart</button>
        </div>
      </div>
    </>
  );
};

export default Item;
