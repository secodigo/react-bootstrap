import axios from 'axios';
import i18n from '../i18n';
import { getToken } from '../service/authenticate';

const Api = axios.create({
  timeout: 10000,
  headers: {
    'content-type': 'application/json'
  }
});

Api.interceptors.request.use(
  async (config) => {
    const newConfig = { ...config };
    const token = getToken();
    const baseUrl = 'https://neosistemasmobile.ml:2053/neocorp-3.6.3.99';
    newConfig.headers.cookie = `JSESSIONID=${token}; Path=/neocorp-3.6.3.99; Secure; HttpOnly`;
    newConfig.headers.Authorization = `Bearer ${token}`;
    newConfig.baseURL = baseUrl;
    return newConfig;
  },
  (error) => Promise.reject(error)
);

const validateResponseErrorWithoutStatus = (err) => {
  switch (err.message) {
    case 'Network Error':
      throw new Error(i18n.t('NETWORK_ERROR'));
    case 'timeout of 10000ms exceeded':
      throw new Error(i18n.t('TIMEOUT'));
    default:
      throw err;
  }
};

const validateResponseErrorWithStatus = (err) => {
  switch (err.response.status) {
    case 401:
    case 403:
      throw new Error(i18n.t('UNAUTHORIZED'));
    case 404:
      throw new Error(err.response.status);
    case 521:
      throw new Error(i18n.t('SERVERDOWN'));
    default:
      if (err.response.data.messages) {
        let messages = '';
        const { length } = err.response.data.messages;
        for (let i = 0; i < length; i += 1) {
          const { field, message } = err.response.data.messages[i];
          messages += `${i18n.t(field)}: ${message}`;
          if (i < length - 1) {
            messages += '\n';
          }
        }
        throw new Error(messages);
      }
      throw new Error(err.response.data.message);
  }
};

Api.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (err) => {
    console.log(err);
    if (err.response && err.response.status) {
      validateResponseErrorWithStatus(err);
    }
    validateResponseErrorWithoutStatus(err);
  }
);

const save = async (endpoint, valueJson) =>
  Api.post(endpoint, valueJson)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });

const remove = async (endpoint, id) =>
  Api.delete(`${endpoint}/`, {
    params: { id }
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });

const fetchById = (endpoint, id) =>
  Api.get(`${endpoint}/id`, {
    params: { id }
  }).catch((err) => {
    throw err;
  });

const fetchByFilter = (endpoint, value) =>
  Api.get(`${endpoint}/`, {
    params: value
  }).catch((err) => {
    throw err;
  });

export { Api, save, remove, fetchById, fetchByFilter };
