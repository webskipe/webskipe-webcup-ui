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