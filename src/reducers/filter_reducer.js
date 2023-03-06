import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

import { formatPrice } from "../utils/helpers";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((e) => e.price);
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {
        ...state.filters,
        min_price: 0,
        max_price: maxPrice,
        price: maxPrice,
      },
    };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
    return { ...state, filtered_products: tempProducts };
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return {
      ...state,
      filters: { ...state.filters, [name]: value },
    };
  }
  if (action.type === FILTER_PRODUCTS) {
    const {
      all_products,
      filters: { text, category, company, colors, shipping, price },
    } = state;
    let temp_products = [...all_products];
    if (text) {
      temp_products = temp_products.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }
    if (!(category === "all")) {
      temp_products = temp_products.filter((product) => {
        return product.category === category;
      });
    }
    if (!(company === "all")) {
      temp_products = temp_products.filter((product) => {
        return product.company === company;
      });
    }
    if (!(colors === "all")) {
      temp_products = temp_products.filter((product) => {
        return product.colors.find((e) => e === colors);
      });
    }
    if (shipping) {
      temp_products = temp_products.filter((product) => {
        return product.shipping === shipping;
      });
    }
    temp_products = temp_products.filter((product) => {
      return product.price <= price;
    });
    return { ...state, filtered_products: temp_products };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        category: "all",
        company: "all",
        colors: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
