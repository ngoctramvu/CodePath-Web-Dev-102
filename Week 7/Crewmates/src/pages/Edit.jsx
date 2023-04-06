import { React, useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Form from "../components/Form";
import { supabase } from "../client";

const Edit = () => {
  const [oldCrew, setOldCrew] = useState({name: "", speed: 0, color: ""});
  const [crewmate, setCrewmate] = useState({name: "", speed: 0, color: ""});

  const {id} = useParams();

  useEffect(() => {
    const fetchCrewmate = async () => {
      const {data} = await supabase
        .from("Crewmates")
        .select()
        .eq("id", id);

        setOldCrew(data[0]);
        setCrewmate(data[0]);
    };

    fetchCrewmate().catch(console.error);
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();

    await supabase
      .from("Crewmates")
      .update({name: crewmate.name, speed: crewmate.speed, color: crewmate.color})
      .eq("id", id);
    
      window.location = "/gallery";
  }

  const handleDelete = async (event) => {
    event.preventDefault();

    await supabase
      .from("Crewmates")
      .delete()
      .eq("id", id);
    
      window.location = "/gallery";
  }

  return (
    <div>
      <h1>Update Your Crewmate :)</h1>
      <img src="/src/assets/crewmates.png" className="single-crewmate"/>
      <h2> Current Crewmate Info: </h2>
      <h3> Name: {oldCrew.name}, Speed: {oldCrew.speed}, Color: {oldCrew.color}</h3>
      <Form crewmate={crewmate} setCrewmate={setCrewmate} />
      <button onClick={handleUpdate}>Update Crewmate</button>
      <button onClick={handleDelete}>Delete Crewmate</button>
    </div>
  )
};

export default Edit;