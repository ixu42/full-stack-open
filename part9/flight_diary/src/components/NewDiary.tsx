import React, { useState } from 'react';
import axios from 'axios';
import type { Diary, Visibility, Weather } from '../types';
import { addDiary } from '../diaryService';

interface NewDiaryProps {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
  diaries: Diary[];
}

const NewDiary = ({ setError, setDiaries, diaries }: NewDiaryProps) => {
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<Visibility | ''>('');
  const [weather, setWeather] = useState<Weather | ''>('');
  const [comment, setComment] = useState<string>('');
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!date || !visibility || !weather || !comment) {
      setError('All fields are required');
      setTimeout(() => setError(null), 5000);
      return;
    }

    const diaryToAdd = {
      date,
      visibility,
      weather,
      comment
    };

    try {
      const savedDiary = await addDiary(diaryToAdd);
      setDiaries(diaries.concat(savedDiary as Diary));
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
    } catch (error: unknown) {
      if (error instanceof Error && axios.isAxiosError(error)) {
        setError(error.response?.data?.error ?? 'An unexpected error occurred');
      } else {
        setError('An unexpected error occurred');
      }
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        date
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>
      <div>
        visibility
        {['great', 'good', 'ok', 'poor'].map((v) => (
          <label key={v}>
            <input
              type="radio"
              value={v}
              checked={visibility === v}
              onChange={() => setVisibility(v as Visibility)}
            />
            {v}
          </label>
        ))}
      </div>
      <div>
        weather
        {['sunny', 'rainy', 'cloudy', 'stormy', 'windy'].map((w) => (
          <label key={w}>
            <input
              type="radio"
              value={w}
              checked={weather === w}
              onChange={() => setWeather(w as Weather)}
            />
            {w}
          </label>
        ))}
      </div>
      <div>
        comment
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default NewDiary;
