import axios from "axios";

const API_BASE_URL = "https://dev.to/api";

export const fetchArticles = async (page = 1, perPage = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/articles?page=${page}&per_page=${perPage}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch articles');
  }
}

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