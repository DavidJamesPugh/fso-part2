

const Person = ({ person,onDelete  }) => {
    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
            onDelete(person.id); // Pass the id to the delete handler
        }
    };
    return (
        <li>{person.name}: {person.number}<button onClick={handleDelete}>Delete</button></li>
    )
}

export default Person