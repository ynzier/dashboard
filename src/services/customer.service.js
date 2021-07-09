import http from '../http-common';
const user = JSON.parse(localStorage.getItem('user'));

const create = data => {
  return http.post('/add', data, {
    headers: {
      'Content-type': 'application/json',
      'x-access-token': user.accessToken,
    },
  });
};

const getAll = () => {
  return http.get('/getData', {
    headers: {
      'Content-type': 'application/json',
      'x-access-token': user.accessToken,
    },
  });
};
const get = id => {
  return http.get(`/find/${id}`, {
    headers: {
      'Content-type': 'application/json',
      'x-access-token': user.accessToken,
    },
  });
};
const update = (id, data) => {
  return http.put(`/update/${id}`, data, {
    headers: {
      'Content-type': 'application/json',
      'x-access-token': user.accessToken,
    },
  });
};

const remove = id => {
  return http.delete(`/delete/${id}`, {
    headers: {
      'Content-type': 'application/json',
      'x-access-token': user.accessToken,
    },
  });
};
// eslint-disable-next-line
export default { create, getAll, update, remove, get };
