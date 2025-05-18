import axiosInstance from './axiosInstance';
import { UserPage } from '../types/userPage';


type UserPagesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: UserPage[];
};

export const fetchUserPages = async (filters = {}): Promise<UserPagesResponse> => {
  const response = await axiosInstance.get('/pages/', {
    params: filters,
  });
  return response.data;
};

export const deletePage = async (slug: string) => {
  const response = await axiosInstance.delete(`/pages/${slug}/`);
  return response.data;
};

export const incrementPageViews = async (slug: string) => {
  const response = await axiosInstance.post(`/pages/${slug}/increment_view/`);
  return response.data;
};

export const fetchOnePage = async (slug: string) => {
  const response = await axiosInstance.get(`/pages/${slug}/`);
  return response.data;
};

export const filterCommentsByPage = async (pageId: string) => {
  const response = await axiosInstance.get(`/comments/byPage/${pageId}`);
  return response.data;
};

export const createComment = async (formData: FormData) => {
  const response = await axiosInstance.post('/comments/', formData);
  return response.data;
};


export const createPage = async (formData: FormData) => {
  const response = await axiosInstance.post('/pages/', formData);
  return response.data;
};

export const postComment = async (pageId: string | number, content: string) => {
  const response = await axiosInstance.post('/comments/', {
    page: pageId,
    content,
  });
  return response.data;
};