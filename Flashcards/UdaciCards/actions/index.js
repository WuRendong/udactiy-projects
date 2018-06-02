export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_CARD = 'REMOVE_CARD'
export const REMVOE_DECK = 'REMOVE_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'

export function addDeck(deckName, deck) {
	return {
		type: ADD_DECK,
		deckName,
		deck
	}
}

export function addCard(deckName, card) {
	return {
		type: ADD_CARD,
		deckName,
		card
	}
}

export function removeDeck(deckName) {
	return {
		type: ADD_DECK,
		deckName
	}
}

export function removeCard(deckName, cardId) {
	return {
		type: ADD_DECK,
		deckName,
		cardId
	}
}

export function receiveDecks(decks) {
	return {
		type: RECEIVE_DECKS,
		decks
	}
}