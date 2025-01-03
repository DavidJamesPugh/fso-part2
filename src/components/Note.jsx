const Note = ({ note, toggleImportanceOf }) => {
    const important = note.important;
    const label = note.important ? "Make not important" : "Make important";

    const toggleImportance = () => {
        toggleImportanceOf(note.id);
    }
    return (
        <>
            <li className='note'>
                {important ? <b>{note.content}</b> : note.content}
                <button onClick={toggleImportance}>{label}</button>
            </li>

        </>
    )
}

export default Note