import { useState, useEffect } from "react";
import "../App.css";
import Card from "../components/Card/Card";
import { deckDraw, deckInit } from '../api/API'
const VALUES = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  "JACK": 11,
  "QUEEN": 12,
  "KING": 13,
  "ACE": 14,
};

const MainPage = () => {


  const [cardsDraw, setCardsDraw] = useState();
  const [cardsToggle, setCardsToggle] = useState(false)



  useEffect(() => {
    deckInit()
  }, []);
  useEffect(() => {

    if (cardsToggle) {
      deckDraw().then(deckData => setCardsDraw(deckData))
      if (cardsDraw) {
        if (cardsDraw.remaining == 2) {
          deckInit()

        }

      }

      setInterval(() => {
        setCardsToggle(false)
      }, 100)

    }
  })


  const winerOrLoser = () => {
    let p1, p2;
    if (cardsDraw) {
      p1 = cardsDraw.cards[0].value;
      p2 = cardsDraw.cards[1].value;
    }
    if (VALUES[p1] > VALUES[p2]) {


      return <h3 className="result">Player 1 wins</h3>

    } else if (VALUES[p2] > VALUES[p1]) {

      return <h3 className="result"> Player 2 wins</h3>

    } else if (VALUES[p1] === VALUES[p2]) {
      return <h3 className="result">Tie</h3>
    }

  };
  // console.log(cardsDraw.remaining)
  return (
    <div className="container">
      <h1 className="heading">Deck of 52 cards</h1>
      <div className="main">

        <h2 className="result">remaining:{cardsDraw ? cardsDraw.remaining : console.log("no remaining ")}</h2>
        <button className="button" onClick={() => setCardsToggle(!cardsToggle)}>
          Deal
        </button>
        <Card cardValues={cardsDraw} />
        {winerOrLoser()}

      </div>
    </div>
  );
};

export default MainPage;
