import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5001/v2/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });

  instance.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


  export default instance;
