import SinglePerson from "./SinglePerson";

const Persons = ({ namesToShow, handleDelete }) => {
  return (
    <div>
      {namesToShow.map((person) => (
        <SinglePerson
          key={person.name}
          person={person}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Persons;
