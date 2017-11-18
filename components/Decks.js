import React from 'react';
import {
  Text,
  View,
 FlatList,
  TouchableOpacity,
} from 'react-native';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'
import {blue, tintColor, styles} from "../styles"


export class Decks extends React.Component {
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
