import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';import { useSelector } from 'react-redux';

function Layout(props) {
  const cartIsShown = useSelector(state => state.cartStatus.cartIsShown)
    


  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
