
import './App.css'
import Phonebook from "./components/Phonebook.jsx";
import {Notebook} from "./components/Notebook.jsx";
import {WeatherApp} from "./components/WeatherApp.jsx";

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }
    return (
        <div style={footerStyle}>
            <br />
            <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
        </div>
    )
}

const App = () => {

    return (
        <div>
            <Notebook/>
            <WeatherApp/>
            <Footer/>
        </div>
    )

}

export default App
