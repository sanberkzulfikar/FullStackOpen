const Course = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <p>
        <strong>total of {total} exercises</strong>
      </p>
    </>
  );
};

const Header = ({ course }) => <h1>{course.name}</h1>;

const Content = ({ course }) => {
  return course.parts.map((part) => <Part key={part.id} part={part} />);
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

export default Course;
