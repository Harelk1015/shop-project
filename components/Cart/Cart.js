// import { MongoClient } from 'mongodb';
import Modal from '../UI/Modal';
import CartItem from './Cartitem';
import classes from './Cart.module.css';
// import Checkout from './Checkout';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import { useDispatch } from 'react-redux';
import { cartStatusActions } from '../../store';

const Cart = () => {
  const dispatch = useDispatch();
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = ( name ) => {
    cartCtx.removeItem( name )
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem( item );
  };

  // const orderClickHandler = () => {
  //   setOrderClicked(true)
  // }

  // const orderCancelHandler = () => {
  //   setOrderClicked(false)
  // }
  
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          name={item.name}
          amount={item.amount}
          price={item.price}
          key={item.name}
          onRemove={cartItemRemoveHandler.bind(null, item)}
          onAdd={cartItemAddHandler.bind(null, item)}
        >
          {item.name}
        </CartItem>
      ))}
    </ul>
  );

  const closeCart = () => {
    dispatch(cartStatusActions.hideCartHandler());
  };

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        {/* {!orderClicked && ( */}
        <button className={classes['button--alt']} onClick={closeCart}>
          Close
        </button>
        {/* )} */}
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
      <div className={classes.actions}>
        {/* {orderClicked &&  */}
        {/* <Checkout /> */}
        {/* // />} */}
      </div>
    </Modal>
  );
};

export default Cart;

// export async function getStaticProps() {
//   const client = await MongoClient.connect(
//     'mongodb+srv://harelk1015:@cluster0.1szjm.mongodb.net/shopProject?retryWrites=true&w=majority'
//   );
//   const db = client.db();

//   const cartCollection = db.collection('cart');

//    const cart = await cartCollection.find().toArray()

//    client.close()
//   return {
//     props: {
//       cart: cart.map(item => ({
//         name: item.name,
//         price: item.price,
//         id: item._id.toString()
//       }))
//     }
//   };
// }
