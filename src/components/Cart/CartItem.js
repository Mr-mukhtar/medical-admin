import React from 'react';
import classes from './CartItem.module.css';

const CartItem = (props) => {
  
  const price = `$${props.price.toFixed(2)}`;
  const handleRemove = () => {
    
    props.onRemove(props.id);

    props.onAddToOriginalList(props);
  };

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.medicine}</h2>
        <div className={classes.summary}>
          {/* <span>{description}</span> */}
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button  onClick={handleRemove}>-</button>
        <button onClick={() => props.onAdd(props)}>+</button>

      </div>
    </li>
  );
};

export default CartItem;
