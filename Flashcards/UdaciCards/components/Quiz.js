import React, { Component } from 'react';
import { connect } from 'react-redux'
import Card from './Card'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { white, red, blue, gray } from '../utils/colors'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

class Quiz extends Component {
  state={
  	currentIndex: 0,
    currentAnswer: '',
    results: {},
    finished: false,
  }

  componentDidUpdate() {
    // window.alert(":---: " + JSON.stringify(this.state))
    const { finished } = this.state
    if (finished) {
      // go to score
      const { results } = this.state
      const { decks } = this.props
      const { title } = this.props.navigation.state.params

      const cards = decks[title].cards
      const total = cards.length
      const corrects = Object.keys(results).filter((key) => (results[key] === true))
      const score = corrects.length + '/' + total
      this.props.navigation.navigate('Score', { score: score  });
      this.setState({
        currentIndex: 0,
        currentAnswer: '',
        results: {},
        finished: false,
      })

      clearLocalNotification().then(setLocalNotification)
    }
  }

  answer = (answer) => {
    const { title } = this.props.navigation.state.params
    const { decks } = this.props

    const cards = decks[title].cards
    const total = cards.length
    const { currentIndex } = this.state

    this.setState({
      currentAnswer: answer,
      results: {...this.state.results, [currentIndex]: cards[currentIndex].answer === answer },
      currentIndex: ((this.state.currentIndex + 1) >= total ? this.state.currentIndex :  (this.state.currentIndex + 1)),
      finished: currentIndex + 1 >= total
    })

    // const { results } = this.state
    // window.alert(": : " + JSON.stringify(this.state))


  }

  correct = () => {
    this.answer('Yes')
  }

  incorrect = () => {
    this.answer('No')
  }

  previous = () => {
    // go to previous
    this.setState({
      currentIndex: (this.state.currentIndex - 1) < 0 ? 0: (this.state.currentIndex - 1)
    })
  }

  render() {
  	const { title } = this.props.navigation.state.params
    const { decks } = this.props
    const cards = decks[title].cards

  	const { currentIndex } = this.state
  	const card = cards[currentIndex]
    const total = cards.length
    const index = (currentIndex + 1) + '/' + total
    return (
      <View style={styles.body}>
        <View style={styles.header}>
      	  <Text style={styles.headerText}>{title}</Text>
          <Text style={styles.subHeaderText}>{index}</Text>
        </View>
      	<Card
          style={styles.card}
          question={card.question}
          answer={card.answer}
      	/>
      	<TouchableOpacity style={[styles.btnStyle, {backgroundColor: blue}]} onPress={this.correct}>
      		<Text style={styles.btnText}>Correct</Text>
      	</TouchableOpacity>
      	<TouchableOpacity style={styles.btnStyle} onPress={this.incorrect}>
      		<Text style={styles.btnText}>Incorrect</Text>
      	</TouchableOpacity>
        {
          currentIndex > 0 &&
            <TouchableOpacity style={styles.btnStyle} onPress={this.previous}>
              <Text style={styles.btnText}>Previous</Text>
            </TouchableOpacity>
          }
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center' 
	},
  header: {
    alignItems: 'center', 
  },
  card: {
    marginTop: 100,
    backgroundColor: gray,
  },
	headerText: {
		fontSize: 30,
	},
  subHeaderText: {
    fontSize: 16,
    color: gray,
  },
	btnStyle: {
		width: 200,
		height: 50,
		backgroundColor: red,
		margin: 10, 
		borderRadius: 8,
	},
	btnText: {
		textAlign: 'center',
		color: white,
		padding: 10,
		fontSize: 20, 
	}
});

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Quiz);