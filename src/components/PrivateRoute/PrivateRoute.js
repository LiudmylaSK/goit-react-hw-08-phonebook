import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuthIsSignedIn } from 'redux/auth/authSelectors';

const PrivateRoute = ({ children, redirectTo = '/' }) => {
  const isSignedIn = useSelector(selectAuthIsSignedIn);

  if (!children) {
    console.error('PrivateRoute component requires children.');
    return null;
  }

  return isSignedIn ? children : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
