import { useState, useEffect } from 'react';
import './Graph.css';

export default function Graph() {
    const [test, setTest] = useState(); // Contains response from backend
    const [file, setFile] = useState(null); // Store the selected file

    useEffect(() => { // Runs when the site is loaded
        fetch('http://localhost:5000/graph/') // Tests backend communication
        .then(response => response.json())
        .then(data => setTest(data))
        .catch(error => setTest('Failure'));
    }, [])

   
    return (
        <div>
            <h1>Graph: {test}</h1>
            <form>
                <input type="file" id="myFile" name="filename"/>
                <input type="submit" />
            </form>
        </div>
    );
}
