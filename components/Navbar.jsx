import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import { AiOutlineShopping, AiOutlineShoppingCart } from 'react-icons/ai';
import { useStateContext } from '../context/StateContext';
import { Cart } from './';
import { IoMdPerson } from "react-icons/io";
import Link from 'next/link';



const Navbar = () => {
  const router = useRouter(); // Initialize the useRouter hook
  const [scrolling, setScrolling] = React.useState(false);
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="navbar-container">
      <div className={`top-navbar ${scrolling ? 'hidden' : ''}`}>
        <div className="top-left-links">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('/');
            }}
            className={router.pathname != '/customs' ? 'active' : ''}
          >
            ORIGINALS
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('/customs');
            }}
            className={router.pathname === '/customs' ? 'active' : ''}
          >
            CUSTOMS
          </a>
        </div>
        <div className="top-right-links">
          <a href="/track-order">Track Order</a>
          <a href="/contact-us">Contact Us</a>
        </div>
      </div>
      <div className="red-line"></div>
      <div className="bottom-navbar">
        <div className="logo">
          <a href="/"><img src="/logo.png" alt="Logo" /></a>
        </div>
        <div className="bottom-left-links">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('/');
            }}
            className={router.pathname === '/' ? 'active' : ''}
          >
            MEN
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('/women');
            }}
            className={router.pathname === '/women' ? 'active' : ''}
          >
            WOMEN
          </a>
        </div>

        <div className="bottom-right-links">
          <Link href="/CartPage">
            <div className="cart-icon">
              <AiOutlineShoppingCart />
              <span className="cart-item-qty">{totalQuantities}</span>
            </div>
          </Link>
          <Link href="/LoginPage">
            <div className="cart-icon">
              <IoMdPerson />
            </div>
          </Link>
          
        </div>

      </div>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;


