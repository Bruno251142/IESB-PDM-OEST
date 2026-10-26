import { Platform } from 'react-native';

const CHANNEL_ID = 'default';

let Notifications = null;


async function loadNotifications() {
  if (!Notifications) {
    Notifications = await import('expo-notifications');

  
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }
  return Notifications;
}


export async function setupNotifications() {
  const Notif = await loadNotifications();

  if (Platform.OS === 'android') {
    await Notif.setNotificationChannelAsync(CHANNEL_ID, {
      name: 'CampusGo',
      importance: Notif.AndroidImportance.DEFAULT,
    });
  }

  const current = await Notif.getPermissionsAsync();
  if (current.granted) return true;

  const requested = await Notif.requestPermissionsAsync();
  return requested.granted;
}


export async function scheduleReminder(title, seconds) {
  const granted = await setupNotifications();
  if (!granted) return null;

  const Notif = await loadNotifications();
  return Notif.scheduleNotificationAsync({
    content: { title: 'CampusGo', body: title },
    trigger: {
      type: Notif.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
      channelId: CHANNEL_ID,
    },
  });
}
