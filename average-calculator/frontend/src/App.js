
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchNumbers = async (type) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:9876/numbers/${type}`);
      setData(res.data);
    } catch (err) {
      console.error('Error fetching numbers:', err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Average Calculator</h1>
      <div className="buttons">
        <button onClick={() => fetchNumbers('e')}>Even</button>
        <button onClick={() => fetchNumbers('f')}>Fibonacci</button>
        <button onClick={() => fetchNumbers('p')}>Prime</button>
        <button onClick={() => fetchNumbers('r')}>Random</button>
      </div>

      {loading && <p>Loading...</p>}

      {data && (
        <div className="results">
          <h2>Results</h2>
          <p><strong>Previous Window:</strong> {JSON.stringify(data.windowPrevState)}</p>
          <p><strong>Current Window:</strong> {JSON.stringify(data.windowCurrState)}</p>
          <p><strong>Fetched Numbers:</strong> {JSON.stringify(data.numbers)}</p>
          <p><strong>Average:</strong> {data.avg}</p>
        </div>
      )}
    </div>
  );
}

export default App;
