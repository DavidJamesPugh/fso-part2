import {useEffect, useState} from "react";
import Note from "./Note.jsx";
import {Notification} from "./Notification.jsx";
import {GetData, UpdateData} from "./BackendCalls.jsx";


export const Notebook = () => {

     const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('')
    const [newNoteImportant, setNewNoteImportant] = useState(false)
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    const toggleImportanceOf = (id)=> {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }
        setErrorMessage(
            `Note '${note.content}' made ${!note.important ? "Important" : "not important"}`
        )
        setTimeout(() => {setErrorMessage(null)}, 5000);
        UpdateData('notes', changedNote,id).then(returnedNote => {
            setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        })
            .catch(error => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            })
    }


    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important === true)


    const addNote = (click) => {
        click.preventDefault();
        const noteObj = {
            content : newNote,
            important: newNoteImportant
        }

        const existingNotes = notes.map(note => note.content)

        if(existingNotes.includes(newNote)) {
            alert(`${newNote} is already added to notebook`)
            console.log(newNote,'same name present:',newNote)

        } else {
            //alert('${newName} is already added to the phonebook')
            UpdateData('notes', noteObj);
            setNotes(notes.concat(noteObj))

        }
        setNewNote('')
        setNewNoteImportant(false)


    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await GetData('notes');
            if (data) {
                setNotes(data);
            }
        };
        fetchData();

    }, []);

    return (
        <>
            <h2>Notebook</h2>
            <Notification message={errorMessage} />
            <form>
                <div>
                    Note: <input value={newNote} onChange={e => setNewNote(e.target.value)}/> <br/>
                </div>
                <div>
                    Important: <input type="checkbox"  checked={newNoteImportant}  defaultChecked={newNoteImportant}
                                      onChange={e => setNewNoteImportant(e.target.value)}/><br/>
                </div>
                <div>
                    <button type="submit" onClick={addNote}>Add Note</button>
                </div>
            </form>
            <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? 'important' : 'all'}
            </button>
            {notesToShow.map(note => <Note key={note.id} note={note} toggleImportanceOf={toggleImportanceOf}/>)}
            <hr/>
        </>

    )
}


export default Notebook