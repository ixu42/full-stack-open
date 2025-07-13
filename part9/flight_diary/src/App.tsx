import { useState, useEffect } from 'react';
import type { Diary } from './types';
import { getAllDiaries } from './diaryService';
import NewDiary from './components/NewDiary';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <NewDiary {...{ setError, setDiaries, diaries }} />
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
