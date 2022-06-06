import {useEffect, useState, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ToastProvider } from "react-native-toast-notifications";
import AppContextProvider from "./src/context/AppContext";
import AUHighSchool from "./src/navigation";
import { initializeApp } from "firebase/app";
import { colors } from "./src/constants/colors";
import { hp } from "./src/util/dimension";
import EnvironmentApp from './src/navigation';
import * as Notifications from 'expo-notifications';

async function registerForPushNotificationsAsync() {
  // let token;
  // if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);
  // } else {
  //   alert('Must use physical device for Push Notifications');
  // }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  // return token;
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "New Environment Notification Alert",
      body: 'The temprature right now is 30°c, the wind speed is 201° and humidity is 63%, there is is a probability of light rain',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    schedulePushNotification();

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const firebaseConfig = {
    apiKey: "AIzaSyAqKGwwF5M1MRK_rvcM6CCgnpIoCnGH2AM",
    authDomain: "carfaultfinder.firebaseapp.com",
    projectId: "carfaultfinder",
    storageBucket: "carfaultfinder.appspot.com",
    messagingSenderId: "977673208314",
    appId: "1:977673208314:web:4ebfdd60236667ea5b6443"
  };

  initializeApp(firebaseConfig);

  return (
    <AppContextProvider>
      <ToastProvider
        placement="top"
        duration={2000}
        // successColor="green"
        // dangerColor="red"
        // warningColor="orange"
        // normalColor="#6610F2"
        normalColor={colors.primaryLighter}
        offsetTop={hp(40)}
        // renderType={{
        //   normal: (toast) => (
        //     <Toast text={toast.message} bgColor="#6610F2" />
        //   ),
        //   danger: (toast) => (
        //     <Toast text={toast.message} bgColor="#F83C33" />
        //   ),
        //   success: (toast) => (
        //     <Toast text={toast.message} bgColor="#45D988" />
        //   ),
        // }}
        swipeEnabled={true}>

        <EnvironmentApp />
      </ToastProvider>
    </AppContextProvider>
  );
}
