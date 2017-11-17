//export const ADD_POST='ADD_POST'
export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'


export const addCard = (card , deck) =>
  ({type: ADD_CARD, card, deck})

export const addDeck = ( deck) =>
  ({type: ADD_DECK, deck})




