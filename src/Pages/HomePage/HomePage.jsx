import React from 'react';

import css from './HomePage.module.css'

const HomePage = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Welcome to the Phonebook!</h1>
     
      <p className={css.text}>
         Hello!<br/>Phonebook is your reliable assistant in storing contacts.<br/>Start adding and managing them right now.
      </p>
    </div>
  );
};

export default HomePage;