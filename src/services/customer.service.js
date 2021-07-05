import http from '../http-common';
const create = data => {
  return http.post('/add', data);
};
// eslint-disable-next-line
export default { create };
