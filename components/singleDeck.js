import React from 'react';
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'
import {blue, tintColor, styles} from "../styles"


export class SingleDeck extends React.Component {

  state = {
    opacity: new Animated.Value(0),
    scale: new Animated.Value(1)
  }
  static navigationOptions =  ({ navigation }) => ({
  headerTitle: navigation.state.params.aDeck.title, })


    componentDidMount() {

    const {scale} = this.state
    Animated.timing(this.state.opacity, {toValue: 1, duration: 2500}).start()
    Animated.sequence([
      Animated.timing(scale, {duration: 200, toValue: 1.04}),
      Animated.spring(scale, {toValue: 1, friction: 4})
    ]).start()
  }
  render() {
    const {navigation, screenProps} = this.props
    const { aDeck } = this.props.navigation.state.params
    const {scale} = this.state
    const currentDeck = screenProps['decks'][aDeck.title.replace(/\s+/g, '')]
    return (
      <Animated.View style={[styles.container, {transform: [{scale}]}]}>
        <View style={styles.container}>
          <MaterialCommunityIcons name='cards-outline' size={130} color={tintColor}/>
          <Text style={styles.heading}>  {currentDeck['title']} </Text>
          <Text> {aDeck.questions && currentDeck.questions.length} Cards </Text>
          { (aDeck.questions && currentDeck.questions.length !== 0 ) &&
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Quiz', {deckName: aDeck.title})}>
            <Text style={styles.buttonText}>
              <MaterialCommunityIcons name='clock-start' size={20} color='#ffffff'/>
              Start Quiz </Text>
          </TouchableOpacity>

          }
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AddNewQuestion', {deckName: aDeck.title})}>
            <Text style={styles.buttonText}>
              <MaterialIcons name='library-add' size={20} color='#ffffff'/>
              Add questions to deck </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    )
  }

}

