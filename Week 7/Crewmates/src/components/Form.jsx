const COLORS = ["Red", "Green", "Blue", "Purple", "Yellow", "Orange", "Pink", "Rainbow"];

const Form = ({crewmate, setCrewmate}) => {
  const handleNameChange = (event) => {
    setCrewmate((prev) => ({...prev, name: event.target.value}));
  }

  const handleSpeedChange = (event) => {
    setCrewmate((prev) => ({...prev, speed: event.target.value}));
  }

  const handleColorChange = (event) => {
    setCrewmate((prev) => ({...prev, color: event.target.value}));
  }

  return (
    <div>
      <form className="form-container">
        <div className="mini-container">
          <label>
            <h3>Name:</h3>
          </label>
          <input type="text" name="name" placeholder="Enter crewmate's name" value={crewmate.name} onChange={handleNameChange} />
        </div>
        <div className="mini-container">
          <label>
            <h3>Speed (mph):</h3>
            </label>
          <input type="number" inputMode="decimal" step="0.1" name="speed" placeholder="Enter speed in mph" value={crewmate.speed} onChange={handleSpeedChange} />
        </div>
        <div className="mini-container">
          <label>
            <h3>Color:</h3>
          </label>
          {COLORS.map((color) => (
            <li key={color}>
              <input id={color} name="color" type="radio" value={color} checked={color===crewmate.color ?? false} onChange={handleColorChange}/>
              {color}
            </li>
          ))}
        </div>
      </form>
    </div>
  )
};

export default Form;