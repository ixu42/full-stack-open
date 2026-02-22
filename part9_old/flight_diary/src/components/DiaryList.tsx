import type { Diary } from '../types';

const DiaryList = ({ diaries }: { diaries: Diary[] }) => {
  return (
    <div>
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

export default DiaryList;
