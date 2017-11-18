import React from 'react';
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {MaterialCommunityIcons, MaterialIcons,FontAwesome } from '@expo/vector-icons'
import {blue, tintColor, styles} from "../styles"
import { clearNotification, setNotification } from "./notifications"



export class Quiz extends React.Component {

  state = {
    opacity: new Animated.Value(0),
    scale: new Animated.Value(1)
  }

  componentDidMount() {
  clearNotification()
    .then( setNotification)
    const {scale} = this.state
    Animated.timing(this.state.opacity, {toValue: 1, duration: 2500}).start()
    Animated.sequence([
      Animated.timing(scale, {duration: 200, toValue: 1.01}),
      Animated.spring(scale, {toValue: 1, friction: 8, tension:80 })
    ]).start()

    setNotification()
  }


  render() {
    const {navigation, screenProps} = this.props
    const {scale} = this.state
    return (
      <Animated.View style={[styles.container, {transform: [{scale}]}]}>
        <View style={styles.container}>
          <FontAwesome name='question-circle-o' size={40} color={tintColor}/>
          <Text style={styles.heading}> Questions </Text>
          <Text> Remaining Questions</Text>
          <Text> {JSON.stringify( screenProps['decks'][[this.props.navigation.state.params.deckName]])} </Text>


          <TouchableOpacity
            style={[styles.button,]}
            onPress={() => navigation.navigate('DeckList', {user: ' No User '})}
          >
            <Text style={styles.buttonText}> Show answer </Text>
          </TouchableOpacity>

          <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
            <TouchableOpacity
              style={[styles.smallButton,{ height: 40, margin:10  }]}
              onPress={() => navigation.navigate('AddNewQuestion', {user: ' No User '})}>
              <Text style={styles.buttonText}> Correct </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.smallButton, {height: 40, margin:10 , backgroundColor: '#870000'}]}
              onPress={() => navigation.navigate('AddNewQuestion', {user: ' No User '})}>
              <Text style={styles.buttonText}> Incorrect </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    )
  }

}

