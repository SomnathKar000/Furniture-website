const payment_reducer = (state, action) => {
  if (action.type === "GET_ALL_LISTS") {
    const lists = action.payload;
    return { ...state, order_list: lists };
  }
  return { ...state };
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default payment_reducer;
