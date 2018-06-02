import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'UdaciCards:notifications'

function createNotification() {
	return {
		title: "Quiz reminder",
		body: "Don't forget to have quiz!",
		ios: {
			sound: true,
		},
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true,
		}
	}
}

export function clearLocalNotification() {
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
		.then(Notifications.cancelAllScheduleNotificationsAsync)
		.catch(err => {
			console.log(err)
		})
}

export function setLocalNotification() {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then((data) => {
			Permissions.askAsync(Permissions.NOTIFICATIONS)
				.then(({}) => {
					if (status === 'granted') {
						Notifications.cancelAllScheduleNotificationsAsync()

						let tomorrow = new Date()
						tomorrow.setDate(tomorrow.getDate() + 1)
						tomorrow.setHours(20)
						tomorrow.setMinute(0)

						Notifications.scheduleLocalNotificationAsync(
							createNotification(),
							{
								time: tomorrow,
								repeat: 'day',
							}

						)

						AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
					}
				})
				.catch(err => {
					console.log(err)
				})
		})
		.catch(err => {
			console.log(err)
		})
}