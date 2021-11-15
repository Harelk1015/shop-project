import classes from './MainNavigation.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import HeaderCartButton from './HeaderCartButton';
import { useDispatch, useSelector } from 'react-redux';
import { cartStatusActions } from '../../store';
import Cart from '../Cart/Cart';

export default function MainNavigation({ token }) {
  const router = useRouter();
  const dispatch = useDispatch()
  const cartmode = useSelector(state => state.cartStatus.cartIsShown)

  const showCart = () => {
    dispatch(cartStatusActions.showCartHandler())
  }


  const tokenIs = cookie.get('token');

  const move = () => {
    router.push('/');
  };

  const LogoutHandler = () => {
    cookie.remove('token');
  };



  return (
    <header className={classes.header}>
      {cartmode && <Cart />}
      <div onClick={move} className={classes.logo}>
        EveryThing Shop
      </div>
      <nav>
        <ul>
          <HeaderCartButton onClick={showCart}></HeaderCartButton>
          {!tokenIs && (
            <li>
              <Link href="/register">Register</Link>
            </li>
          )}
          {!tokenIs && (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
          <li>{!!tokenIs && <Link href="/profile">Profile</Link>}</li>
          {
            <li>
              {!!tokenIs && (
                <Link href="/">
                  <a onClick={LogoutHandler}>Logout</a>
                </Link>
              )}
            </li>
          }
        </ul>
      </nav>
    </header>
  );
}
