import { Fragment } from 'react';
import classes from './Modal.module.css';
import { useDispatch } from 'react-redux';
import { cartStatusActions } from '../../store';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const dispatch = useDispatch()
  const hideCart = () => {
    dispatch(cartStatusActions.hideCartHandler())
  }
  return (
    <Fragment>
      <Backdrop onClose={hideCart}/>
      <ModalOverlay >{props.children}</ModalOverlay>,
    </Fragment>
  );
};

export default Modal;
