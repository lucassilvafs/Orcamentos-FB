import React from 'react';
import './styles.css';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const CART_ITEMS = 'cart-items';

const CardItem = ({ name, price, quantMin, handleAddInfo }) => {
    return (
      <div className="productDiv">
        <button className='custom-btn btn-14' onClick={() => handleAddInfo(name)}> { name }
          {/* <img className="product-img" src="gs://databasefb-6948c.appspot.com/capa-blog-coding-iniciante.jpg" />  */}
          {/* <div className="product-info"> */}
            {/* <p className="product-title">{ name }</p> */}
            {/* <p className="product-price">R$ { price.toFixed(2) }</p>
            <p className="product-quant">Quant. mínima: { quantMin }</p> */}
          {/* </div> */}
        </button>
      </div>
    );
  }

  // custom-btn btn-14
  // className='button-div'
export default CardItem;