export const KEY_CARDS_STORAGE = 'UdaciCards:Card'


const dummyData = {
  React: {
    title: 'React',
    cards: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    cards: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  Python: {
    title: 'Python',
    cards: [
      {
        question: 'What is Python?',
        answer: 'A program language'
      }
    ]
  },
  Java: {
    title: 'Java',
    cards: [
      {
        question: 'What is Java?',
        answer: 'A program language'
      }
    ]
  }
}

function setDummyData() {
	return dummyData
}

export function formatCardsResult(results) {
	return results === null ? setDummyData() : JSON.parse(results)
}