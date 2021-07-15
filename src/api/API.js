const BASE_URL = "https://deckofcardsapi.com/api/deck";
const NEW_DECK = BASE_URL + "/new/shuffle/?deck_count=1";

const fetchData = (...args) => fetch(...args).then((res) => res.json());
let deckId = null;
export const deckInit = async () => {
  try {
    const res = await fetchData(NEW_DECK);
    deckId = res.deck_id;
    return deckId;
  } catch (err) {
    console.log(err);
  }
};

export const deckDraw = async (count = 2) => {
  const res = await fetchData(BASE_URL + `/${deckId}/draw/?count=${count}`);
  return res;
};
