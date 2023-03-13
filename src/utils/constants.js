import React from "react";
import { GiCompass, GiDiamondHard, GiStabbedNote } from "react-icons/gi";
export const links = [
  {
    id: 1,
    text: "home",
    url: "/",
  },
  {
    id: 2,
    text: "about",
    url: "/about",
  },
  {
    id: 3,
    text: "products",
    url: "/products",
  },
];

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: "mission",
    text: "Our mission is to provide high-quality, stylish and affordable furniture solutions to enhance the comfort and living standards of our customers.",
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: "vision",
    text: "To be the leading provider of high-quality, stylish, and sustainable furniture solutions, delivering exceptional value and customer experience",
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: "history",
    text: "Established in 1985, the company started as a small family-owned business. Over the years, it has expanded to become a leading supplier of high-quality furniture, known for its innovative designs and exceptional customer service.",
  },
];

export const products_url = "http://localhost:5000/api/v1/store-products";
// export const products_url = "http://3.84.135.175:5000/api/v1/store-products";
export const single_product_url = `http://localhost:5000/api/v1/store-single-products?id=`;
// export const single_product_url = `http://3.84.135.175:5000/api/v1/store-single-products?id=`;

// export const host = `http://3.84.135.175:5000`;
export const host = `http://localhost:5000`;
