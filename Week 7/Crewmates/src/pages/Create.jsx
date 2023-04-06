import { useState } from "react";
import { supabase } from "../client";
import Form from "../components/Form";

const Create = () => {
  const [crewmate, setCrewmate] = useState({name: "", speed: 0, color: ""});

  const handleCreate = async (event) => {
    event.preventDefault();

    await supabase
      .from('Crewmates')
      .insert({name: crewmate.name, speed: crewmate.speed, color: crewmate.color})
      .select();

    window.location = "/gallery";
  }

  return (
    <div>
      <h1>Create a New Crewmate</h1>
      <img src="/src/assets/crewmates.png" height="100px" width="auto"/>
      <br/>
      <Form crewmate={crewmate} setCrewmate={setCrewmate}/>
      <button onClick={handleCreate}>Create Crewmate</button>
    </div>
  )
};

export default Create;