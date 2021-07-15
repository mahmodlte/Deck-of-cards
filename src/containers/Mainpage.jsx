import { useState, useEffect } from "react";
import "../App.css";
import Card from "../components/Card/Card";
import { deckDraw, deckInit } from "../api/API";
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
const players = {
  remaining: 52,
  mahmoud: {
    remaining: 0,
  },
  bot: {
    remaining: 0,
  },
};
const MainPage = () => {
  const [cardsDraw, setCardsDraw] = useState();
  const [cardsToggle, setCardsToggle] = useState(false);
  const [result, setResult] = useState(-1);
  const [finalResult, setFinalResult] = useState(0);
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    deckInit();
  }, []);

  useEffect(() => {
    let abortContrller = new AbortController();
    if (cardsToggle) {
      deckDraw().then((deckData) => {
        setCardsDraw((prevState) => {
          prevState = deckData;
          return prevState;
        });
        setResult(winerOrLoser(deckData));
      });
      if (cardsDraw) {

        if (cardsDraw.remaining === 0) {
          setFinalResult(final());
          setDisabled(true)

        }
      }

      setInterval(() => {
        setCardsToggle(false);
      }, 100);
    }
    return () => {
      abortContrller.abort()
    }
  }, [cardsToggle, cardsDraw]);

  const winerOrLoser = (deckData) => {
    let p1, p2;
    if (deckData) {
      p1 = deckData.cards[0].value;
      p2 = deckData.cards[1].value;
    }
    if (VALUES[p1] > VALUES[p2]) {
      players.mahmoud.remaining += 2;

      return 1;
    } else if (VALUES[p2] > VALUES[p1]) {
      players.bot.remaining += 2;

      return 2;
    } else if (VALUES[p1] === VALUES[p2]) {
      return 0;
    }
  };
  const final = () => {
    if (players.mahmoud.remaining > players.bot.remaining) {
      return 1;
    } else if (players.bot.remaining > players.mahmoud.remaining) {
      return 2;
    }
  };
  console.log(cardsDraw.remaining)
  return (
    <div className="container">
      <h1 className="heading">Deck of 52 cards</h1>
      <div className="main">
        {/* This one counts the remaining races the one above by 2  */}
        {cardsDraw ? (
          <h2 className="result">remaining: {cardsDraw.remaining}</h2>
        ) : (
          console.log("no remaining ")
        )}
        <button className="button" disabled={disabled} onClick={() => setCardsToggle(!cardsToggle)}>
          Deal
        </button>
        <Card cardValues={cardsDraw} />

        {result === 0 ? (
          <h3>Tie</h3>
        ) : result === 1 ? (
          <h3>Player 1 scored</h3>
        ) : result === 2 ? (
          <h3>Player 2 scored</h3>
        ) : (
          ""
        )}

        <p>Player 1 remaining {players.mahmoud.remaining}</p>
        <p>Player 2 remaining {players.bot.remaining}</p>
        {finalResult === 1 && cardsDraw.remaining !== 52 ? (
          <p>Player 1 Wins the round</p>
        ) : finalResult === 2 && cardsDraw.remaining !== 52 ? (
          <p>Bot wins the round</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MainPage;
