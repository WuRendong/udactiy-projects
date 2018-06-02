'use strict';

import React, { Component } from 'react';
import { lightPurp } from '../utils/colors'

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

class Card extends Component {
  state = {
  	showAnswer: false
  }

  toggle = () => {
  	const { showAnswer } = this.state
  	this.setState({
  		showAnswer: !showAnswer
  	})
  }

  render() {
  	const { question, answer } = this.props
    return (
      <TouchableOpacity style={styles.card} onPress={this.toggle}>
      	{this.state.showAnswer
      		? (<View>
      				<Text style={styles.cardTitle}>Answer</Text>
      				<Text style={styles.cardText}>{answer}</Text>
      			</View>)
      		: (<View>
      				<Text style={styles.cardTitle}>Question</Text>
      				<Text style={styles.cardText}>{question}</Text>
      			</View>)
      	}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
	card: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
		backgroundColor: lightPurp,
		height: 150,
		width: 300,
		margin: 10, 
	},
	cardTitle: {
		fontSize: 25,
		textAlign: 'center',
		margin: 5,
		fontWeight: 'bold', 
	},
	cardText: {
		fontSize: 20,
    textAlign: 'center',
    padding: 10,
    margin: 10,
	}
});


export default Card;