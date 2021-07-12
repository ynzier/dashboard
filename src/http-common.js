import axios from 'axios';

export default axios.create({
  baseURL: 'http://api.klhealthcare.net:8080/api/record',
});
