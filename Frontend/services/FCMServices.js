import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FCMService = {
  requestPermission: async () => {
    const authStatus = await messaging().requestPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  },

  getToken: async () => {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      await AsyncStorage.setItem('fcmToken', token);
      return token;
    } catch (error) {
      console.log('Error getting FCM token:', error);
      return null;
    }
  },

  listenForMessages: () => {
    messaging().onMessage(async remoteMessage => {
      console.log('Foreground Message:', remoteMessage);
    });
  }
};

export default FCMService;
