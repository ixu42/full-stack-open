import type { CoursePart } from '../types';

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <em>{part.description}</em>
        </div>
      );
    case 'group':
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          project exercises {part.groupProjectCount}
        </div>
      );
    case 'background':
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <em>{part.description}</em>
          <br />
          submit to {part.backgroundMaterial}
        </div>
      );
    case 'special':
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <em>{part.description}</em>
          <br />
          required skills: {part.requirements.join(', ')}
        </div>
      );
    default:
      console.log('default:', part);
      return assertNever(part);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part;
