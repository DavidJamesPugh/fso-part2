import Header from "./Header.jsx";
import Content from "./Content.jsx";

const Course = ({course}) => {
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
        </>
    )
}
export default Course