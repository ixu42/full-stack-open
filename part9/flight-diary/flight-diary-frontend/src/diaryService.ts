import axios from 'axios';
import type { Diary } from './types';

const baseUrl = 'http://localhost:3000/api';

export const getAllDiaries = async () => {
  const response = await axios.get<Diary[]>(`${baseUrl}/diaries`);
  return response.data;
};
