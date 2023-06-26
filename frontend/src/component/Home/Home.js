import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import MetaData from "../Layout/MetaData"
import Product from "./ProductCard.js";
import {getProduct} from "../../actions/productAction"
import {useSelector , useDispatch} from "react-redux";
import "./Home.css";
import Loader from "../Layout/Loader/Loader"

const Home = () => {
  const dispatch =  useDispatch();
  const {loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if(error) {
      return alert.error(error);
    }
    dispatch(getProduct());
  },[dispatch]);

  return (
    <Fragment>
    {
      loading ? (
        <loader />
      ) : (
        <Fragment>
        <MetaData title="ECOMMERCE" />
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
             {products && products.map(product => (
               <Product product={product} />
             ))}
           </div>
       </Fragment>
      )
    }
  </Fragment>
  )
}

export default Home
