import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classes from './SearchMedicine.module.css';

const SearchMedicine = ({ medicineItems, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const results = medicineItems.filter((medicine) =>
        medicine.medicine.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, medicineItems]);

  return (
    <div className={classes.SearchMedicine}>
      <h2>Search Medicine</h2>
      <div>
        <input
          type="text"
          placeholder="Search medicine..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul>
        {searchResults.map((medicine) => (
          <li key={medicine.id}>
            <div>{medicine.medicine}</div>
            <div>{medicine.description}</div>
            <div>${medicine.price.toFixed(2)}</div>
            <div>Quantity: {medicine.quantity}</div>
            <button
              onClick={() => onAddToCart(medicine)}
              disabled={medicine.quantity === 0}
              className={medicine.quantity === 0 ? classes.DisabledButton : ''}
            >
              {medicine.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

SearchMedicine.propTypes = {
  medicineItems: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

SearchMedicine.defaultProps = {
  medicineItems: [],
};

export default SearchMedicine;
