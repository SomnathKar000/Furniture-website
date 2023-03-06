import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { extraImages } from "../utils/constants";

const ProductImages = ({ images = [{ url: "", filename: "" }] }) => {
  const newImages = [images[0], ...extraImages];
  const [Main, setMain] = useState(newImages[0]);

  return (
    <Wrapper>
      <img src={Main.url} alt={Main.filename} className="main" />
      <div className="gallery">
        {newImages.map((image, index) => {
          return (
            <img
              src={image.url}
              key={index}
              alt={image.filename}
              onClick={() => {
                setMain(newImages[index]);
              }}
              className={`${image.url === Main.url ? "active" : null}`}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;
