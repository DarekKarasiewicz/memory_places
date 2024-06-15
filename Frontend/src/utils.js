import axios from 'axios';

export function registerAppChanges(action, cookies, action_target = null) {
  const json = {
    name: action,
    role: cookies.admin ? 'admin' : cookies.master ? 'master_user' : 'user',
  };
  const appPath = process.env.REACT_APP_URL_PATH;

  if (action_target) {
    json.target = action_target;
  }

  axios
    .post(`${appPath}/memo_places/changes/`, {
      user: cookies.user_id,
      changes_json: json,
    })
    .then((response) => {})
    .catch((error) => {});
}
