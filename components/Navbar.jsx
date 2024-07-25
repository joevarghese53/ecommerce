import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useStateContext } from '../context/StateContext';
import { Cart } from './';
import { IoMdPerson } from "react-icons/io";
import Link from 'next/link';
import { useSelector, useDispatch } from "react-redux";
import { logout } from '@/redux/features/auth/authSlice';
import { useLogoutMutation } from '../redux/api/usersApiSlice';

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [scrolling, setScrolling] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
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

  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      router.push('/');
    } catch (error) {
      console.error('Error logging out user:', error.response ? error.response.data : error.message);
    }
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
            className={router.pathname !== '/customs' ? 'active' : ''}
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
          <Link href="/track-order">Track Order</Link>
          <Link href="/contact-us">Contact Us</Link>
        </div>
      </div>
      <div className="red-line"></div>
      <div className="bottom-navbar">
        <div className="logo">
          <Link href="/"><img src="/logo.png" alt="Logo" /></Link>
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
          {userInfo ? (
            <div
              className="profile-icon"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <IoMdPerson />
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link href="/profile">Profile</Link>
                  {userInfo.isAdmin && (
                    <>
                      <Link href="/admin">Admin</Link>
                      <Link href="/orders">Orders</Link>
                    </>
                  )}
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/LoginPage">
              <div className="login-icon">
                LOGIN
              </div>
            </Link>
          )}
        </div>
      </div>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
