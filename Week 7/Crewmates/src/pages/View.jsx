import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";

const View = () => {
  const [crewmate, setCrewmate] = useState({name: "", speed: 0, color: ""});
  const {id} = useParams();

  useEffect(() => {
    const fetchCrewmate = async () => {
      const {data} = await supabase
        .from("Crewmates")
        .select()
        .eq('id', id);

      setCrewmate(data[0]);
    }

    fetchCrewmate().catch(console.error);
  }, [])

  return (
    <div>
      <div>
        <h1>Crewmate: {crewmate.name}</h1>
        <h1>Stats:</h1>
        <h2>Color: {crewmate.color}</h2>
        <h2>Speed: {crewmate.speed} mph</h2>
        <br/>
        <h3>{crewmate.speed >= 20 ? 
          "Wow, this Crewmate is super fast, that will be helpful! 🏃💨" 
          : "You may want to find a Crewmate with more speed, this one is kind of slow 😬"}
        </h3>

        <a href={`/${id}/edit`}>
          <button type="button">Wanna edit this Crewmate?</button>
        </a>
      </div>
      <br/>
      <img src="/src/assets/suspect.png"/>
    </div>
  );
};

export default View;