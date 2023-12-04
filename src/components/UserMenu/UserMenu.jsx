import React from 'react';
import css from './UserMenu.module.css';

export const UserMenu = ({ name, handleClick }) => {
  return (
       <div className={css.userMenu}>
        <p className={css.userName}>{name}</p>
        <button className={css.logOutBtn} onClick={handleClick}>Log Out</button>
      </div>
  );
};
 
