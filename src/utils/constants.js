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
let hostname = window.location.hostname;

// Split
let portValue = 5000;
// Split

if (window.location.port !== "3000") {
  portValue = 30002;
}
export let host =
  process.env.REACT_APP_PROJECT === "production"
    ? window.location.origin
    : `http://${hostname}:${portValue}`;
export let products_url = `${host}/api/v1/store-products`;
export let single_product_url = `${host}/api/v1/store-single-products?id=`;
