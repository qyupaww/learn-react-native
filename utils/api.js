import axios from "axios";
import { getToken } from "./auth";

const API_BASE_URL = "http://192.168.1.6:8000/api";

export const fetchArticles = async (page = 1, perPage = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/articles?page=${page}&per_page=${perPage}`);
    const { data } = response.data;
    return data;
  } catch (error) {
    throw new Error('Failed to fetch articles');
  }
}

export const fetchDetailArticle = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/articles/${id}`);
    const { data } = response.data;
    return data;
  } catch (error) {
    throw new Error('Failed to fetch article');
  }
};

export const fetchArticleComments = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/comments?a_id=${id}`);
    const { data } = response.data;
    return data;
  } catch (error) {
    throw new Error('Failed to fetch comments');
  }
};

export const createArticle = async (formData) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.post(`${API_BASE_URL}/articles`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token,
      },
    });
    const { data } = response.data;
    return data;
  } catch (error) {
    throw new Error('Failed to create article');
  }
}