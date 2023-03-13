import { useState } from 'react';
import { FLASHCARDS } from './constants';
import Card from './components/Card';
import './App.css';

function App() {
  const [ cardIndices, setCardIndices ] = useState(Array.from(Array(FLASHCARDS.length).keys()));
  const [ curCard, setCurCard ] = useState({index: 0, front: FLASHCARDS[0].front, back: FLASHCARDS[0].back});

  const [ curGuess, setCurGuess ] = useState("");
  const [ answerStatus, setAnswerStatus ] = useState("");
  const [ streak, setStreak ] = useState({current: 0, longest: 0});
  
  const handleCardChange = (indexChange) => {
    const newIndex = curCard.index + indexChange;
    const newCard = {index: newIndex, front: FLASHCARDS[cardIndices[newIndex]].front, back: FLASHCARDS[cardIndices[newIndex]].back}
    setCurCard(newCard);
    setAnswerStatus("");
  }

  const handleShuffleCards = () => {
    const shuffledIndices = cardIndices.sort((a, b) => 0.5 - Math.random());
    setCardIndices(shuffledIndices);
  }

  const handleGuess = (event) => {
    if (answerStatus === "")
      setCurGuess(event.target.value);
  }

  const handleAnswerSubmit = () => {
    if (answerStatus !== "")
      return
    if (curGuess.toLowerCase().trim() === curCard.back.toLocaleLowerCase().trim()) {
      setAnswerStatus("correct");
      setStreak({...streak, ...{current: streak.current + 1}});
    }
    else{
      setAnswerStatus("incorrect");
      setStreak({current: 0, longest: Math.max(streak.current, streak.longest)});
    }
  }

  return (
    <div className="App">
      <h2>Countries of the World!</h2>
      <h4>Test your knowledge of flags around the world.</h4>
      <h5>Number of Cards: {FLASHCARDS.length}</h5>
      <h5>Current Streak: {streak.current} | Longest Streak: {streak.longest} </h5>
      <br/>

      <Card
        cardIndex={curCard.index}
        imgSrc={curCard.front}
        answer={curCard.back}
        answerStatus={answerStatus}
        setAnswerStatus={setAnswerStatus}/>

      <br/>

      <div className="guessing">
        Enter your guess:
        <input
          type="text"
          name="answer"
          placeholder="Enter your guess ..."
          value={curGuess}
          onChange={handleGuess}/>

        <button onClick={handleAnswerSubmit}>Submit Guess</button>
      </div>

      <br/>

      <button className="prevCard" disabled={curCard.index===0} onClick={() => handleCardChange(-1)}>←</button>
      <button className="nextCard" disabled={curCard.index===FLASHCARDS.length - 1} onClick={() => handleCardChange(1)}>→</button>
      <button className="nextCard" onClick={handleShuffleCards}>Shuffle Cards</button>

    </div>
  )
}

export default App
