import axios from 'axios';
import useAuth from './useAuth';
import { useCookies } from 'react-cookie';

const useRefreshToken = () => {
  const { setUserCredentials } = useAuth();
  const [cookies] = useCookies(['user']);
  const user = cookies.user;

  const refreshToken = async () => {
    var token;
    axios
      .post('http://localhost:8000/memo_places/token/refresh/', user.refreshToken)
      .then((response) => {});
    return token;
  };
  return refreshToken;
};

export default useRefreshToken;
