import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'
import { fetchAllDecks, clearAll } from '../utils/api'
import { receiveDecks } from '../actions'
import DeckItem from './DeckItem'
import { purple } from '../utils/colors'

class DeckList extends Component {

	state = {
		bounceValue: new Animated.Value(1),
		selectedTitle: ''
	}

	componentDidMount() {
		const { dispatch } = this.props
		fetchAllDecks().then((decks) => {
			dispatch(receiveDecks(decks))
		}).catch(function(error) {
			console.log('There has been a problem with your fetch operation: ' + error.message);
 			// ADD THIS THROW error
  			throw error;
		});
	}

	clickItem = (title)=> {
		const { decks } = this.props
		const { bounceValue } = this.state
		this.props.navigation.navigate('Deck', {title: title})

		Animated.sequence([
           Animated.timing(bounceValue, { duration: 400, toValue: 0.4}),
           Animated.spring(bounceValue, { toValue: 1, friction: 1})
         ]).start()
		
		// this.setState({
		// 	selectedTitle: title
		// })
	}

	render() {
		const { decks } = this.props
		const { bounceValue} = this.state
		return (
			<ScrollView contentContainerStyle={{alignItems: 'center' }}>
				{Object.keys(decks).map((name) => {
					
					return (
						<Animated.View key={name} style={{transform: [{scale: bounceValue}]}}>
							<DeckItem
								title={name}
								number={decks[name].cards.length}
								onClick={this.clickItem}
							/>
						</Animated.View>
						)
				})}
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({

})

function mapStateToProps(decks) {
	return {
		decks
	}
}

export default connect(mapStateToProps)(DeckList)