import Person from "./Person.jsx";
import {useEffect, useState} from "react";
import {DeleteData, GetData, UpdateData} from "./BackendCalls.jsx";
import {Notification} from "./Notification.jsx";

const Phonebook = () => {

    const [persons, setPersons] = useState([
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)



    useEffect(() => {
        const fetchData = async () => {
            const data = await GetData('persons');
            if (data) {
                setPersons(data);
                console.log(data);
            }
        };
        fetchData();

    }, [])


    const addName = async (click) => {
        click.preventDefault()

        const existingNames = persons.map(person => person.name);

        if(existingNames.includes(newName)) {
            const matchingRecord =persons.find((person) => person.name === newName);
            const nameObj = {
                ...matchingRecord,
                number: newNumber

            }

            if (window.confirm(`Are you sure you want to replace the old number for ${matchingRecord.name} with the new one?`)) {
                const updatedPerson = await UpdateData('persons', nameObj, matchingRecord.id);
                if(updatedPerson) {
                    setPersons(persons.map(p => p.id === matchingRecord.id ? updatedPerson : p));
                    setErrorMessage(`Updated ${updatedPerson.name} in the phonebook`);
                   setTimeout(() => { setErrorMessage(null)}, 4500);
                }
            } else {
                alert("Number kept the same");
            }

        } else {
            const nameObj = {
                number: newNumber,
                name: newName,
                //id: persons.length + 1,

            }
            const addedPerson = await UpdateData('persons', nameObj);
            if(addedPerson){
                setPersons(persons.concat(addedPerson));
                setErrorMessage(`Added ${addedPerson.name} to the phonebook`);
                setTimeout(() => { setErrorMessage(null)}, 4500);
            }
            //alert('${newName} is already added to the phonebook')

        }
        setNewName('')
        setNewNumber('')
    }
    const searchField = (event) => {
        setSearch(event.target.value)

    }
    const personFilter = search ?
        persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())) :
        persons


    const handleDelete = async (id) => {
        await DeleteData(id,'persons', (deletedId) => {
            setPersons((prevPeople) => prevPeople.filter(person => person.id !== deletedId));
        });
    };



    return (
        <>
            <h2>Phonebook</h2>
            <Notification message={errorMessage} />
            <h3>Search</h3>
             <input value={search} onChange={searchField}/>
            <br/>
            <hr/>
            <form>
                <div>
                    name: <input value={newName} onChange={e => setNewName(e.target.value)} /> <br/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)} />
                </div>
                <div>
                    <button type="submit" onClick={addName}>add</button>
                </div>
            </form>
            <h3>Numbers</h3>
            {personFilter.map(person =>
                <Person key={person.id} person={person} onDelete={handleDelete}  />
            )}
        </>
    )
}

export default Phonebook