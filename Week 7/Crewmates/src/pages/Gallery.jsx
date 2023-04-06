import { React, useState, useEffect } from "react";
import Card from "../components/Card";

const Gallery = ({crewmates}) => {
  const [stats, setStats] = useState({fastest: 0, average: 0});

  useEffect(() => {
    const fastest = crewmates.reduce((max, cur) => Math.max(max, cur.speed), 0);
    const average = Math.round(crewmates.reduce((total, cur) => total + cur.speed, 0)/crewmates.length);

    setStats({fastest: fastest, average: average});
  }, [crewmates]);

  return (
    <div>
      <h1>Your Crewmate Gallery!</h1>
      <h2>Fastest Speed: {stats.fastest} mph | Average Speed: {stats.average} mph</h2>
      <div className="crewmate-container">
        {crewmates.map((crewmate) => <Card key={crewmate.id} crewmate={crewmate} />)}
      </div>
    </div>
  );
};

export default Gallery;