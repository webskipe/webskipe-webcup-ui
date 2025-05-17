import axiosInstance from './axiosInstance';
import { UserPage } from '../types/userPage';
import axios from 'axios';


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


export const createPage = async (formData: FormData) => {
  const response = await axiosInstance.post('/pages/', formData);
  return response.data;
};