import { AsyncStorage } from 'react-native'
import { KEY_CARDS_STORAGE, formatCardsResult } from './_cards'

export function fetchAllDecks() {
	return AsyncStorage.getItem(KEY_CARDS_STORAGE).then(formatCardsResult)
}

export function getDeck(title) {

	return AsyncStorage.getItem(KEY_CARDS_STORAGE).then((data) => (
		JSON.parse(data)
	)).then((decks) => (decks[title]))

}

export function saveData(title, deckData) {
	AsyncStorage.mergeItem(KEY_CARDS_STORAGE, JSON.stringify({
		[title]: deckData
	}))
}

export function clearAll() {
	AsyncStorage.clear();
}

export function removeDeck() {

}

export function removeCard() {

}