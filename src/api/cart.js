import axios from 'axios';

const url = 'https://js-band-api.glitch.me/purchase';

export const purchaseBooks = (token, books) => {
  return axios({
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    data: { books },
    url,
  });
};
