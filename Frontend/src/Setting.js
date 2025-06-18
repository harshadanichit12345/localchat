import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  StatusBar,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';

const Setting = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { isDark, theme, changeTheme } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#000' : '#fff',
      paddingTop: 50,
      alignItems: 'center',
    },
    backIconuser: {
      position: 'absolute',
      top: 40,
      left: 20,
    },
    themeText: {
      fontSize: 18,
      color: isDark ? '#00aced' : '#007aff',
      marginTop: 100,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)',
      padding: 20,
    },
    modalContent: {
      backgroundColor: isDark ? '#333' : '#fff',
      padding: 20,
      borderRadius: 10,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    radioOuter: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#888',
      marginRight: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioInner: {
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: '#007aff',
    },
    optionText: {
      fontSize: 16,
      color: isDark ? '#fff' : '#000',
      textTransform: 'capitalize',
    },
    cancelText: {
      alignSelf: 'flex-end',
      marginTop: 10,
      color: '#007aff',
    },
  });

  const handleThemeChange = (value) => {
    changeTheme(value);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconuser}>
        <FontAwesome name="arrow-left" size={20} color={isDark ? '#fff' : '#000'} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.themeButton}>
        <FontAwesome name="adjust" size={20} color={isDark ? '#00aced' : '#007aff'} style={{ marginRight: 8 }} />
        <Text style={styles.themeText}>Theme</Text>
      </TouchableOpacity>

      <Text style={styles.activeThemeText}>
        Current: {theme.charAt(0).toUpperCase() + theme.slice(1)} Theme
      </Text>

      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={[styles.optionText, { marginBottom: 10 }]}>Choose Theme</Text>

            {['system', 'light', 'dark'].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleThemeChange(option)}
              >
                <View style={styles.radioOuter}>
                  {theme === option && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Setting;
