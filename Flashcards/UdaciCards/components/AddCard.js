import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { lightPurp, red, white } from '../utils/colors'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { NavigationActions } from 'react-navigation'
import { saveData, getDeck } from '../utils/api'

class AddCard extends Component {

	state = {
		question: '',
		answer: ''
	}

	submit = () => {
		const { title } = this.props.navigation.state.params
		this.props.dispatch(addCard(title, {question: this.state.question, answer: this.state.answer}))
		
		getDeck(title).then(deck => {
			if (deck === null || deck === undefined) {
				deck = {title: title, cards: {question: this.state.question, answer: this.state.answer}}
			} else {
				deck.cards.push({question: this.state.question, answer: this.state.answer})
			}

			saveData(title, deck)
		})

		this.toDeck()
	}

	toDeck = () => {
		this.props.navigation.dispatch(NavigationActions.back())
	}

	render() {
		const { title } = this.props.navigation.state.params
		return(<View style={styles.body}>
			<Text style={styles.header}>New Card</Text>
			<Text style={styles.subheader}>{title}</Text>
			<View style={styles.card}>
				<View>
					<Text>Question: </Text>
					<TextInput
						style={styles.textInput}
						placeholder="Input Question"
					    onChangeText={(text) => this.setState({question: text})}
		        		value={this.state.question}
					/>
				</View>
				<View>
					<Text>Answer: </Text>
					<TextInput
						style={styles.textInput}
						placeholder="Input Answer"
					    onChangeText={(text) => this.setState({answer: text})}
		        		value={this.state.answer}
					/>
				</View>
			</View>
			<TouchableOpacity style={styles.submitBtn} onPress={this.submit}>
				<Text style={styles.btnText}>Submit</Text>
			</TouchableOpacity>
		</View>)
	}
}

const styles=StyleSheet.create({
	header: {
		fontSize: 30,
		textAlign: 'center',
	},
	subheader: {
		fontSize: 20,
		textAlign: 'center',
	},
	body: {
		flex: 1,
 		justifyContent: 'center',
 		alignItems: 'center', 
	},
	card: {
		width: 300,
		backgroundColor: lightPurp,
		justifyContent: 'center' ,
		alignItems: 'center',
		marginVertical: 100,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 20,
		paddingBottom: 20,
		borderRadius: 8,
		shadowOpacity: 4,
	},
	textInput: {
		height: 40,
		width: 250,
		borderBottomColor: '#000000', 
		borderBottomWidth: 1
	},
	submitBtn: {
		backgroundColor: red,
		width: 200,
		height: 50,
		borderRadius: 6, 
	},
	btnText: {
		fontSize: 20,
		borderColor: white,
		textAlign: 'center',
		padding: 10,
		color: white,
	}
})

function mapStateToProps(decks) {
	return {
		decks
	}
}

export default connect(mapStateToProps)(AddCard)