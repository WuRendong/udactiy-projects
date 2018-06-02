'use strict';

import React, { Component } from 'react';
import Card from './Card'

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

class CardList extends Component {
  render() {
  	const { title, cards } = this.props.navigation.state.params
    return (
      <View style={styles.body}>
      	<Text style={styles.title}>{title}</Text>
        {
          cards.length === 0 &&
          <Text>No card yet, please create one first!</Text>
        }
      	{cards.map((card) => (
          <Card
            key={card.question}
            question={card.question}
            answer={card.answer}
          />
      	))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    justifyContent: 'center', 
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,  
  }
});


export default CardList;