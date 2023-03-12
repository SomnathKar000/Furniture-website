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

export const extraImages = [
  {
    id: "att75EIGILzdo7bjR",
    width: 1000,
    height: 667,
    url: "https://img.freepik.com/free-photo/tools-wood-sawdust-workshop_23-2148679128.jpg?w=996&t=st=1675698912~exp=1675699512~hmac=1d46af16cdf1bff48e577c6d8f9634b1da2b9ae800bf334279bd29bb552e4533",
    filename: "extra-1.jpeg",
    size: 102108,
    type: "image/jpeg",
  },
  {
    id: "attw9vo0CpRmMFmUw",
    width: 1000,
    height: 714,
    url: "https://img.freepik.com/free-photo/handsome-carpenter-working-with-wood_1157-26134.jpg?w=996&t=st=1675699075~exp=1675699675~hmac=d7b642d3054d9112b43d7cc2d2327ce77193281a2678a08383d17f2e689081c6",
    filename: "extra-2.jpeg",
    size: 84418,
    type: "image/jpeg",
  },
  {
    id: "attDHf0QETelO9wlJ",
    width: 1000,
    height: 650,
    url: "https://img.freepik.com/free-photo/carpenter-peeling-wooden-pieces-make-figures_114579-12123.jpg?t=st=1675699497~exp=1675700097~hmac=a7c94a1c9d25ba917bc6e250e4dca0bb8462012774980614600ade73c682208f",
    filename: "extra-3.jpeg",
    size: 107838,
    type: "image/jpeg",
  },
  {
    id: "attwygwdZ5NwVUlSC",
    width: 1000,
    height: 667,
    url: "https://img.freepik.com/free-photo/carpenter-cutting-mdf-board-inside-workshop_23-2149451077.jpg?t=st=1675699302~exp=1675699902~hmac=8569fbb9f6261867d8e16bc4b6dc2d01980c75abcdcd16880596b7a8f0bae23a",
    filename: "extra-4.jpeg",
    size: 99481,
    type: "image/jpeg",
  },
];
