import Course from "./Course.jsx";


const Courses = ({courses}) => {


    return courses.map(course => <Course key={courses.id} course={course} />)
}
export default Courses