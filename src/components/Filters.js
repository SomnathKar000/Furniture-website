import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const Filters = () => {
  const {
    clearFilters,
    updateFilters,
    filters: {
      text,
      category,
      company,
      colors,
      min_price,
      max_price,
      shipping,
      price,
    },
    all_products,
  } = useFilterContext();
  const Categories = getUniqueValues(all_products, "category");
  const Colors = getUniqueValues(all_products, "colors");
  const Companies = getUniqueValues(all_products, "company");

  return (
    <Wrapper>
      <div className="content">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="form-controls">
            <input
              typr="text"
              name="text"
              className="search-input"
              placeholder="search"
              value={text}
              onChange={updateFilters}
            />
          </div>
          <div className="form-control">
            <h5>Catagory</h5>
            <div>
              {Categories &&
                Categories.map((element, index) => (
                  <button
                    key={index}
                    onClick={updateFilters}
                    name="category"
                    type="button"
                    className={`${
                      category === element.toLowerCase() ? "active" : ""
                    }`}
                  >
                    {element}
                  </button>
                ))}
            </div>
          </div>
          <div className="form-controls">
            <h5>Company</h5>
            <select
              name="company"
              onChange={updateFilters}
              className="company"
              value={company}
            >
              {Companies.map((element, index) => (
                <option key={index} value={element}>
                  {element}
                </option>
              ))}
            </select>
          </div>
          <div className="form-controls">
            <h5>colors</h5>
            <div className="colors">
              {Colors.map((element, index) => {
                if (element === "all") {
                  return (
                    <button
                      key={index}
                      className={`all-btn ${
                        element === colors ? "active" : ""
                      }`}
                      data-name="all"
                      onClick={updateFilters}
                      name="colors"
                    >
                      all
                    </button>
                  );
                }
                return (
                  <button
                    data-name={element}
                    onClick={updateFilters}
                    name="colors"
                    style={{ background: element }}
                    key={index}
                    className={`color-btn ${
                      element === colors ? "active" : ""
                    }`}
                  >
                    {colors === element && <FaCheck />}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="from-controls">
            <h5>price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              onChange={updateFilters}
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>
          <div className="from-control shipping">
            <label htmlFor="shipping">free shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              onChange={updateFilters}
              checked={shipping}
            />
          </div>
        </form>
        <button type="button" className="clear-btns" onClick={clearFilters}>
          clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-controls {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btns {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
