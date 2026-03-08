import type { CoursePart } from '../types';

const PartCourseNameAndExerciseCount = ({ part }: { part: CoursePart }) => {
  return (
    <div>
      <strong>
        {part.name} {part.exerciseCount}
      </strong>
    </div>
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div style={{ marginBottom: '1rem' }}>
          <PartCourseNameAndExerciseCount part={part} />
          <em>{part.description}</em>
        </div>
      );
    case 'group':
      return (
        <div style={{ marginBottom: '1rem' }}>
          <PartCourseNameAndExerciseCount part={part} />
          project exercises {part.groupProjectCount}
        </div>
      );
    case 'background':
      return (
        <div style={{ marginBottom: '1rem' }}>
          <PartCourseNameAndExerciseCount part={part} />
          <em>{part.description}</em>
          <br />
          submit to {part.backgroundMaterial}
        </div>
      );
  }
};

export default Part;
