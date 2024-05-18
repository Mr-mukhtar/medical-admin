import React, { useState } from 'react';
import classes from './MedicineForm.module.css';

const MedicineForm = ({ onAddMedicine }) => {
  const [medicineData, setMedicineData] = useState({
    medicine: '',
    description: '',
    price: '',
    quantity: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMedicineData({
      ...medicineData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Parse the price and quantity as numbers
    const parsedPrice = parseFloat(medicineData.price);
    const parsedQuantity = parseInt(medicineData.quantity);

    // Check if any field is empty or if parsing fails
    if (!medicineData.medicine || !medicineData.description || isNaN(parsedPrice) || isNaN(parsedQuantity)) {
      alert('Please fill in all fields with valid values.');
      return;
    }

    // Pass the medicine data to the parent component for processing
    onAddMedicine({
      ...medicineData,
      price: parsedPrice,
      quantity: parsedQuantity,
    });

    // Clear the form after submission
    setMedicineData({
      medicine: '',
      description: '',
      price: '',
      quantity: '',
    });
  };

  return (
    <div className={classes['form-container']}>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>ADD Medicine</h2>
        </div>
        <div>
          <label className={classes['form-label']} htmlFor="medicine">
            Medicine
          </label> <br/>
          <input
            className={classes['form-input']}
            type="text"
            id="medicine"
            name="medicine"
            value={medicineData.medicine}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className={classes['form-label']} htmlFor="description">
            Description
          </label>
          <br/>
          <input
            className={classes['form-input']}
            type="text"
            id="description"
            name="description"
            value={medicineData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className={classes['form-label']} htmlFor="price">
            Price
          </label>
          <br/>
          <input
            className={classes['form-input']}
            type="number"
            id="price"
            name="price"
            value={medicineData.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className={classes['form-label']} htmlFor="quantity">
            Quantity
          </label>
          <br/>
          <input
            className={classes['form-input']}
            type="number"
            id="quantity"
            name="quantity"
            value={medicineData.quantity}
            onChange={handleInputChange}
          />
        </div>
        <button className={classes['form-button']} type="submit">
          Add Medicine
        </button>
      </form>
    </div>
  );
};

export default MedicineForm;
