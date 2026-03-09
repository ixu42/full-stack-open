import type { Diary } from '../types';

const DiaryList = ({ diaries }: { diaries: Diary[] }) => {
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
};

export default DiaryList;
