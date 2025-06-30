import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../ThemeContext';
import { makeProfileStyles } from '../style/Profilepagecss';

export default function Profilepage() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = useMemo(() => makeProfileStyles(colors), [colors]);

  const [userName, setUserName] = useState('');
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  const initials = userName
    ? userName.split(' ').map((n) => n[0]).join('').toUpperCase()
    : '?';

  const loadReactionCounts = async (emailKey) => {
    try {
      const key = `ChatMessage_${emailKey}`;
      const stored = await AsyncStorage.getItem(key);
      if (!stored) return;

      const messages = JSON.parse(stored);
      const sentMsgs = messages.filter(msg => msg.sender === emailKey);
      const likes = sentMsgs.filter(m => m.reaction === '👍').length;
      const dislikes = sentMsgs.filter(m => m.reaction === '👎').length;

      setLikeCount(likes);
      setDislikeCount(dislikes);
    } catch (e) {
      console.log('Error loading reaction counts:', e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let active = true;
      (async () => {
        const fullName = await AsyncStorage.getItem('fullName');
        const email = await AsyncStorage.getItem('email');
        if (active) {
          setUserName(fullName || 'User');
          if (email) await loadReactionCounts(email);
        }
      })();
      return () => { active = false };
    }, [])
  );

  const handleLogout = () =>
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: async () => {
          await AsyncStorage.multiRemove([
            'isLoggedIn', 'fullName', 'email', 'loggedInUser', 'fcmToken'
          ]);
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        },
      },
    ]);

  return (
    <View style={styles.containeruser}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backIconuser}
      >
        <FontAwesome name="arrow-left" size={22} color={colors.text} />
      </TouchableOpacity>

      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <View style={styles.menuList}>
        <Row icon="thumbs-up" label={`Like (${likeCount})`} colors={colors} styles={styles} />
        <Row icon="thumbs-down" label={`Dislike (${dislikeCount})`} colors={colors} styles={styles} />

        <TouchableOpacity onPress={() => navigation.navigate('setting')}>
          <Row icon="cog" label="Setting" colors={colors} styles={styles} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <Row icon="sign-out" label="Logout" colors={colors} styles={styles} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Row = ({ icon, label, colors, styles }) => (
  <View>
    <View style={styles.menuRow}>
      <FontAwesome name={icon} size={20} color={colors.text} style={styles.menuIcon} />
      <Text style={styles.menuItem}>{label}</Text>
    </View>
    <View style={styles.separator} />
  </View>
);
