import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, REMOVE_CARD, REMOVE_DECK } from '../actions'

function cards(state = {}, action) {
	switch(action.type) {
		case RECEIVE_DECKS:
			return {
				...state,
				...action.decks
			}
		case ADD_DECK:
			return {
				...state,
				[action.deckName]: action.deck
			}
		case REMOVE_DECK:
			return {
				...state,
				[deckName]: null
			}
		case ADD_CARD:
			return {
				...state,
				[action.deckName]: {
					...state[action.deckName],
					cards: [...state[action.deckName].cards, action.card]
				}
			}
		case REMOVE_CARD:
			return {
				...state,
				[action.deckName]: {
					...state[action.deckName],
					cards: {
						...state[action.deckName].cards,
						[action.cardId]: null
					}
				}
			}
	}

	return state
}

export default cards