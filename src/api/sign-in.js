import axios from 'axios';

axios.defaults.baseURL = 'https://js-band-api.glitch.me/';

export const signin = userInfo => axios.post('signin', userInfo);
