import type { CourseParts } from '../types';
import Part from './Part';

const Content = ({ parts }: CourseParts) => {
  return (
    <div>
      {parts.map((part, index) => (
        <div key={index}>
          <Part part={part} />
          <br />
        </div>
      ))}
    </div>
  );
};

export default Content;
