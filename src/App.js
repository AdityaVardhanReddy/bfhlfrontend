import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        document.title = "21BDS0107";
    }, []);

    const handleSubmit = async () => {
        try {
            const res = await axios.post('https://bfhlbackend-iaw8.onrender.com', JSON.parse(input));
            setResponse(res.data);
        } catch (err) {
            alert('Invalid JSON input');
        }
    };

    const handleChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedOptions([...selectedOptions, value]);
        } else {
            setSelectedOptions(selectedOptions.filter(opt => opt !== value));
        }
    };

    const renderResponse = () => {
        if (!response) return null;
        const { numbers, alphabets, highest_lowercase_alphabet } = response;
        return (
            <div style={styles.resultContainer}>
                {selectedOptions.includes('Numbers') && <div>Numbers: {numbers.join(', ')}</div>}
                {selectedOptions.includes('Alphabets') && <div>Alphabets: {alphabets.join(', ')}</div>}
                {selectedOptions.includes('Highest lowercase alphabet') && <div>Highest Lowercase Alphabet: {highest_lowercase_alphabet}</div>}
            </div>
        );
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>BFHL Data Processor</h1>
            <textarea
                style={styles.textarea}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Enter JSON here'
            />
            <button style={styles.button} onClick={handleSubmit}>Submit</button>
            <div style={styles.checkboxContainer}>
                <label style={styles.label}>
                    <input type='checkbox' value='Numbers' onChange={handleChange} /> Numbers
                </label>
                <label style={styles.label}>
                    <input type='checkbox' value='Alphabets' onChange={handleChange} /> Alphabets
                </label>
                <label style={styles.label}>
                    <input type='checkbox' value='Highest lowercase alphabet' onChange={handleChange} /> Highest Lowercase Alphabet
                </label>
            </div>
            {renderResponse()}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '600px',
        margin: '50px auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    },
    textarea: {
        width: '100%',
        height: '100px',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginBottom: '20px',
        fontSize: '16px',
    },
    button: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
        marginBottom: '20px',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    checkboxContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    label: {
        fontSize: '16px',
        color: '#333',
    },
    resultContainer: {
        padding: '10px',
        backgroundColor: '#e9ecef',
        borderRadius: '4px',
    },
};

export default App;
