const Card = ({stats, label}) => {
  return (
    <div className="Card">
      <h1 className="number">{stats}</h1>
      <h2>{label}</h2>
    </div>
  );
};

export default Card;