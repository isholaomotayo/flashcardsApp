import React from 'react';
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  Alert
} from 'react-native';
import {MaterialCommunityIcons, MaterialIcons, FontAwesome} from '@expo/vector-icons'
import {blue, tintColor, styles} from "../styles"
import {clearNotification, setNotification} from "./notifications"

export class Quiz extends React.Component {

  state = {
    opacity: new Animated.Value(0),
    scale: new Animated.Value(1),
    right: 0,
    wrong: 0,
    activeQuiz: [],

  }

  static navigationOptions = ({navigation}) => ({
    headerTitle: `${navigation.state.params.deckName} Quiz`
  })

  componentDidMount() {
    const {deckName} = this.props.navigation.state.params
    const deckKey = deckName.replace(/\s+/g, '')


    clearNotification().then(setNotification)

    const {scale} = this.state
    Animated.timing(this.state.opacity, {toValue: 1, duration: 2500}).start()
    Animated.sequence([
      Animated.timing(scale, {duration: 200, toValue: 1.01}),
      Animated.spring(scale, {toValue: 1, friction: 8, tension: 80})
    ]).start()


    this.setState({activeQuiz: this.props.screenProps['decks'][[deckKey]]['questions']})

  }


  render() {
    const {navigation, screenProps} = this.props
    const {scale, right, wrong, activeQuiz} = this.state
    const {deckName} = navigation.state.params
    const deckKey = deckName.replace(/\s+/g, '')

    const correct = () => {
      this.setState({activeQuiz: activeQuiz.slice(1)}) , this.setState({right: this.state.right + 1})
    }
    const incorrect = () => {
      this.setState({activeQuiz: activeQuiz.slice(1)}) , this.setState({wrong: this.state.right + 1})
    }

    return (
      <Animated.View style={[styles.container, {transform: [{scale}]}]}>

        <View style={styles.container}>
          <FontAwesome name='question-circle-o' size={40} color={tintColor}/>
          <Text style={styles.heading}>{deckName} Questions </Text>
          <Text style={{
            fontSize: 17,
            color: '#f3000f'
          }}> {activeQuiz.length > 0 ? ` ${activeQuiz.length} Questions Remaining ` :(right !== 0 && wrong !== 0 ) && ` Results`}</Text>
          {activeQuiz.length === 0 &&
          <View style={styles.container}>
            {(right === 0 && wrong === 0 ) ?
              <Text style={{fontSize: 19, color: '#000000', textAlign: 'center'}}> There are no cards in this deck
                yet</Text>
              :
              <Text style={{fontSize: 19, color: '#000000', textAlign: 'center'}}> You
                Scored {(right / (right + wrong)) * 100} %</Text>
            }
            {(right !== 0 && wrong !== 0 ) &&

            < Text style={{fontSize: 19, color: '#f3003f', textAlign: 'center'}}>{wrong} answers were wrong</Text>}
            {(right !== 0 && wrong !== 0 ) &&< Text style={{fontSize: 19, color: '#000000', textAlign: 'center'}}> and</Text>}
            {(right !== 0 && wrong !== 0 ) &&  <Text style={{fontSize: 19, color: '#2a7e43', textAlign: 'center'}}> {right} answers were right</Text>}


            <View style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
              <TouchableOpacity
                style={[styles.smallButton, {height: 40, margin: 10}]}
                onPress={() => navigation.navigate('SingleDeck', {aDeck : screenProps['decks'][[deckKey]]})}>

                <Text style={styles.buttonText}> Go To Deck </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.smallButton, {height: 40, margin: 10}]}
                onPress={() => this.setState({activeQuiz: screenProps['decks'][[deckKey]]['questions']})}>
                <Text style={styles.buttonText}> Restart Quiz </Text>
              </TouchableOpacity>
            </View>
          </View>}


          <Text style={{fontSize: 20, margin: 10}}> {activeQuiz[0] && activeQuiz[0].question} </Text>
          {activeQuiz.length > 0 &&
          <TouchableOpacity
            style={[styles.button,]}
            onPress={() => {
              Alert.alert(
                `Question :  ${activeQuiz[0] && activeQuiz[0].question}`,
                `Answer :   ${activeQuiz[0] && activeQuiz[0].answer} `,
                [
                  {text: 'Correct', onPress: () => correct()},
                  {text: 'Incorrect', onPress: () => incorrect()},
                  {text: 'OK',},
                ],
                {cancelable: true}
              )
            }}
          >
            <Text style={styles.buttonText}> Show answer </Text>
          </TouchableOpacity>
          }
          {activeQuiz.length > 0 &&
          <View style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
            <TouchableOpacity
              style={[styles.smallButton, {height: 40, margin: 10}]}
              onPress={() => correct()}>

              <Text style={styles.buttonText}> Correct </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.smallButton, {height: 40, margin: 10, backgroundColor: '#870000'}]}
              onPress={() => incorrect()}>
              <Text style={styles.buttonText}> Incorrect </Text>
            </TouchableOpacity>
          </View>}
        </View>
      </Animated.View>
    )
  }

}

