
import React from 'react';
import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'
import { blue, tintColor, styles } from "../styles"

export class AddADeck extends React.Component {
  state = {
    deckName: ""
  }

  render() {
    const {navigation, screenProps} = this.props
    const {deckName} = this.state
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container} keyboardVerticalOffset={50}>
        <MaterialCommunityIcons name='cards-outline' size={80} color={tintColor}/>
        <Text style={styles.heading}>
          {deckName}
        </Text>

        <TextInput
          style={{height: 40, width: 280, borderColor: tintColor}}
          onChangeText={(deckName) => this.setState({deckName})}
          placeholder='Enter Deck Name  '
          value={deckName}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            screenProps.addNewDeck(deckName), this.setState({deckName: ''}), navigation.navigate('SingleDeck', {
              aDeck: {
                title: deckName,
                questions: []
              }
            })
          }}>
          <Text style={styles.buttonText}> <MaterialIcons name='library-add' size={20} color='#ffffff'/> Add deck
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

