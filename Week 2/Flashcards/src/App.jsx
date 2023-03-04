import { useState } from 'react';
import { FLASHCARDS } from './constants';
import Card from './components/Card';
import './App.css';

function App() {
  const indicesArr = Array.from(Array(FLASHCARDS.length).keys());
  const shuffledIndices = indicesArr.sort((a, b) => 0.5 - Math.random());
  
  const [ cardIndex, setCardIndex ] = useState(0);
  
  const handleCardChange = (indexChange) => {
    if (cardIndex + indexChange >= 0 && cardIndex + indexChange < FLASHCARDS.length)
      setCardIndex(cardIndex + indexChange)
  }

  return (
    <div className="App">
      <h2>Countries of the World!</h2>
      <h4>Test your knowledge of flags around the world.</h4>
      <h5>Number of Cards: {FLASHCARDS.length}</h5>
      <br/>

      <Card cardIndex={shuffledIndices[cardIndex]} imgSrc={FLASHCARDS[shuffledIndices[cardIndex]].front} back={FLASHCARDS[shuffledIndices[cardIndex]].back}/>

      <br/>
      <button className="prevCard" onClick={() => handleCardChange(-1)}>←</button>
      <button className="nextCard" onClick={() => handleCardChange(1)}>→</button>
    </div>
  )
}

export default App
