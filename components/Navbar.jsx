// components/Navbar.js
import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';

import { Cart } from './';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <div className="logo">
        <Link href="/">DGen Apparels</Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link href="/">ORIGINALS</Link>
        </li>
        <li>
          <Link href="/customs">CUSTOMS</Link>
        </li>
      </ul>

      <div className="cart-container">
        <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
      </div>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
