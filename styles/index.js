import { StyleSheet } from 'react-native'

export const blue = '#2b8bb8'
export const tintColor = '#1955e8'


export const styles = StyleSheet.create({
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
  smallButton: {
    marginBottom: 5,
    marginTop: 15,
    width: 90,
    alignItems: 'center',
    backgroundColor: "#00af5f"
  },
  buttonText: {
    padding: 10,
    color: 'white'
  }
});