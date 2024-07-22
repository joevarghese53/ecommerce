import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';
import SizeSelector from '../../components/SizeSelector';
import ProductInfo from '../../components/ProductInfo';
import PinCodeCheck from '@/components/PinCodeCheck';
import Link from 'next/link';

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price, category, offers, returnpolicy } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {

    setShowCart(true);
  }

  return (
    <div>
      <div className="customs-header">
        {/* Header content goes here */}
      </div>
      <div className="product-detail-container">
        <div className='image-container'>
          <div className='big-image-container'>
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <p id='category'>{category}</p>
          <div className="reviews">
            <div className='rating'>
              <AiFillStar />
            </div>
            <p>
              5.0
            </p>
          </div>
          <p className="price">₹{price}</p>
          <p className="tax">inclusive of all taxes</p>
          <div className="size-chart">
            <SizeSelector />
          </div>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <Link href="/CartPage">
            <div className="buy-now">Go to cart</div>
            </Link>
          </div>
          <PinCodeCheck />
          <div className="product-details">
          <ProductInfo title="Offers" content={offers} />
          <ProductInfo title="Product Description" content={details} />
          <ProductInfo title="15 Days Returns & Exchange" content={returnpolicy} />
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products
    .filter((product) => product.slug && product.slug.current) // Filter out null or undefined slugs
    .map((product) => ({
      params: {
        slug: product.slug.current,
      },
    }));

  return {
    paths,
    fallback: 'blocking',
  };
};


export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]'

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product }
  }
}

export default ProductDetails