
import { useDispatch } from 'react-redux';
import { deleteContactThunk } from 'redux/contacts/contactsOperations';
import css from './ContactsListItem.module.css';

export const ContactItem = ({ id, name, number}) => {
  const dispatch = useDispatch();
  return (
    <li className={css.listItem}>
      <span className={css.name}>{name}:</span>
      <span className={css.number}>{number}</span>
      <button
        className={css.buttonDeleteItem}
        type="button"
        onClick={() =>
          dispatch(deleteContactThunk(id))
        }
      >
        Delete
      </button>
    </li>
  );
};