import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import DeckList from './components/DeckList'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { purple, white } from './utils/colors'
import { TabNavigator, StackNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import CardList from './components/CardList'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import Deck from './components/Deck'
import Quiz from './components/Quiz'
import Score from './components/Score'
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { setLocalNotification } from './utils/helpers'
import { Constants } from 'expo'


function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tab = createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: "Deck List",
      tabBarIcon: ({tintColor}) => <Ionicons name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'} size={30} color={tintColor}/>
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "Add Deck",
      tabBarIcon: ({tintColor}) => <MaterialIcons name='create-new-folder' size={30} color={tintColor}/>
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tab,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
    }),
  },
  Deck: {
    screen: Deck,
     navigationOptions: ({ navigation }) => ({
      title: 'Deck',
    }),   
  },
  Cards: {
    screen: CardList,
    navigationOptions: ({ navigation }) => ({
      title: 'Card List',
    }),
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: ({ navigation }) => ({
      title: 'Add Card',
    }),
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      title: 'Quiz',
    }),
  },
  Score: {
    screen: Score,
    navigationOptions: ({ navigation }) => ({
      title: 'Score',
    }),
  }
},
{
    initialRouteName: 'Home',
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
           <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center',
  },
});
