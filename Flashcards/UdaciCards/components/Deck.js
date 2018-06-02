'use strict';

import React, { Component } from 'react';
import { purple, white, gray, orange, pink } from '../utils/colors'
import { connect } from 'react-redux'

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

class Deck extends Component {

  toCardList = () => {
  	const { title } = this.props.navigation.state.params
  	const { decks } = this.props
  	const cards = decks[title].cards
  	this.props.navigation.navigate('Cards', {title: title, cards: cards})
  }

  toAddCard = () => {
  	const { title } = this.props.navigation.state.params
  	this.props.navigation.navigate('AddCard', {title: title})
  }

  toQuiz = () => {
  	const { title } = this.props.navigation.state.params
  	const { decks } = this.props
  	const cards = decks[title].cards
  	if (cards.length > 0) {
  		this.props.navigation.navigate('Quiz', {title: title, cards: cards})
  	} else {
  		window.alert("Sorry! Please add cards to have a quiz.")
  	}
  }

  render() {
  	const { title } = this.props.navigation.state.params
  	const { decks } = this.props
  	const cards = decks[title].cards
    return (
      <View>
	      <View style={styles.deckInfoPanel}>
	      	<Text style={styles.title}>{title} </Text>
	      	<Text style={styles.subtitle}>{cards.length} Cards</Text>
	      </View>
	      <View style={styles.btnPanel}>
	      	<TouchableOpacity style={styles.checkBtn} onPress={this.toCardList}>
	      		<Text style={styles.btnText}>Check Cards</Text>
	      	</TouchableOpacity>
	      	<TouchableOpacity style={styles.addCardBtn} onPress={this.toAddCard}>
	      		<Text style={styles.btnText}>Add Card</Text>
	      	</TouchableOpacity>
	      	<TouchableOpacity style={styles.startQuizBtn} onPress={this.toQuiz}>
	      		<Text style={styles.btnText}>Start Quiz</Text>
	      	</TouchableOpacity>
	      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	deckInfoPanel: {
		alignItems: 'center',
		marginTop: 50
	},
	title: {
		fontSize: 40,
		fontWeight: 'bold',
		padding: 10
	},
	subtitle: {
		fontSize: 20,
		color: gray, 
		padding: 10
	},
	btnPanel: {
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: 200,
	},
	checkBtn: {
		width: 200,
		height: 50,
		backgroundColor: purple,
		margin: 10,
		borderRadius: 4
	},
	addCardBtn: {
		width: 200,
		height: 50,
		backgroundColor: orange,
		margin: 10,
		borderRadius: 4
	},
	startQuizBtn: {
		width: 200,
		height: 50,
		backgroundColor: pink,
		margin: 10,
		borderRadius: 4
	},
	btnText: {
		fontSize: 20,
		color: white,
		textAlign: 'center',
        padding: 10,
		borderRadius: 4
	}
});

function mapStateToProps(decks) {
	return {
		decks
	}
}

export default connect(mapStateToProps)(Deck);