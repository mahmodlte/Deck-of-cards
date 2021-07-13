const Card = ({ cardValues }) => {
  // console.log(typeof cardValues.cards);
  return (
    <div className="cardsContainer">
      {cardValues
        ? cardValues.cards.map((values) => {
          return (

            <div key={values.code} className="card">
              <img src={values.image} alt={values.suit} />
            </div>

          );
        })
        : console.warn("there is no data")}
    </div>
  );
};
export default Card;

