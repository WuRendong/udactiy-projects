import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { gray, orange } from '../utils/colors'

class DeckItem extends Component {

	render() {
		const { title, number, onClick } = this.props

		return (
			<TouchableOpacity style={styles.deckItem} onPress={() => onClick(title)}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.subtitle}>{number} {number >1 ? 'cards' : 'card'}</Text>
			</TouchableOpacity>
		)
	}
}



const styles = StyleSheet.create({
	deckItem: {
		flexDirection: 'column',
		alignItems: 'center', 
		justifyContent: 'center',
		width: 300,
		height: 150,
		borderRadius: 4,
		shadowColor: gray,
		shadowOffset: {
			width: 10,
			height: 10
		},
		shadowRadius: 2,
		shadowOpacity: 4,
		backgroundColor: orange,
		margin: 10,
	},
	title: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold'
	},
	subtitle: {
		textAlign: 'center',
		fontSize: 16,
	}
})

export default DeckItem