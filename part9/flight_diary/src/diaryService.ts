import axios from 'axios';
import { Diary } from './types';

const baseUrl = 'http://localhost:3000/api';

export const getAllDiaries = () => {
  return axios
    .get<Diary[]>(`${baseUrl}/diaries`)
    .then((response) => response.data);
};
