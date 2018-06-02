import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, TextInput, TouchableOpacity,StyleSheet } from 'react-native'
import { gray, lightPurp, red, white } from '../utils/colors'
import { getDeck, saveData } from '../utils/api'
import { addDeck } from '../actions'
import { NavigationActions } from 'react-navigation'

class AddDeck extends Component {
    state =  {
		deckName: ''
	}

	submit = () => {
        const { deckName } = this.state

        if ( deckName === null || deckName === '' ) {
        	window.alert('Deck name cannot be empty')
        	return
        }

		const { decks } = this.props
		const deck = decks[deckName]
		if (deck === null || deck === undefined) {
			saveData(deckName, {title: deckName, cards: []})
			this.props.dispatch(addDeck(deckName, {
					title: deckName,
					cards: []
				}
			))
		} else {
			window.alert("Already exist!")
		}

		this.setState({
			deckName: ''
		})

		// to deck list
		this.toHome(deckName)
	}

	toHome = (deckName) => {
    	this.props.navigation.navigate('Deck', { title: deckName })
    }

	render() {
	  

	  return (
	  	  <View style={styles.body}>
	  	  	<Text style={styles.header}>New Deck</Text>
	  	  	<View style={styles.card}>
		      <TextInput
		        style={styles.textInput}
		        onChangeText={(text) => this.setState({deckName: text})}
		        value={this.state.deckName}
		        placeholder="Deck name"
		      />
	      	</View>
	      	<TouchableOpacity style={styles.submitBtn} onPress={this.submit}>
				<Text style={styles.btnText}>Submit</Text>
	      	</TouchableOpacity>
	      </View>
      )
	}
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',  
	},
	header: {
		fontSize: 40
	},
	card: {
		justifyContent: 'center',
		alignItems: 'center',  
		backgroundColor: lightPurp,
		width: 300,
		height: 200,
		borderRadius:8,
		marginTop: 100,
		marginBottom: 100,
	},
	textInput: {
		width: 250,
		borderBottomWidth: 1,
		borderBottomColor: '#000000',
	},
	submitBtn: {
		width: 200,
		height: 50,
		backgroundColor: red,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnText: {
		color: white
	}
})

function mapStateToProps(decks) {
	return {
		decks
	}
}

export default connect(mapStateToProps)(AddDeck)