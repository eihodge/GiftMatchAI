
import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    alert(`User input: ${input}`);
    // Here you would send the input to the backend/OpenAI API
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">GiftFinderAI</h1>
      </header>
      <p className="app-description">Enter a description of the person or a list of their interests, and we'll suggest potential gift ideas!</p>
      <textarea
        className="app-textarea"
        rows="10"
        cols="50"
        placeholder="Describe the person or their interests..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button className="app-button" onClick={handleSubmit}>Send</button>
    </div>
  );
}

export default App;