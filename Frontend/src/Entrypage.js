import React, { useEffect, useRef } from 'react';
import { View, Animated, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';  
import styles from '../style/Entrypagecss';

const Entrypage = () => {
  const navigation = useNavigation(); 

  const scaleAnim = useRef(new Animated.Value(1.5)).current; 

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Login'); 
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assests/localchat_logo.png')}
        style={[
          styles.titleImage,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      />
    </View>
  );
};

export default Entrypage;
