
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from 'redux/contacts/contactsSelectors';
import { ContactItem } from 'components/ContactsListItem/ContactsListItem';
import css from './ContactsList.module.css';

export const Contacts = () => {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <>
      {Array.isArray(contacts) && contacts.length > 0 ? (
        <ul className={css.contactsList}>
          {contacts.map(({ id, name, number }) => (
            <ContactItem key={id} id={id} name={name} number={number} />
          ))}
        </ul>
      ) : (
        <p className={css.contactText}>
           There are no contacts in your Phonebook yet. Create the first one.
        </p>
      )}
    </>
  );
};