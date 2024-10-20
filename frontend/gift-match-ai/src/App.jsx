import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');

  // const response = await fetch('http://127.0.0.1:5000/generate-gift', {
  
  const handleSubmit = async () => {
    if (!input.trim()) {
      alert('Please provide a description.');
      return;
    }
  
    try {
      const response = await fetch('https://gift-match-ai.herokuapp.com/generate-gift', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to communicate with the backend');
      }
  
      const data = await response.json();
      alert(data.message);  // Display the backend's response in an alert
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to communicate with the backend');
    }
  };
  

  
  
  

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">GiftMatchAI</h1>
      </header>
      <p className="app-description">
        Enter a description of the person or a list of their interests, and we'll suggest potential gift ideas!
      </p>
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
