import { useSelector, useDispatch } from 'react-redux';
import { authActions, selectAuth } from 'Redux/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAdmin, isMaster, accessToken } = useSelector(selectAuth);

  const setUserCredentials = (userData) => {
    dispatch(authActions.setUser(userData.user));
    dispatch(authActions.setIsAdmin(userData.isAdmin));
    dispatch(authActions.setIsMaster(userData.isMaster));
    dispatch(authActions.setAccessToken(userData.accessToken));
  };

  return { user, isAdmin, isMaster, accessToken, setUserCredentials };
};

export default useAuth;
