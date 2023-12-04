
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addContactThunk } from 'redux/contacts/contactsOperations';
import { selectAllContacts } from 'redux/contacts/contactsSelectors';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { MdContactPhone } from 'react-icons/md';
import css from './ContactForm.module.css';

const schema = yup
  .object({
    name: yup.string().required().min(4),
    number: yup.string().min(5).required(),
  })
  .required();

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const contactList = useSelector(selectAllContacts);
  const onSubmit = contact => {
    if (
      contactList.some(
        item =>
          item.name.toLowerCase().trim() ===
            contact.name.toLowerCase().trim() ||
          item.number.trim() === contact.number.trim()
      )
    ) {
      toast.warning('This name is already in your contacts list.');
      return;
    }
    dispatch(addContactThunk(contact));
    reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={css.title}><MdContactPhone className={css.iconContact}/>  Add new contact</h2>
      <label className={css.label}>
        Name:
        <input
          placeholder="Enter contact name"
          className={css.contactInput}
          {...register('name', { type: 'text' })}
        />
        {<p className={css.error}>{errors.name?.message}</p>}
      </label>
      <label className={css.label}>
        Phone:
        <input
          className={css.contactInput}
          placeholder="Enter phone number"
          {...register('number', { type: 'tel' })}
        />
        {<p className={css.error}>{errors.number?.message}</p>}
      </label>
      <button className={css.buttonAddContact } type="submit">
        Add contact
      </button>
    </form>
  );
};