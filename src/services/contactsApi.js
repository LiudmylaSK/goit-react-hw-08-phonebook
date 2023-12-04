import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

export const setToken = token => {
  if (instance.defaults.headers.common) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

export const removeToken = () => {
  if (instance.defaults.headers.common) {
    instance.defaults.headers.common.Authorization = '';
  }
};

export const requestRegister = async userData => {
  try {
    const { data } = await instance.post('/users/signup', userData);
    setToken(data.token);
    return data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

export const requestLogin = async userData => {
  try {
    const { data } = await instance.post('/users/login', userData);
    setToken(data.token);
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const requestLogout = async () => {
  try {
    const { data } = await instance.post('/users/logout');
    removeToken();
    return data;
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

export const requestUserRefresh = async () => {
  try {
    const { data } = await instance.get('/users/current');
    return data;
  } catch (error) {
    console.error('Error during user refresh:', error);
    throw error;
  }
};

export const requestAllContacts = async () => {
  try {
    const { data } = await instance.get('/contacts');
    return data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

export const requestAddContact = async newContact => {
  try {
    const { data } = await instance.post('/contacts', newContact);
    return data;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
};

export const requestDeleteContact = async contactId => {
  try {
    const { data } = await instance.delete(`/contacts/${contactId}`);
    return data;
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
};
