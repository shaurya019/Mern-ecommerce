import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import Product from "./ProductCard.js";
import "./Home.css";

const product = {
    name:"Blue Tshirt",
    images: [{url:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Ftshirt%2F&psig=AOvVaw00XFn8mQE35_JEkBq_cWQG&ust=1687683303709000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPCO76_E2_8CFQAAAAAdAAAAABAE"}],
    price:"Rs3000",
    _id:"singh"
};
const Home = () => {
  return (
    <Fragment>
       <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
          </div>
      </Fragment>
  )
}

export default Home
