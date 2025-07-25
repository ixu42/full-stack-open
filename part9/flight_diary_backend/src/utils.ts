import { NewDiaryEntry, Weather, Visibility } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseComment = (comment: unknown): string => {
  if (!isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }

  return comment;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const isWeather = (param: string): param is Weather => {
  return Object.values(Weather)
    .map((v) => v.toString())
    .includes(param);
};

const parseWeather = (weather: unknown): Weather => {
  if (!isString(weather) || !isWeather(weather)) {
    throw new Error('Incorrect weather: ' + weather);
  }
  return weather;
};

const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility)
    .map((v) => v.toString())
    .includes(param);
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!isString(visibility) || !isVisibility(visibility)) {
    throw new Error('Incorrect visibility: ' + visibility);
  }
  return visibility;
};

const toNewDiaryEntry = (obj: unknown): NewDiaryEntry => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'comment' in obj &&
    obj.comment &&
    'date' in obj &&
    obj.date &&
    'weather' in obj &&
    obj.weather &&
    'visibility' in obj &&
    obj.visibility
  ) {
    const newEntry: NewDiaryEntry = {
      date: parseDate(obj.date),
      visibility: parseVisibility(obj.visibility),
      weather: parseWeather(obj.weather),
      comment: parseComment(obj.comment)
    };

    return newEntry;
  }

  throw new Error('Incorrect data: a field missing');
};

export default toNewDiaryEntry;
