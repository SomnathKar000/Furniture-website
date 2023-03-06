import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const tempproduct = state.cart.find((e) => e.id === id + color);
    if (tempproduct) {
      const tempproducts = state.cart.map((cartitem) => {
        if (cartitem.id === id + color) {
          let newAmount = amount + cartitem.amount;
          if (newAmount > cartitem.max) {
            newAmount = cartitem.max;
          }
          return { ...cartitem, amount: newAmount };
        } else {
          return cartitem;
        }
      });
      return { ...state, cart: tempproducts };
    } else {
      const newProduct = {
        id: id + color,
        color,
        name: product.name,
        amount,
        Image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newProduct] };
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    let tempCart = [...state.cart];
    tempCart = tempCart.filter((item) => item.id !== action.payload);
    return { ...state, cart: tempCart };
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "increase") {
          let tempAmount = item.amount + 1;
          if (tempAmount > item.max) {
            tempAmount = item.max;
          }
          return { ...item, amount: tempAmount };
        }
        if (value === "decrease") {
          let tempAmount = item.amount - 1;
          if (tempAmount === 0) {
            tempAmount = 1;
          }
          return { ...item, amount: tempAmount };
        }
      } else {
        return item;
      }
    });

    return { ...state, cart: tempCart };
  }
  if (action.type === COUNT_CART_TOTALS) {
    // let maxitems = 0;
    // let maxPrice = 0;
    // state.cart.map((item) => {
    //   maxitems = maxitems + item.amount;
    //   maxPrice = item.price * item.amount + maxPrice;
    // });
    const { maxitems, maxPrice } = state.cart.reduce(
      (values, cartItem) => {
        values.maxitems += cartItem.amount;
        values.maxPrice += cartItem.amount * cartItem.price;
        return values;
      },
      { maxitems: 0, maxPrice: 0 }
    );
    return { ...state, total_items: maxitems, total_amount: maxPrice };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
