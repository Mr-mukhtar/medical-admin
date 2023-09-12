// SearchMedicine.js
import React, { useState } from 'react';
import classes from './SearchMedicine.module.css'; // Import the CSS module

const SearchMedicine = ({ medicineItems, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Perform the search based on searchTerm
    const results = medicineItems.filter((medicine) =>
      medicine.medicine.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className={classes.SearchMedicine}> {/* Apply the CSS class to the container */}
      <h2>Search Medicine</h2>
      <div>
        <input
          type="text"
          placeholder="Search medicine..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {searchResults.map((medicine) => (
          <li key={medicine.id}>
            <div>{medicine.medicine}</div>
            <div>{medicine.description}</div>
            <div>${medicine.price}</div>
            <div>Quantity: {medicine.quantity}</div>
            <button
              onClick={() => onAddToCart(medicine.id)}
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

export default SearchMedicine;
