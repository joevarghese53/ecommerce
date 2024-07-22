import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import GooglePayButton from
  '@google-pay/button-react';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

const Cart = () => {
  const { totalPrice, totalQuantities, cartItems, toggleCartItemQuanitity, onRemove } = useStateContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [address, setAddress] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  }

  const nextStep = () => {
    setCurrentStep(prevStep => prevStep + 1);
  }

  const prevStep = () => {
    setCurrentStep(prevStep => prevStep - 1);
  }


  const StepOne = () => (
    <div className="cart-page">
      {cartItems.length < 1 && (
        <div className="empty-cart">
          <AiOutlineShopping size={150} />
          <h3>Your shopping bag is empty</h3>
          <Link href="/">
            <button type="button" className="btn">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
      {cartItems.length >= 1 && (
        <div>
          <div className="cart-content">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <img src={urlFor(item?.image[0])} className="cart-product-image" />
                <div className="item-desc">
                  <h5>{item.name}</h5>
                  <p id='cart-item-category'>{item.category}</p>
                  <h4>₹{item.price}</h4>
                  <h3>MRP inclusive of all taxes</h3>
                  <div className="size-select">
                    <label htmlFor={`size-select-${item._id}`}>Size: </label>
                    <select id={`size-select-${item._id}`} value={item.size} onChange={(e) => updateCartItemSize(item._id, e.target.value)}>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>
                  <div className="cart-quantity-desc">
                    <span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec')}>
                      <AiOutlineMinus />
                    </span>
                    <span className="num">{item.quantity}</span>
                    <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc')}>
                      <AiOutlinePlus />
                    </span>
                  </div>
                  <button type="button" className="remove-item" onClick={() => onRemove(item)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h6>BILLING DETAILS</h6>
            <h8>Cart Total (Excl. of all taxes)       <span>₹{totalPrice}</span></h8>
            <h8>GST                                   <span>₹{totalPrice}</span></h8>
            <h8>Shipping Charges                      <span>₹{totalPrice}</span></h8>
            <h8>Total Amount:                         <span>₹{totalPrice}</span></h8>
            <button type="button" className="btn" onClick={nextStep}>
              PLACE ORDER
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const updateCartItemSize = (id, size) => {
    // Logic to update the size of the cart item
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === id) {
        return { ...item, size };
      }
      return item;
    });
    // Update the cart items in the context or state
    // You can create a function in your StateContext to update the cart items
    // and call it here.
  };

  const StepTwo = () => (
    <div className="address-page">
      <h1>Address Details</h1>

      <form>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={address.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="addressLine1">Address Line 1</label>
          <input
            type="text"
            id="addressLine1"
            name="addressLine1"
            value={address.addressLine1}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="addressLine2">Address Line 2</label>
          <input
            type="text"
            id="addressLine2"
            name="addressLine2"
            value={address.addressLine2}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={address.state}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={address.postalCode}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={address.country}
            onChange={handleInputChange}
            required
          />
        </div>
      </form>
      <button type="button" className="form-btn1" onClick={prevStep}>
        Back to Cart
      </button>
      <button type="button" className="form-btn2" onClick={nextStep}>
        Submit Address
      </button>
      <div className="cart-summary">
        <h6>BILLING DETAILS</h6>
        <h8>Cart Total (Excl. of all taxes)       <span>₹{totalPrice}</span></h8>
        <h8>GST                                   <span>₹{totalPrice}</span></h8>
        <h8>Shipping Charges                      <span>₹{totalPrice}</span></h8>
        <h8>Total Amount:                         <span>₹{totalPrice}</span></h8>
        <button type="button" className="btn" onClick={nextStep}>
          PLACE ORDER
        </button>
      </div>
    </div>
  );

  const StepThree = () => (
    <div className="payment-page">
      <div className='payment-address-summary'>
        <h6>ADDRESS DETAILS</h6>
        <h8>{address.fullName}</h8>
        <h8>{`${address.addressLine1}, ${address.addressLine2}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`}</h8>
      </div>
      <div className="payment-cart-summary">
        <h6>BILLING DETAILS</h6>
        <h8>Cart Total (Excl. of all taxes)       <span>₹{totalPrice}</span></h8>
        <h8>GST                                   <span>₹{totalPrice}</span></h8>
        <h8>Shipping Charges                      <span>₹{totalPrice}</span></h8>
        <h8>Total Amount:                         <span>₹{totalPrice}</span></h8>
      </div>
      <button type="button" className="btn1" onClick={handleCheckout}>
        Pay with Stripe
      </button>
      <div className='gpay-button'>
      <GooglePayButton
      environment='TEST'
      paymentRequest={{
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: ['MASTERCARD', 'VISA'],
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              parameters: {
                gateway: 'example',
                gatewayMerchantId: 'exampleGatewayMerchantId',
              },
            },
          },
        ],
        merchantInfo: {
          merchantId: '12345678901234567890',
          merchantName: 'Demo Merchant',
        },
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPriceLabel: 'Total',
          totalPrice: `${totalPrice}`,
          currencyCode: 'INR',
          countryCode: 'IN',
        },
        shippingAddressRequired: true,
        callbackIntents: ['PAYMENT_AUTHORIZATION'],
      }}
      onLoadPaymentData={paymentRequest => {
        console.log('load payment data', paymentRequest);
      }}
      onPaymentAuthorized={paymentData => {
        console.log('payment authorized', paymentData);
        return { transactionState: 'SUCCESS' };
      }}
      existingPaymentMethodRequired='false'
      buttonColor='black'
      buttonType='buy'
      />

    </div>
    </div>
  );
  

  return (
    <div className="checkout-container">
      <div className="steps-nav">
        <div className={`step ${currentStep === 1 ? 'active' : ''}`}>
          MY BAG
        </div>
        <div className='dashed-lines'>
          ---------------------------------------------------
        </div>
        <div className={`step ${currentStep === 2 ? 'active' : ''}`} >
          ADDRESS
        </div>
        <div className='dashed-lines'>
          ---------------------------------------------------
        </div>
        <div className={`step ${currentStep === 3 ? 'active' : ''}`} >
          PAYMENT
        </div>
      </div>
      {currentStep === 1 && <StepOne />}
      {currentStep === 2 && <StepTwo />}
      {currentStep === 3 && <StepThree />}
    </div>
  );
}

export default Cart;
