import React, { useState, useEffect } from "react";

const Card = (props) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(true);
  }, [props.answerStatus])

  useEffect(() => {
    setFlipped(false);
  }, [props.cardIndex])

  const handleCardFlip = () => {
    setFlipped(!flipped);
    if (props.answerStatus === "")
      props.setAnswerStatus("incorrect");
  }

  return (
    <div className={`card ${props.answerStatus} ${flipped ? "flipped" : ""}`} onClick={handleCardFlip}>
      <div className="front">
        <img src={`../${props.imgSrc}`}></img>
      </div>
      <div className="back">
        {props.answer}
      </div>
    </div>
  )
}

export default Card;