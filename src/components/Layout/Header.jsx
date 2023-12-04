
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthIsSignedIn, selectAuthUserData } from 'redux/auth/authSelectors';
import { logoutThunk } from 'redux/auth/authOperations';

import { UserMenu } from 'components/UserMenu/UserMenu';
import { AuthMenu } from 'components/AuthNav/AuthNav';
import { Navigation } from 'components/Navigation/Navigation';
import css from './Header.module.css';

export const Header = () => {
  const isSignedIn = useSelector(selectAuthIsSignedIn);
  const userName = useSelector(selectAuthUserData).name;

  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(logoutThunk());
  };

  return (  
      <header className={css.header}>
        <Navigation/>
          {isSignedIn ? (
            <UserMenu name={userName} handleClick={onLogOut} />
          ) : (<AuthMenu/>)}        
      </header>
  
  );
};