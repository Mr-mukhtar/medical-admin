import React, { useContext } from 'react';
import CartContext from '../store/cart-context';
import classes from './MedicineList.module.css';

const MedicineList = (props) => {
  const cartCtx = useContext(CartContext);

  const handleAddToCart = (medicine) => {
    if (medicine && medicine.quantity > 0) {
      cartCtx.addItem({
        id: medicine.id,
        medicine: medicine.medicine,
        amount: 1,
        price: medicine.price,
        quantity: medicine.quantity - 1,
      });

      // Instead of managing updatedMedicineItems in local state, you can directly update props.medicineItems
      const updatedItems = [...props.medicineItems];
      const itemIndex = updatedItems.findIndex((item) => item.id === medicine.id);
      
      if (itemIndex !== -1) {
        updatedItems[itemIndex].quantity -= 1;
        // Update the parent component's medicineItems state
        props.onAddToCart(updatedItems);
      } else {
        console.log(`Medicine with ID ${medicine.id} not found in the list.`);
      }
    }
  };

  return (
    <div className={classes.MedicineList}>
      <h2>Medicine List</h2>
      <ul>
        {props.medicineItems.map((medicine) => (
          <li key={medicine.id} className={classes.MedicineListItem}>
            <div className={classes.MedicineName}>{medicine.medicine}</div>
            <div className={classes.MedicineDescription}>{medicine.description}</div>
            <div className={classes.MedicinePrice}>{`$${medicine.price.toFixed(2)}`}</div>
            <div className={classes.MedicineQuantity}>Quantity: {medicine.quantity}</div>
            <button
              onClick={() => handleAddToCart(medicine)}
              disabled={medicine.quantity === 0}
              className={
                medicine.quantity === 0
                  ? classes.AddToCartButtonDisabled
                  : classes.AddToCartButton
              }
            >
              {medicine.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineList;
