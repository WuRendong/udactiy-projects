'use strict';

import React, { Component } from 'react';
import { lightPurp, white, black, orange } from '../utils/colors'

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

class Score extends Component {

  retry = () => {
  	this.props.navigation.navigate('Quiz')
  }

  back = () => {
	this.props.navigation.navigate('Deck')
  }

  render() {
  	const { score } = this.props.navigation.state.params

    return (
      <View style={styles.body}>
      	<Text style={styles.header}>Score: {score}</Text>
      	<TouchableOpacity style={styles.retryBtn} onPress={this.retry}>
      		<Text style={styles.btnText}>Retry</Text>
      	</TouchableOpacity>
      	<TouchableOpacity style={styles.backBtn} onPress={this.back}>
      		<Text style={styles.btnText}>Back</Text>
  		</TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	header: {
		fontSize: 40,
		textAlign: 'center',
		color: orange,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 100,
	},
	backBtn: {
		width: 200,
		height: 50,
		borderRadius: 8,
		backgroundColor: lightPurp,
		alignItems: 'center',
		justifyContent: 'center',
	},
	retryBtn: {
		width: 200,
		height: 50,
		borderRadius: 8,
		backgroundColor: lightPurp,
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 20,
	},
	btnText: {
		fontSize: 20,
		color: white
	}
});


export default Score;