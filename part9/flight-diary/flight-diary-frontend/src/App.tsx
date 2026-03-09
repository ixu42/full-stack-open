import { useState, useEffect } from 'react';
import type { Diary } from './types';
import { getAllDiaries } from './diaryService';
import DiaryList from './components/DiaryList';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return <DiaryList diaries={diaries} />;
}

export default App;
