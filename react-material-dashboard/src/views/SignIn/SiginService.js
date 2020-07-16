import { Api } from '../../api/ApiRest';
import { SaveToken } from '../../service/authenticate';
import i18n from '../../i18n';

const validateResponse = async (response) => {
  if (response.status === 200) {
    SaveToken(response.data);
  } else if (response.status === 401) {
    throw new Error(i18n.t('LOGIN_MSG_USER_PASS_INVALID'));
  }
};

const login = async (username, password) => {
  return Api.post('/api/v1/authentication', { username, password })
    .then((response) => validateResponse(response))
    .catch((err) => {
      if (err.response) {
        return validateResponse(err.response);
      }
      throw err;
    });
};

export default login;
