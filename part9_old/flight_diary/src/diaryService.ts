import axios from 'axios';
import { Diary, NewDiaryEntry } from './types';

const baseUrl = 'http://localhost:3000/api';

export const getAllDiaries = async () => {
  const response = await axios.get<Diary[]>(`${baseUrl}/diaries`);
  return response.data;
};

export const addDiary = async (diary: NewDiaryEntry) => {
  const response = await axios.post<Diary>(`${baseUrl}/diaries`, diary);
  return response.data;
};
