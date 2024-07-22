import React from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { urlFor } from '../lib/client';

const Product = ({ product: { image, name, slug, price, category } }) => {
  return (
    <div>
      {slug && ( // Check if slug is defined
        <Link href={`/product/${slug.current}`}>
          <div className="product-card">
            <img
              src={urlFor(image && image[0])}
              width={250}
              height={250}
              className="product-image"
            />
            <div className="product-card-reviews">
              <div >
                <AiFillStar />
              </div>
              <p>
                5.0
              </p>
            </div>
            <p className="product-name">{name}</p>
            <p className="product-cat">{category}</p>
            <p className="product-price">₹{price}</p>
          </div>
        </Link>
      )}
    </div>
  )
}

export default Product;
