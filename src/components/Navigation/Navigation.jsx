import React from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthIsSignedIn } from 'redux/auth/authSelectors';


import css from './Navigation.module.css'


export const Navigation = () => {
  const isSignedIn = useSelector(selectAuthIsSignedIn);

  const navLinks = [
    { to: '/', label: 'Simple Phonebook', className: css.logo },
    { to: '/contacts', label: 'Contacts', isVisible: isSignedIn, className: css.contacts },
  ];

  return (
    <nav>
      {navLinks.map((link, index) => (
        link.isVisible !== false && (
          <NavLink
            key={index}
         className={link.className}
            to={link.to}
          >
            {link.label}
          </NavLink>
        )
      ))}
    </nav>
  );
};

