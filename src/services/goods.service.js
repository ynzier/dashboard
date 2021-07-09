import axios from 'axios';
const user = JSON.parse(localStorage.getItem('user'));

const API_URL = 'http://localhost:8080/api/getModel/';

const add = modelID => {
  return axios.post(API_URL + 'add', modelID, {
    headers: {
      'Content-type': 'application/json',
      'x-access-token': user.accessToken,
    },
  });
};

const remove = id => {
  console.log(id);
  return axios.delete(API_URL + 'delete/' + id, {
    headers: {
      'Content-type': 'application/json',
      'x-access-token': user.accessToken,
    },
  });
};

const getAll = () => {
  return axios.get(API_URL + 'getData', {
    headers: {
      'Content-type': 'application/json',
      'x-access-token': user.accessToken,
    },
  });
};
// eslint-disable-next-line
export default { add, remove, getAll };
