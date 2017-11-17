import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  Platform,
  StatusBar,
  FlatList,
  Alert,
  Button
} from 'react-native';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import {TabNavigator, StackNavigator} from 'react-navigation'
//import cards from './assets/flashcards_icon_dark.png'
import decksLocal from './assets/decks'
import {Constants} from 'expo'
import {FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'

const FLASHCARDS_STORAGE_KEY = 'FLASHCARDS_STORAGE:key'
const blue = '#2b8bb8'
const tintColor = '#1955e8'

const SingleDeck = ({navigation, screenProps}) => (
  <View style={styles.container}>
    <View style={styles.container}>
      { console.log(screenProps.decks)}
      <MaterialCommunityIcons name='cards-outline' size={130} color={tintColor}/>
      <Text style={styles.heading}>  {navigation.state.params.aDeck.title} </Text>
      <Text> {navigation.state.params.aDeck.questions && navigation.state.params.aDeck.questions.length} Cards </Text>


      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DeckList', {user: ' No User '})}>
        <Text style={styles.buttonText}> <MaterialCommunityIcons name='clock-start' size={20} color='#ffffff'/> Start
          Quiz </Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.button}
        onPress={() => screenProps.addNewCard()}>
        <Text style={styles.buttonText}> <MaterialIcons name='library-add' size={20} color='#ffffff'/> Add questions to
          deck </Text>
      </TouchableOpacity>
    </View>
  </View>
);


class  AddADeck extends React.Component {
  state= {
    deckName:""
  }


  render(){
    const { navigation , screenProps } = this.props
    const { deckName } =this.state
        return(
      <KeyboardAvoidingView behavior="padding" style={styles.container} keyboardVerticalOffset={50} >
        <MaterialCommunityIcons name='cards-outline' size={130} color={tintColor}/>
        <Text style={styles.heading} >
          {deckName}
        </Text>


        <TextInput
          style={{height: 40, width: 280, borderColor: tintColor}}
          onChangeText={( deckName ) => this.setState({deckName})}
          placeholder='Enter Deck Name  '
          value={deckName}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => { screenProps.addNewDeck( deckName), this.setState({ deckName : ''}), navigation.navigate('SingleDeck', {aDeck : {title: deckName, questions: []}})} }>
          <Text style={styles.buttonText}> <MaterialIcons name='library-add' size={20} color='#ffffff'/> Add deck </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

class Decks extends React.Component {
  showMe = (aDeck) => this.props.navigation.navigate('SingleDeck', {aDeck})

  renderItem = ({item}) => (
    <TouchableOpacity onPress={() => this.showMe(item)}>
      <View style={styles.container}>
        <MaterialCommunityIcons name='cards-outline' size={80} color={tintColor}/>
        <Text style={styles.heading}>  {item.title} </Text>
        <Text> {item.questions && item.questions.length} Cards </Text>
      </View>
    </TouchableOpacity>
  )


  render() {
    return (
      <View>
        <FlatList
          extraData={this.props.screenProps}
          data={Object.values(Object.values(this.props.screenProps)[0])}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}

export default class App extends React.Component {

  state = {
    allDecks: {}
  }


  addNewDeck = ( deckName ) => {
    const _deck = {[deckName.replace(/\s+/g, '')]: {title: deckName, questions: []}, ...this.state.allDecks}
    this.setState({allDecks: _deck}),
    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(_deck))  }

  addNewCard = () => {
    const _card = {
      ...this.state.allDecks,
      ['Technology']: {
        ...this.state.allDecks['Technology'],
        ['questions']: [...this.state.allDecks['Technology']['questions'], {
          question: "What is a Going?",
          answer: "Means of transportation"
        }]
      }
    }
    this.setState({allDecks: _card}), AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(_card))
  }


  componentDidMount() {
    AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then((value) => {
      // if (value === null) {
      //   AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decksLocal));
      // }
      this.setState({allDecks: JSON.parse(value)})
    })
  }
  render() {
    return (
      //<Provider store={createStore(reducer)}>
      <View style={{flex: 1}}>
        <FlashStatusBar backgroundColor={blue} barStyle="light-content"/>
        <Stack screenProps={{decks: this.state.allDecks, addNewDeck: this.addNewDeck, addNewCard: this.addNewCard}}/>
      </View>
      // </Provider>
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
      header: null,
    },
  },

})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#0e050b'
  },
  heading: {
    fontSize: 25,
    textAlign: 'center',

  },
  button: {
    marginBottom: 15,
    marginTop: 15,
    width: 260,
    alignItems: 'center',
    backgroundColor: tintColor
  },
  buttonText: {
    padding: 10,
    color: 'white'
  }
});
