import React from 'react';
import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'
import { blue, tintColor, styles } from "../styles"

export class AddNewQuestion extends React.Component {
  state = {
    question: "",
    answer:""
  }

  render() {
    const {navigation, screenProps} = this.props
    const {question, answer} = this.state
    const { deckName } = this.props.navigation.state.params
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container} keyboardVerticalOffset={5}>
        <MaterialCommunityIcons name='calendar-question' size={60} color={tintColor}/>
        <TextInput
          style={{height: 40, width: 280, borderColor: tintColor}}
          onChangeText={(question) => this.setState({question})}
          placeholder='Enter question ?  '
          value={question}
        />
        {/*{console.log(screenProps['decks'][[deckName]])}*/}


        <TextInput
          style={{height: 40, width: 280, borderColor: tintColor}}
          onChangeText={(answer) => this.setState({answer})}
          placeholder='Enter answer ?  '
          value={answer}

        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => { const _question = { question, answer };  const _deckKey = deckName.replace(/\s+/g, '')
          screenProps.addNewCard(_question, _deckKey), this.setState({question: '', answer:''}), navigation.goBack()     }}>
          <Text style={styles.buttonText}>
            <MaterialIcons name='library-add' size={20} color='#ffffff'/> Add Question
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

