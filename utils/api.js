import axios from "axios";

const API_BASE_URL = 'https://0cba-180-251-235-117.ngrok-free.app/api';

export const fetchArticles = async (page = 1, perPage = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/articles?page=${page}&per_page=${perPage}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch articles');
  }
};

export const fetchDetailArticle = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/articles/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch article');
  }
};

export const fetchArticleComments = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/comments?a_id=${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch comments');
  }
};

export const registerUser = async (name, username, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      name,
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Registration failed.');
    } else {
      throw new Error('Failed to connect to the server.');
    }
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data; 
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Login failed.');
    } else {
      throw new Error('Failed to connect to the server.');
    }
  }
};
