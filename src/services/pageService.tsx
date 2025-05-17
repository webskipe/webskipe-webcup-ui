import axiosInstance from './axiosInstance';
import { UserPage } from '../types/userPage';


type UserPagesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: UserPage[];
};

export const fetchUserPages = async (): Promise<UserPagesResponse> => {
  const response = await axiosInstance.get('/pages/');
  return response.data;
};

export const createPage = async (formData: FormData) => {
  const response = await axiosInstance.post('/pages/', formData);
  return response.data;
};