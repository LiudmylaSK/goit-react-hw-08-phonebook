import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, loginThunk } from 'redux/auth/authOperations';

import { selectAuthError } from 'redux/auth/authSelectors';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { toast } from 'react-toastify';
import css from './LogInPage.module.css';

const schema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().min(8).max(15).required(),
  })
  .required()

const LogInPage = () => {
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
    dispatch(loginThunk(data));
    reset();
  };
  return (
    <form className={css.logInForm} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={css.title}>Please Log In</h2>
      <label className={css.label}>
        Email:
        <input
          className={css.logInInput}
          type= "email"
          placeholder="Enter your email"
          {...register('email')}
        />
        {<p className={css.error}>{errors.email?.message}</p>}
      </label>
      <label className={css.label}>
        Password:
        <input
          className={css.logInInput}
          type= "password"
          placeholder="Enter your password"
          autoComplete="off"
          {...register('password')}
        />
        {<p className={css.error}>{errors.password?.message}</p>}
      </label>
      <button className={css.logInBtn} type="submit">
        Log In
      </button>
    </form>
  );
};

export default LogInPage;