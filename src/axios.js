import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://reactblog-d7743.firebaseio.com/',
});

export default instance;
