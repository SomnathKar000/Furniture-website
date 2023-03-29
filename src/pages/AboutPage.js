import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import aboutImg from "../assets/hero-bcg.jpeg";

const AboutPage = () => {
  return (
    <main>
      <PageHero title="About" />
      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="Nice desk" />
        <article><h1>Test</h1>
          <div className="title">
            <h2>Our story</h2>
            <div className="underline"></div>
          </div>
          <p>
            Welcome to our furniture company! Our story began in the early 1990s
            when a group of passionate individuals came together to create
            something special. We started with a small workshop and a big dream:
            to provide high-quality furniture at affordable prices.
          </p>
          <p>
            Over the years, we've grown to become one of the most trusted names
            in the industry. Our focus has always been on quality craftsmanship,
            innovative design, and excellent customer service.
          </p>
          <p>
            As our company grew, we never lost sight of our roots. We continue
            to use traditional techniques to create furniture that's both
            functional and beautiful. And we're always exploring new materials
            and technologies to stay ahead of the curve.
          </p>
          <p>
            Today, we have a wide range of products, from classic designs to
            modern and contemporary styles. We work with a team of skilled
            artisans and designers to bring our customers the very best in
            furniture and home décor.
          </p>
          <p>
            At our core, we're still the same passionate group of individuals
            who started this journey all those years ago. We're dedicated to
            creating furniture that's both beautiful and functional, and we're
            committed to providing the best possible customer service.
          </p>
          <p>
            Thank you for choosing us, and we look forward to serving you for
            many years to come!
          </p>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
