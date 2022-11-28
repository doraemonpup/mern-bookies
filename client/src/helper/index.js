import axios from 'axios';

export const fetchData = async url => {
  const res = await axios.get(url);
  return res;
};

export const deleteData = async url => {
  const res = axios.delete(url);
  return res;
};

export const addData = async (url, data) => {
  const res = axios.post(url, data);
  return res;
};
