

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Contacts } from 'components/ContactsList/ContactsList';
import { ContactForm } from 'components/ContactsForm/ContactForm';
import { SearchFilter } from 'components/SearchFilter/SearchFilter';
import { selectIsLoading } from 'redux/contacts/contactsSelectors';
import { fetchAllContactsThunk } from 'redux/contacts/contactsOperations';
import { Loader } from 'components/Loader/Loader';
import css from './ContactsPage.module.css'



const ContactsPage = () => {
  const { isLoading } = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllContactsThunk());
  }, [dispatch]);

  return (
    <div className={css.contactsPage}>
      <ContactForm />
      <div className={css.contactsWrapper}>
        <SearchFilter />
        {isLoading && <Loader />}
        <Contacts />
      </div>
    </div>
  );
};

export default ContactsPage;