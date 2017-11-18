import { AsyncStorage } from 'react-native'
import { Notifications , Permissions } from 'expo'


const NOTIFICATION_KEY = 'FLASHCARD_NOTIFICATION:key'

export const createNotification = () => (
  { title: 'You have not studied today',
    body: '📖 Don\'t forget to study today 🎓!',
    ios:{     sound: true   },
    android: { sound: true, priority: 'high', sticky: false, vibrate: true  }
  })


export const setNotification = () => (
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse).then( (data) => {
    if (data === null) {
      Permissions.askAsync( Permissions.NOTIFICATIONS)
        .then(({status}) => { if (status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync()
          let tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1 )
          tomorrow.setHours( 16)
          tomorrow.setMinutes(0)

          Notifications.scheduleLocalNotificationAsync(
            createNotification(),
            {
              time: tomorrow,
              repeat: 'day',
            }
          )
          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
        }})
    }
  })
)

export const clearNotification = () => ( AsyncStorage.removeItem(NOTIFICATION_KEY)
  .then(Notifications.cancelAllScheduledNotificationsAsync))