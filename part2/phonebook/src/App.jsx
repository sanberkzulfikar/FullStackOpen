import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import { useState, useEffect } from "react";
import personService from "./services/person";
import Notification from "./components/Notification";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  if (!persons) {
    return null;
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  };

  const namesToShow = !newFilter
    ? persons
    : persons.filter((person) => person.name.includes(newFilter));

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPersonObject = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find(
      (person) => person.name === newPersonObject.name
    );

    if (existingPerson) {
      const confirmUpdate = confirm(
        `${newPersonObject.name} is already added to phonebook, replace the old number with new one?`
      );
      if (confirmUpdate) {
        personService
          .update(existingPerson.id, newPersonObject)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? updatedPerson : person
              )
            );
            setSuccessMessage(`${updatedPerson.name} is Updated!`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 2500);
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${existingPerson.name} has already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            console.error("Error updating person:", error);
            setPersons(
              persons.filter((person) => person.id !== existingPerson.id)
            );
          });
      }
    } else {
      personService
        .create(newPersonObject)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
          setSuccessMessage(`${newPerson.name} is successfully added!`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 2500);
        })
        .catch((error) => {
          console.error("Error creating person:", error);
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (person) => {
    if (confirm(`Do you want to delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then((deletedPerson) =>
          setPersons(persons.filter((person) => deletedPerson.id !== person.id))
        );
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={successMessage} />
      <ErrorMessage message={errorMessage} />

      <Filter value={newFilter} onChange={handleFilter} />

      <h3>Add a new</h3>
      <Form
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons namesToShow={namesToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
