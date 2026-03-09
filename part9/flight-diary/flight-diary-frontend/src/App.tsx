import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Diary } from './types';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    axios.get<Diary[]>('http://localhost:3000/api/diaries').then((response) => {
      setDiaries(response.data);
    });
  }, []);

  return (
    <div>
      <h3>Diary entries</h3>
      <div>
        {diaries.map((diary) => (
          <div key={diary.id}>
            <h4>{diary.date}</h4>
            <p style={{ margin: 0 }}>visibility: {diary.visibility}</p>
            <p style={{ margin: 0 }}>weather: {diary.weather}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
