// components/Navbar.js
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { IoMdPerson } from "react-icons/io";
import { Cart } from './';
import { useStateContext } from '../context/StateContext';
import { useRouter } from 'next/router';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const [navbar, setNavbar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY >= 80) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };
    window.addEventListener("scroll", changeBackground);

    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  return (
    <div className={navbar || router.pathname === '/customs' ? "navbar-container active" : "navbar-container"}>
      <div className="logo">
        <Link href="/">JAGE</Link>
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
        <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
          <IoMdPerson />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
      </div>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
