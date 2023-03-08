import axios from "axios";

axios.defaults.baseURL = "https://js-band-api.glitch.me/";

export const getBooks = (token: string) => {
  return axios.get("books", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
