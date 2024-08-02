import React from 'react';
import Link from 'next/link';
import {AiFillStar} from 'react-icons/ai';
import {useGetCategoryByIdQuery} from '../redux/api/categoryApiSlice';

const Product = ({ product }) => {
  const formattedImagePath = product.image.replace('/public\\', '').replace(/\\/g, '/');
  const {
    data: category,
    isLoading,
    refetch,
    error,
  } = useGetCategoryByIdQuery(product.category);
  

  return (
    <div>
        <Link href={`/product/${product._id}`}>
          <div className="product-card">
            <img
              src={formattedImagePath}
              width={250}
              height={250}
              className="product-image"
            />
            <div className="product-card-reviews">
              <div >
                <AiFillStar />
              </div>
              <p>
                {product.rating}
              </p>
            </div>
            <p className="product-name">{product.name}</p>
            {isLoading ? (
            <p className="product-cat">Loading...</p>
          ) : error ? (
            <p className="product-cat">Error loading category</p>
          ) : (
            <p className="product-cat">{category?.name}</p>
          )}
            <p className="product-price">₹{product.price}</p>
          </div>
        </Link>
    </div>
  )
}

export default Product;
