<div className="payment-page">
      <div className='address-header'>
        <h4 id='address-header-one'>MY CART ------- ADDRESS ------- CHECKOUT ------- PAYMENT</h4>
        <h4 id='address-header-two'>   </h4>
      </div>
      <div className='payment-address-summary'>
        <p>{userInfo.username}</p>
        <h6>ADDRESS DETAILS </h6>
        <Link href="/AddressPage" className='payment-change-address-link'>change</Link>
        <p>{`${adress.address}, ${adress.city}, ${adress.postalCode}, ${adress.country}, ${adress.phoneno}`}</p>
      </div>
      <div className="payment-cart-summary">
        <h6>BILLING DETAILS</h6>
        <p>Cart Total (Excl. of all taxes) <span>₹{calculateTotalPrice()}</span></p>
        <p>GST <span>₹{calculateTotalPrice()}</span></p>
        <p>Shipping Charges <span>₹{calculateTotalPrice()}</span></p>
        <p>Total Amount: <span>₹{calculateTotalPrice()}</span></p>
      </div>
      <button type="button" className="btn1" onClick={handlePayment}>
        Pay with Paytm
      </button>
    </div>