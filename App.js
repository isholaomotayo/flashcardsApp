import React from 'react';
import {
  AsyncStorage,
  View,
  Platform,
  StatusBar,
  Animated
} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation'
import decksLocal from './assets/decks'
import {Constants} from 'expo'
import {FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'
import { blue, tintColor, styles } from "./styles"

import { AddADeck } from './components/addDeck'
import  { SingleDeck }from './components/singleDeck'
import { Decks } from './components/Decks'
import { AddNewQuestion } from './components/AddNewQuestion'
import  { Quiz } from './components/Quiz'
import { setNotification} from "./components/notifications"

const FLASHCARDS_STORAGE_KEY = 'FLASHCARDS_STORAGE:key'

export default class App extends React.Component {

  state = {
    allDecks: {},
    opacity: new Animated.Value(0)
  }

  addNewDeck = (deckName) => {
    const _deck = {[deckName.replace(/\s+/g, '')]: {title: deckName, questions: []}, ...this.state.allDecks}
    this.setState({allDecks: _deck}),
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(_deck))
  }
deleteDeck = ( deckName ) => {
    let copy = Object.assign({}, this.state.allDecks)
delete copy[[ deckName.replace(/\s+/g, '')]]
 AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(copy))
    .then(this.setState({ allDecks: copy}))
}

  addNewCard = ( question , deckKey) => {

    const _card = {
      ...this.state.allDecks,
      [deckKey]: {
        ...this.state.allDecks[deckKey],
        ['questions']: [...this.state.allDecks[deckKey]['questions'], question]
      }
    }
    this.setState({allDecks: _card})
    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(_card))
  }

  componentDidMount() {
    setNotification()

    AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then((value) => {
      if (value === null) {
        AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decksLocal)) // load starter deck
          .then(this.setState({allDecks: decksLocal}))

      }else {
        this.setState({allDecks: JSON.parse(value)})
      }
      Animated.timing(this.state.opacity, {toValue: 1, duration: 500}).start()
    })
  }

  render() {
    return (
      <Animated.View style={{flex: 1, opacity: this.state.opacity}}>
        <FlashStatusBar backgroundColor={blue} barStyle="light-content"/>
        <Stack screenProps={{decks: this.state.allDecks, addNewDeck: this.addNewDeck, addNewCard: this.addNewCard, deleteDeck: this.deleteDeck }}/>
      </Animated.View>

    );
  }
}

FlashStatusBar = ({backgroundColor, ...props}) => (
  <View style={{backgroundColor, height: Constants.statusBarHeight}}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'All Decks',
      tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor}/>
    },
  },
  NewDeck: {
    screen: AddADeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
    },
  },

}, {
  navigationOptions: {
    header: null,
  }
});

const Stack = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckList: {
    screen: Decks,
    navigationOptions: {
      header: null,
    },
  },
  SingleDeck: {
    screen: SingleDeck,
    navigationOptions: {
      headerStyle: { backgroundColor: blue },
      headerTintColor: '#ffffff',
      title:'Deck'
    },
     },

  AddNewQuestion: {
    screen: AddNewQuestion,
    navigationOptions: {
      headerStyle: { backgroundColor: blue },
      headerTintColor: '#ffffff',
      title:'Add a Question'
    },

  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerStyle: { backgroundColor: blue },
      headerTintColor: '#ffffff',
      title :'Start Quiz'
    },
  },

})
