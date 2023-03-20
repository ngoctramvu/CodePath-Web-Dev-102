const BanSidebar = ({banList, handleRemoveBan}) => {

  return (
    <div className="ban-sidebar">
      <h2>Ban List</h2>
      <h4>Select an attribute in your listing to ban it</h4>

      {banList && banList.map((attribute) => (
        <button key={attribute} className="banned-buttons" onClick={() => handleRemoveBan(attribute)}>{attribute}</button>
      ))}
    </div>
  )
}

export default BanSidebar;