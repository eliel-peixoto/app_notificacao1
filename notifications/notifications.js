// services/notifications.js
import * as Notifications from 'expo-notifications';

export async function registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        alert('Permissão negada para receber notificações!');
        return null;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
}
