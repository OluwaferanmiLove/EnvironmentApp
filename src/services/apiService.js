import axios from 'axios';

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  if (error.response && error.response.data) {
    return Promise.reject(error.response);
  }
  return Promise.reject(error.message);
});

async function getWeatherOne(data) {
  const options = {
    headers: { 'content-type': 'application/json' },
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }

  return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${data.latitude}&lon=${data.longitude}&appid=6f63c292bf5c6bcd1b8976b111798f66`, options)
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      // throw new Error(error)
      return error;
    })
}

async function getWeatherFullData(data) {
  const options = {
    headers: { 'content-type': 'application/json' },
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }

  return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.latitude}&lon=${data.longitude}&units=metric&appid=6f63c292bf5c6bcd1b8976b111798f66`, options)
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      // throw new Error(error)
      return error;
    })
}

export const apiService = {
  getWeatherOne,
  getWeatherFullData,
}