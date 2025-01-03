import Part from "./Part.jsx";
import PartsSum from "./PartsSum.jsx";

const Content = ({parts}) => {
    const exNum = parts.map(part => part.exercises)

    return (
        <>

                {parts.map(part => <Part key={part.id} part={part}/>)}
            <br/>
            <PartsSum parts={exNum} />
        </>
    )
}
export default Content