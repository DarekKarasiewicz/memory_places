import axios from 'axios';

export function registerAppChanges(action, cookies, action_target = null) {
  const json = {
    name: action,
    role: cookies.admin ? 'admin' : cookies.master ? 'master_user' : 'user',
  };

  if (action_target) {
    json.target = action_target;
  }

  axios
    .post(`http://127.0.0.1:8000/memo_places/changes/`, {
      user: cookies.user_id,
      changes_json: json,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
