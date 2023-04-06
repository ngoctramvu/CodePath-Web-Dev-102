import { Link } from "react-router-dom";

const Card = ({crewmate}) => {

  return (
    <div className="crewmate-card" id={crewmate.color}>
      <Link to={`/${crewmate.id}`}>
        <img src="src/assets/crewmate.png" className="single-crewmate"/>
        <h3>Name of Crewmate: <span>{crewmate.name}</span></h3>
        <h3>Speed of Crewmate: <span>{crewmate.speed}</span></h3>
        <h3>Color of Crewmate: <span>{crewmate.color}</span></h3>
      </Link>
      <Link to={`/${crewmate.id}/edit`}>
        <button type="button">Edit Crewmate</button>
      </Link>
    </div>
  )
};

export default Card;