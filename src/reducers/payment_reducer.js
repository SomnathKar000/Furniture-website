const payment_reducer = (state, action) => {
  return { ...state };
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default payment_reducer;
