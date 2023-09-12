// src/App.js
import React, { useState } from 'react';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import Cart from './components/Cart/Cart';
import MedicineManager from './components/Medicine/MedicineManager';
import CartProvider from './components/store/CartProvider';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      <div>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <main>
          <MedicineManager />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
