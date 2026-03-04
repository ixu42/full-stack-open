import type { CoursePart } from '../types';

interface ContentProps {
  parts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.parts.map((part, index) => (
        <div key={index}>
          <p>
            {part.name} {part.exerciseCount}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Content;
