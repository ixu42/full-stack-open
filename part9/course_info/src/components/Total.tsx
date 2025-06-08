interface TotalProps {
  totalExercises: number;
}

const Total = ({ totalExercises }: TotalProps) => {
  return <div>Number of exercises {totalExercises}</div>;
};

export default Total;
