import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';
import { client, urlFor } from '../../lib/client';

const DynamicProductPage = () => {
  const router = useRouter();
  const { slug1, cname, cdetails, cprice, cimage } = router.query;
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  if (!slug1 || !cname || !cdetails || !cprice || !cimage) {
    // Handle the case where product details are not available
    return <div>Loading...</div>;
  }


return (
  <div>
    <div className="product-detail-container">
      <div>
        <div className="custom-image-container">
        <img src={cimage} alt={cname} />
      </div>
        {/* <div className="small-images-container">
          {image?.map((item, i) => (
            <img 
              key={i}
              src={urlFor(item)}
              className={i === index ? 'small-image selected-image' : 'small-image'}
              onMouseEnter={() => setIndex(i)}
            />
          ))}
        </div> */}
      </div>

      <div className="product-detail-desc">
        <h1>{cname}</h1>
        <div className="reviews">
          <div>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </div>
          <p>
            (20)
          </p>
        </div>
        <h4>Details: </h4>
        <p>{cdetails}</p>
        <p className="price">₹{cprice}</p>
        <div className="quantity">
          <h3>Quantity:</h3>
          <p className="quantity-desc">
            <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
            <span className="num">{qty}</span>
            <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
          </p>
        </div>
        <div className="buttons">
          <button type="button" className="add-to-cart" >Add to Cart</button>
          <button type="button" className="buy-now">Buy Now</button>
        </div>
      </div>
    </div>

    {/* <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
    </div> */}
  </div>
)
};


export default DynamicProductPage;