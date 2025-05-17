// services/pageService.ts
import axiosInstance from './axiosInstance';
import { UserPage } from '../types/userPage';

export const fetchUserPages = async (): Promise<UserPage[] | null> => {
  const response = await axiosInstance.get('/pages/');
  return response.data;
};
