import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {

  if (action.type === "ADD") {

    const updatedTotalAmount =
      state.totalAmount + action.item.price ;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + 1

      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
      
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };

  }
  if (action.type === 'REMOVE') {

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingtem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingtem.price;
    let updatedItems;
    if (existingtem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id)
    } else {
      const updatedItem = { ...existingtem, amount: existingtem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };

  }


  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchAction({ type: "ADD", item: item });
  };

  const removeItemToCartHandler = (id) => {
    dispatchAction({ type: "REMOVE", id: id });
  };

  const contextValue = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
