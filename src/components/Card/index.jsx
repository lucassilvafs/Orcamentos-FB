import React from 'react';
import './styles.css';

const CART_ITEMS = 'cart-items';

const Card = ({ name, price, quantMin, handleAddInfo }) => {
    return (
      <div className="productDiv">
        <button className='button-div' onClick={() => handleAddInfo(name)}>
          {/* <img className="product-img" src="gs://databasefb-6948c.appspot.com/capa-blog-coding-iniciante.jpg" />  */}
          <div className="product-info">
            <p className="product-title">{ name }</p>
            <p className="product-price">R$ { price.toFixed(2) }</p>
            <p className="product-quant">Quant. mínima: { quantMin }</p>
          </div>
        </button>
      </div>
    );
  }


export default Card;