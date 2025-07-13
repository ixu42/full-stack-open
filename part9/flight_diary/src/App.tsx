import { useState, useEffect } from 'react';
import type { Diary, Visibility, Weather } from './types';
import { getAllDiaries } from './diaryService';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<Visibility | ''>('');
  const [weather, setWeather] = useState<'' | Weather>('');
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryToAdd = {
      date: date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment: comment,
      id: diaries.length + 1
    };
    console.log('Adding diary:', diaryToAdd);
    setDiaries(diaries.concat(diaryToAdd));
    setDate('');
    // validate visibility and weather before setting
    setVisibility('');
    setWeather('');
    setComment('');
    return null;
  };

  return (
    <div>
      <h2>Add new entry</h2>
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
