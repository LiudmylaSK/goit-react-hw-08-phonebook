import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { refreshThunk } from 'redux/auth/authOperations';
import RestrictedRoute from './RestrictedRoute/RestrictedRoute';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import { selectAuthIsLoading } from 'redux/auth/authSelectors';

import { Loader } from './Loader/Loader';
import { Header } from './Layout/Header';


const HomePage = lazy(() => import('Pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('Pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('Pages/LogInPage/LogInPage'));
const ContactsPage = lazy(() => import('Pages/ContactsPage/ContactsPage'));

const appRoutes = [
  { path: '/', element: <HomePage /> },
  {
    path: '/register',
    element: (
      <RestrictedRoute>
        <RegisterPage />
      </RestrictedRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <RestrictedRoute>
        <LoginPage />
      </RestrictedRoute>
    ),
  },
  {
    path: '/contacts',
    element: (
      <PrivateRoute>
        <ContactsPage />
      </PrivateRoute>
    ),
  },
];

 const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectAuthIsLoading);

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return (
    <>
      <Header />
     <Suspense fallback={isRefreshing ? <Loader /> : null}>
  <Routes>
    {appRoutes.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ))}
  </Routes>
</Suspense>

    </>
  );
 };

 export default App;