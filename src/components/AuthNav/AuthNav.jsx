import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

export const AuthMenu = () => {
  return (
    <div className={css.authMenu}>
      <NavLink
        className={({ isActive }) =>
          `${css.authLink} ${isActive ? css.active : ''}`
        }
        to="/register"
      >
        Sign Up
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${css.authLink} ${isActive ? css.active : ''}`
        }
        to="/login"
      >
        Log In
      </NavLink>
    </div>
  );
};

