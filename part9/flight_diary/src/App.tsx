import { useState, useEffect } from 'react';
import type { Diary } from './types';
import { getAllDiaries } from './diaryService';
import NewDiary from './components/NewDiary';
import DiaryList from './components/DiaryList';

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
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;
