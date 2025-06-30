import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style/Entrypagecss';
import { useTheme } from '../ThemeContext'

const Entrypage = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1.5)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const checkLoginStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      const hasUsedAppBefore = await AsyncStorage.getItem('hasUsedAppBefore');

      setTimeout(async () => {
        if (isLoggedIn === 'true' || hasUsedAppBefore === 'true') {
          navigation.replace('Home');
        } else {
          navigation.replace('Login');
          await AsyncStorage.setItem('hasUsedAppBefore', 'true');
        }
      }, 3000);
    };

    checkLoginStatus();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Animated.Image
        source={require('../assests/localchat_logo.png')}
        style={[styles.titleImage, { transform: [{ scale: scaleAnim }] }]}
      />
    </View>
  );
};

export default Entrypage;
