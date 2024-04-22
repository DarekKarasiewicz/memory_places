import axios from 'axios';
import { useCookies } from 'react-cookie';

export function registerAppChanges(action) {
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const user_role = user.admin ? 'admin' : user.master ? 'master_user' : 'user';

  const json = {
    name: action,
    date: new Date().toJSON().slice(0, 10),
    user_id: user.user_id,
    role: user_role,
  };

  axios
    .post(`http://127.0.0.1:8000/admin_dashboard/changes/`, {
      user: user.user_id,
      json: json,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
