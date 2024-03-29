const payment_reducer = (state, action) => {
  if (action.type === "PAYMENET_LOADING_DONE") {
    return { ...state, payment_loading: false };
  }
  if (action.type === "PAYMENT_LOADING_START") {
    return { ...state, payment_loading: true };
  }
  if (action.type === "GET_ALL_ORDERLISTS_START") {
    return { ...state, get_all_order_loading: true };
  }
  if (action.type === "All_ORDER_LOADING_ERROR") {
    return { ...state, get_all_order_error: true };
  }
  if (action.type === "SINGLE_ORDER_LOADING_ERROR") {
    return { ...state, single_order_error: true };
  }
  if (action.type === "SINGLE_ORDER_LOADING_BEGAIN") {
    return { ...state, single_order_loading: true };
  }
  const updateImage = (Odata, products) => {
    Odata.items.forEach((item) => {
      const nId = item.productId.split("#")[0];
      const color = "#" + item.productId.split("#")[1];
      const product = products.find((p) => p.id === nId);
      if (product) {
        item.image = product.image;
        item.color = color;
        item.name = product.name;
      }
    });
    return Odata;
  };
  if (action.type === "GET_ALL_LISTS") {
    const { data, products } = action.payload;

    data.map((Ditem) => {
      return updateImage(Ditem, products);
    });
    return {
      ...state,
      order_list: data,
      get_all_order_error: false,
      get_all_order_loading: false,
    };
  }
  if (action.type === "GET_SINGLE_ORDER") {
    const data = { ...action.payload };
    return {
      ...state,
      single_order: data,
      single_order_loading: false,
      single_order_error: false,
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default payment_reducer;
