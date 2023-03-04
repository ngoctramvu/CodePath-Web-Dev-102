import React, { useState, useEffect } from "react";

const Card = (props) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [props.cardIndex])

  return (
    <div className={`card ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
      <div className="front">
        <img src={`../${props.imgSrc}`}></img>
      </div>
      <div className="back">
        {props.back}
      </div>
    </div>
  )
}

export default Card;