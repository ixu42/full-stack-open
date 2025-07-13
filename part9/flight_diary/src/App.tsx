import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Diary, Visibility, Weather } from './types';
import { getAllDiaries, addDiary } from './diaryService';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<Visibility | ''>('');
  const [weather, setWeather] = useState<'' | Weather>('');
  const [comment, setComment] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const diaryToAdd = {
      date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
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
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility
          <input
            value={visibility}
            onChange={(event) =>
              setVisibility(event.target.value as Visibility | '')
            }
          />
        </div>
        <div>
          weather
          <input
            value={weather}
            onChange={(event) => setWeather(event.target.value as Weather | '')}
          />
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
}

export default App;
