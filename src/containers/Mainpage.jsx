import { useState, useEffect } from "react";
import "../App.css";
import Card from "../components/Card/Card";
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
  const BASE_URL =
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

  const [deckId, setDeckId] = useState();
  const [deckDraw, setDeckDraw] = useState();
  const [playerCards, setPlayerCards] = useState();
  const [cardsToggle, setCardsToggle] = useState(false)
  const [bot, setBot] = useState(false);
  const piles = (player, card1, card2) => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/pile/${player}/add/?cards=${card1},${card2}`)
      .then(res => res.json())
      .then(piles => setPlayerCards(piles))
      .catch(err => console.log(err))


  }
  console.log(playerCards)
  useEffect(() => {
    const gameStart = async () => {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      setDeckId(data.deck_id);
    };
    gameStart();
  }, []);
  useEffect(() => {
    const drawGame = async () => {
      const res = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
      );
      const deckData = await res.json();
      setDeckDraw(deckData.cards);
    };

    if (cardsToggle) {
      drawGame();
      setInterval(() => {
        setCardsToggle(false)

      }, 4000)

    }
    // if (!cardsToggle) {

    // }
    // if (cardsToggle === false) {
    //   setBot(!bot)
    //   if (bot) {
    //     drawGame();
    //     setInterval(() => {
    //       setBot(false)

    //     }, 100)
    //   }


    // }


  }, [cardsToggle, deckId, bot])
  console.log("this is bot", bot);
  console.log(cardsToggle);


  const winerOrLoser = () => {
    let p1, p2;
    if (deckDraw) {
      p1 = deckDraw[0].value;
      p2 = deckDraw[1].value;
    }
    if (VALUES[p1] > VALUES[p2]) {
      // piles('mahmoud', deckDraw[0].code, deckDraw[1].code)

      return <h1>Player 1 wins</h1>
    } else if (VALUES[p2] > VALUES[p1]) {


      return <h1>Player 2 wins</h1>
    } else {
      return <h1>Draw</h1>
    }

  };

  return (
    <div className="container">
      <h1 className="heading">Deck of 52 cards</h1>
      <div className="main">
        <button className="button" onClick={() => setCardsToggle(!cardsToggle)}>
          Deal
        </button>
        {cardsToggle ? <h2>Player 1 turn</h2> : <h2>Bot Turn</h2>}
        <Card cardValues={deckDraw} />
        {winerOrLoser()}

      </div>
    </div>
  );
};

export default MainPage;
