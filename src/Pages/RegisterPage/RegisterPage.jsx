import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, registerThunk } from 'redux/auth/authOperations';
import { selectAuthError } from 'redux/auth/authSelectors';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { toast } from 'react-toastify';
import css from './RegisterPage.module.css';

const schema = yup
  .object({
    email: yup.string().required().email(),
    name: yup.string().required().min(4).max(15),
    password: yup.string().min(8).max(15).required(),
  })
  .required()

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);

  useEffect(() => {
    if (error) {
      toast.error('Oops! Something went wrong. Please try again.');
      dispatch(clearAuthError());
    }
  }, [error, dispatch]);

  const onSubmit = data => {
    dispatch(registerThunk(data));
    reset();
  };
  return (
    <form className={css.registerForm} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={css.title}>Please sign up and get started</h2>
      <label className={css.label}>
       Email:
        <input
          type= 'email'
          placeholder="Enter your email"
          className={css.registerInput}
          {...register('email')}
        />
        {<p className={css.error}>{errors.email?.message}</p>}
      </label>
      <label className={css.label}>
       Name:
        <input
          type= 'text'
          placeholder="Enter the name you prefer"
          className={css.registerInput}
          {...register('name')}
        />
        {<p className={css.error}>{errors.name?.message}</p>}
      </label>
      <label className={css.label}>
        Password:
        <input
          type= "password"
          placeholder="Create a strong password"
          className={css.registerInput}
          autoComplete="off"
          {...register('password')}
        />
        {<p className={css.error}>{errors.password?.message}</p>}
      </label>
      <button className={css.registerBtn} type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default RegisterPage;