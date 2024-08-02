import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useGetOrderDetailsQuery } from '../redux/api/orderApiSlice';
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";


const PaymentPage = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useFetchCategoriesQuery();



  // Conditional query call
  const {
    data: orderDetails,
    isLoading,
    error
  } = useGetOrderDetailsQuery(orderId || '', {
    skip: !orderId, // Skip the query if orderId is not available
  });

  const formatImagePath = (imagePath) => {
    return imagePath.replace('/public\\', '').replace(/\\/g, '/');
  };

  useEffect(() => {
    if (orderId) {
      console.log('Order ID:', orderId);
      console.log('Order Details:', orderDetails);
    }
  }, [orderId, orderDetails]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    toast.error('Failed to load order details');
    return <div>Error loading order details</div>;
  }

  const categoryMap = categoriesData ? categoriesData.reduce((acc, category) => {
    acc[category._id] = category.name;
    return acc;
  }, {}) : {};

  return (
    <div className='payment-page-main-container'>
      <div className='address-header'>
        <h4 id='address-header-one'>MY CART ------- ADDRESS ------- CHECKOUT  ------- PAYMENT</h4>
        <h4 id='address-header-two'>  </h4>
      </div>
      <div className='payment-page-bottom-container'>
        <div className='payment-page-left-container'>
          <div className="payment-cart-content">
            {orderDetails && orderDetails.orderItems ? (
              orderDetails.orderItems.map((item) => (
                <div className="payment-cart-item" key={item._id}>
                  <img src={formatImagePath(item.image)} className="payment-cart-product-image" />
                  <div className="payment-item-desc">
                    <h5>{item.name}</h5>
                    <p id='payment-cart-item-category'>{categoryMap[item.category]}</p>
                    <p id='payment-cart-item-quantity'>Quantity: {item.qty}</p>
                    <h4 >₹{item.price}</h4>
                    <h3 >MRP inclusive of all taxes</h3>
                  </div>
                </div>
              ))
            ) : (
              <div>No items in the order</div>
            )}
          </div>
        </div>
        <div className='payment-page-right-container'>
          <div className='payment-page-summary'>
          <h1 id='shipping-summary-heading'>SHIPPING</h1>
          <div className='shipping-summary'>
            <div className='shipping-summary-left'>
              <h2>Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</h2>
              <h2>Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</h2>
              <h2>Address&nbsp;&nbsp;&nbsp;:</h2>
            </div>
            <div className='shipping-summary-right'>
              <h3>{orderDetails.user.username}</h3>
              <h3>{orderDetails.user.email}</h3>
              <p id='address'>{orderDetails.shippingAddress.address}.<br></br> {orderDetails.shippingAddress.city} - {orderDetails.shippingAddress.postalCode},  {orderDetails.shippingAddress.country}.<br></br> CONTACT : {orderDetails.shippingAddress.phoneno}</p>
            </div>
          </div>
          <h1 id='billing-summary-heading'>BILLING</h1>
          <div className='billing-summary'>
            <h2>Cart Total &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp; <span>₹{orderDetails.itemsPrice}</span></h2>
            <p>(Excl. of all taxes)</p>
            <h2>GST&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;<span>₹{orderDetails.taxPrice}</span></h2>
            <h2>Shipping Charges&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;<span>₹{orderDetails.shippingPrice}</span></h2>
            <h2>Total Amount&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;<span>₹{orderDetails.totalPrice}</span></h2>
          </div>
          </div>
          <button type="button" className="pay-now-button"  >
            PAY WITH PHONEPE
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default PaymentPage;
