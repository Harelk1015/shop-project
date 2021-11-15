import Item from '../homepage/Item';
import classes from './itemsContainer.module.css';

const ItemsContainer = (props) => {
  const items = props.items;

  return (
    <div>
      <h1>{props.header}</h1>
      <div className={classes.container}>
        {items.map((item) => {
          return (
            <Item key={item.name} img={item.img} name={item.name} price={item.price}></Item>
          );
        })}
      </div>
    </div>
  );
};

export default ItemsContainer;
