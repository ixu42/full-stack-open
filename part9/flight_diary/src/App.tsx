import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Diary, Visibility, Weather } from './types';
import { getAllDiaries, addDiary } from './diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<Visibility | ''>('');
  const [weather, setWeather] = useState<Weather | ''>('');
  const [comment, setComment] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

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
      console.log('Adding diary:', diaryToAdd);
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
    <div>
      <h2>Add new entry</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
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
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <div>
            <p style={{ margin: 0 }}>visibility: {diary.visibility}</p>
            <p style={{ margin: 0 }}>weather: {diary.weather}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
