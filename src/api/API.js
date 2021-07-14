const BASE_URL = "https://deckofcardsapi.com/api/deck";
const NEW_DECK = BASE_URL + "/new/shuffle/?deck_count=1";

const fetchData = (...args) => fetch(...args).then((res) => res.json());
let deckId = null;
export const deckInit = () => {
  return fetchData(NEW_DECK).then((res) => {
    deckId = res.deck_id;
    return deckId;
  });
};
export const deckDraw = (count = 2) => {
  return fetchData(BASE_URL + `/${deckId}/draw/?count=${count}`).then(
    (res) => res
  );
};
export const piles = (pileName, card1, card2) => {
  return fetchData(
    BASE_URL + `/${deckId}/pile/${pileName}/add/?cards=${card1},${card2}`
  ).then((res) => res);
};
