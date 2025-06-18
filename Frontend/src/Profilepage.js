import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style/Profilepagecss'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Profilepage = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({ firstName: '', lastName: '' });
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);


  const loadReactionCounts = async (username) => {
    try {
      const storageKey = `ChatMessage_${username}`;
      const stored = await AsyncStorage.getItem(storageKey);
      if (stored) {
        const messages = JSON.parse(stored);
        const likes = messages.filter(m => m.reaction === '👍').length;
        const dislikes = messages.filter(m => m.reaction === '👎').length;
        setLikeCount(likes);
        setDislikeCount(dislikes);
      } else {
        setLikeCount(0);
        setDislikeCount(0);
      }
    } catch (error) {
      console.log('Error loading reactions:', error);
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      async function loadUserData() {
        try {
          const userNameJson = await AsyncStorage.getItem('LoggedInUserName');
          if (userNameJson) {
            const userObj = JSON.parse(userNameJson);
            setUser(userObj);
            await loadReactionCounts(userObj.username || userObj.email || userObj.firstName);
          } else {
            setUser({ firstName: '', lastName: '' });
            setLikeCount(0);
            setDislikeCount(0);
          }
        } catch (error) {
          console.log('Error loading user data:', error);
        }
      }
      loadUserData();
    }, [])
  );



  const handleLogout = () =>
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => navigation.navigate('Login') },
    ]);

  return (
    <View style={styles.containeruser}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconuser}>
        <FontAwesome name="arrow-left" size={20} color="black" />
      </TouchableOpacity>

      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View>
          <Text style={styles.userName}>{`${user.firstName} ${user.lastName}`}</Text>
        </View>
      </View>

      <View style={styles.menuList}>
        <View style={styles.menuRow}>
          <FontAwesome name="thumbs-up" size={20} color='#4B6E6E' style={styles.menuIcon} />
          <Text style={styles.menuItem}>Like ({likeCount})</Text>
        </View>
        <View style={styles.separator} />

        <View style={styles.menuRow}>
          <FontAwesome name="thumbs-down" size={20} color='#4B6E6E' style={styles.menuIcon} />
          <Text style={styles.menuItem}>Dislike ({dislikeCount})</Text>
        </View>
        <View style={styles.separator} />

        <TouchableOpacity onPress={() => navigation.navigate('setting')}>
          <View style={styles.menuRow}>
            <FontAwesome name="cog" size={20} color='#4B6E6E' style={styles.menuIcon} />
            <Text style={styles.menuItem}>Setting</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.separator} />

        <TouchableOpacity onPress={handleLogout} style={styles.menuRow}>
          <FontAwesome name="sign-out" size={20} color="#4B6E6E" style={styles.menuIcon} />
          <Text style={styles.menuItem}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.separator} />
      </View>
    </View>
  )
}

export default Profilepage;
