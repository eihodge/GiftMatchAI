import React, { useState } from 'react';
import './App.css';
import send from './assets/send.png'; 
import walmart from './assets/walmart.png'; 
import amazon from './assets/amazon.png'; 
import ebay from './assets/ebay.ico'; 
import sparkle from './assets/sparkle.png'; 

function App() {
  const [input, setInput] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state

  const cleanRecommendation = (gift) => {
    return gift.replace(/^\s*[-]?\s*[\d]*\.?\s*/, '').replace(/,\s*$/, '').trim();
  };

  const handleSubmit = async () => {
    if (!input.trim()) {
      alert('Please provide a description.');
      return;
    }

    setLoading(true); // Set loading to true before the API call

    try {
      const response = await fetch('https://gift-match-ai-640b3532a758.herokuapp.com/generate-gift', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If the response contains an error, alert the user
        if (data.error) {
          alert(data.error);
          return;
        } else {
          throw new Error('Failed to communicate with the backend');
        }
      }

      // Split by both commas and new lines
      const gifts = data.message.split(/[\n,]+/);
      const cleanedGifts = gifts.map(cleanRecommendation).filter(gift => gift); // filter removes any empty strings
      setRecommendations(cleanedGifts);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to communicate with the backend');
    } finally {
      setLoading(false); // Reset loading to false after the API call
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default behavior (new line in textarea)
      handleSubmit(); // Call the submit function
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-div">
          <img src={sparkle} alt="Send" className="sparkle-icon" />
          <p className="app-title">GiftFinderAI</p>
        </div>
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
        onKeyDown={handleKeyDown} // Add the onKeyDown handler here
        autoFocus
      />
      <br />
      <div className="button-container-submit">
        <button className="app-button" onClick={handleSubmit}>
          <img src={send} alt="Send" className="send-icon" />
        </button>
      </div>

      <div className='loadingContainer'>
        {loading && <div className="loading"></div>} {/* Show loading indicator */}
      </div>
      

      <div className="recommendations-container">
        {recommendations.map((gift, index) => (
          <div key={index} className="recommendation">
            {gift}
            <div className="button-container">
              <a 
                href={`https://www.amazon.com/s?k=${encodeURIComponent(gift)}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <button className="amazon-button">
                  <img src={amazon} alt="Amazon" className="amazon-icon" />
                </button>
              </a>
              <a 
                href={`https://www.walmart.com/search/?query=${encodeURIComponent(gift)}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <button className="walmart-button">
                  <img src={walmart} alt="Walmart" className="walmart-icon" />
                </button>
              </a>

              <a 
                href={`https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(gift)}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <button className="ebay-button">
                  <img src={ebay} alt="eBay" className="ebay-icon" />
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
