const Discover = ({response, handleAddedBan, handleDiscover}) => {
  return (
    <div className="discover-container">
      {response.url != '' ?
      <div className="listing-container">
        <div className="buttons">
          {response.attributes.map((attribute) => (
            <button key={attribute} className="attribute-buttons" onClick={() => handleAddedBan(attribute)}>{attribute}</button>
          ))}
        </div>
        <br/>
        <img className="dog-pic" src={response.url} alt="random image from Dog API" width="250px" height="250px"/>
      </div>
      :<br/>}
      
      <br/>
      <button className="discover-btn" onClick={handleDiscover}>
        🔀 Discover!
      </button>
    </div>
  )
};

export default Discover;