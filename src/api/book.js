import axios from 'axios';

axios.defaults.baseURL = 'https://js-band-api.glitch.me/';

export const getBook = (token, id) => {
  return axios.get(`books/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
