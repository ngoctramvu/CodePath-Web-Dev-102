import React from "react";

const Card = (props) => {
  return (
    <div className="Card">
      <img src={props.imgSrc}></img>
      <div className="info">
        <h3>{props.title}</h3>
        <p>📅 {props.date}</p>
        <p>📍 {props.address}</p>
      </div>
      <a href={props.url}>
        <button>Get Ticket</button>
      </a>
    </div>
  )
}

export default Card;