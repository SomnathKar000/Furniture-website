const payment_reducer = (state, action) => {
  if (action.type === "GET_ALL_LISTS") {
    const { data, products } = action.payload;
    return { ...state, order_list: data };
  }
  if (action.type === "GET_SINGLE_ORDER") {
    const id = action.payload.id;
    const product = state.order_list.find((item) => item._id === id);
    return { ...state, single_order: product };
  }
  return { ...state };

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default payment_reducer;
